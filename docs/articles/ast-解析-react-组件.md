---
title: "使用 AST 解析 React TypeScript Component 接口定义"
index: 2
---

# 使用 AST 解析 React TypeScript Component 接口定义

## 背景

假设团队使用 TypeScript 进行 React 组件开发。开发组件的同时，需要为组件撰写文档（使用 Markdown 编写文档）。文档中需要对组件的 props 定义进行说明。

![Antd 组件的 API 说明](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/WX20200426-105830%402x.png)

在开发组件的时候，是编写组件 props 的接口定义。这时候就希望能够偷懒了，直接抽取组件源代码中的接口定义和注释来生成这部分文档。

## 分析

基于上面背景进行分析，可以发现核心需求是抽取组件接口定义和注释形成特定格式的文档。

```ts
import React from "react";

export interface IProps {
  // 文字
  text: string;
  // 点击事件
  onClick: () => void;
}

const Button = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
```

其实就是抽取 `IProps` 定义然后转换成其他格式文档。

## 思路

在人人都说 `AST` 的今天，我们肯定是要使用 `AST` 来完成。

1. 将源代码转换成 `AST`
2. 遍历 `AST` 抽取 `interface` 定义
3. 继续遍历 `interface` 抽取各个字段定义 `definition`

```shell
code -> ast -> interface -> definitions
```

## 源代码 -> `AST`

站在巨人的肩膀上，使用 `babel` 解析源代码即可。

```js
const parser = require("@babel/parser");

function transformCode2Ast(code) {
  return parser.parse(code, {
    sourceType: "module",
    plugins: [
      "jsx",
      "typescript",
      "asyncGenerators",
      "bigInt",
      "classProperties",
      "classPrivateProperties",
      "classPrivateMethods",
      ["decorators", { decoratorsBeforeExport: false }],
      "doExpressions",
      "dynamicImport",
      "exportDefaultFrom",
      "exportNamespaceFrom",
      "functionBind",
      "functionSent",
      "importMeta",
      "logicalAssignment",
      "nullishCoalescingOperator",
      "numericSeparator",
      "objectRestSpread",
      "optionalCatchBinding",
      "optionalChaining",
      ["pipelineOperator", { proposal: "minimal" }],
      "throwExpressions",
      "topLevelAwait",
      "estree",
    ],
  });
}
```

转换上面的 Button 组件，`AST` 大概长这样：

```js
Node {
  type: 'File',
  start: 0,
  end: 207,
  loc:
   SourceLocation {
     start: Position { line: 1, column: 0 },
     end: Position { line: 16, column: 0 } },
  errors: [],
  program:
   Node {
     type: 'Program',
     start: 0,
     end: 207,
     loc: SourceLocation { start: [Position], end: [Position] },
     sourceType: 'module',
     interpreter: null,
     body: [ [Node], [Node], [Node], [Node] ] },
  comments:
   [ { type: 'CommentLine',
       value: ' 文字',
       start: 57,
       end: 62,
       loc: [SourceLocation] },
     { type: 'CommentLine',
       value: ' 点击事件',
       start: 81,
       end: 88,
       loc: [SourceLocation] } ] }
```

## 遍历 `AST`

同样站在巨人的肩膀上，使用 `ast-types` 对 `ast` 进行遍历。

```ts
const { visit } = require("ast-types");

function findInterface(ast) {
  let ret = Object.create(null);
  let currentInterface = null;

  visit(ast, {
    visitTSInterfaceDeclaration(nodePath) {
      currentInterface = nodePath.value.id.name;
      this.traverse(nodePath);
    },
    visitTSPropertySignature(nodePath) {
      ret[currentInterface] = ret[currentInterface] || [];
      ret[currentInterface].push(nodePath.value);
      return false;
    },
  });
  return ret;
}
```

对 `AST` 遍历抽取 `Interface` 后的结果大概长这样。

```js
Node {
  type: 'TSPropertySignature',
  start: 65,
  end: 78,
  loc: [SourceLocation],
  key: [Node],
  computed: false,
  typeAnnotation: [Node],
  leadingComments: [Array],
  trailingComments: [Array] },
Node {
  type: 'TSPropertySignature',
  start: 91,
  end: 111,
  loc: [SourceLocation],
  key: [Node],
  computed: false,
  typeAnnotation: [Node],
  leadingComments: [Array] } ] }
```

会发现各个定义在 `typeAnnotation` 中，这时候对它进行解析即可。

## 解析 TypeAnnotation

通过分析 `typeAnnotation` 很容易写出。

```js
const get = require("lodash/get");

function parseTSTypeReference(typeName) {
  const type = get(typeName, "type");
  switch (type) {
    case "TSQualifiedName":
      return `${get(typeName, "left.name")}.${get(typeName, "right.name")}`;
    default:
      return `Unknown ReferenceType`;
  }
}

function parseTSFunctionType(parameters, typeAnnotation) {
  const parseTSFunctionParameters = (parameters) => {
    if (!parameters || !parameters.length) {
      return `()`;
    }
    let args = parameters.map((parameter) => {
      return `${get(parameter, "name")}: ${parseTypeAnnotation(
        get(parameter, "typeAnnotation.typeAnnotation")
      )}`;
    });
    return "( " + args.join(", ") + ")";
  };
  const parseTSFunctionReturn = (typeAnnotation) => {
    const type = get(typeAnnotation, "type");
    switch (type) {
      case "TSVoidKeyword":
        return "void";
      case "TSTypeReference":
        return parseTSTypeReference(get(typeAnnotation, "typeName"));
      default:
        return `Unknown FunctionType`;
    }
  };
  return `${parseTSFunctionParameters(parameters)} => ${parseTSFunctionReturn(
    typeAnnotation
  )}`;
}

function parseTSTypeLiteral(members) {
  const ret = parseInterfaceDefinitions(members);
  let args = ret.map((t) => `${t.name}: ${t.type}`);
  return "{ " + args.join(", ") + " }";
}

function parseTypeAnnotation(typeAnnotation) {
  const type = get(typeAnnotation, "type");
  switch (type) {
    case "TSNumberKeyword":
    case "TSStringKeyword":
    case "TSBoleanKeyword":
    case "TSNullKeyword":
    case "TSUndefinedKeyword":
    case "TSSymbolKeyword":
    case "TSAnyKeyword":
      return type.match(/TS(\w+)Keyword/)[1].toLowerCase();
    case "TSUnionType":
      return get(typeAnnotation, "types", [])
        .map((type) => get(type, "literal.value"))
        .join(" | ");
    case "TSFunctionType":
      return parseTSFunctionType(
        get(typeAnnotation, "parameters"),
        get(typeAnnotation, "typeAnnotation.typeAnnotation")
      );
    case "TSTypeReference":
      return parseTSTypeReference(get(typeAnnotation, "typeName"));
    case "TSTypeLiteral":
      return parseTSTypeLiteral(get(typeAnnotation, "members"));
    default:
      return "UnKnowType";
  }
}

function parseInterfaceDefinitions(nodePaths) {
  const parseInterfaceDefinitionsNode = (nodePath) => {
    const name = get(nodePath, "key.name");
    const comments = get(nodePath, "leadingComments.0.value", "")
      .trim()
      .split(/[\r\n]/)
      .map((str) => str.trim().replace(/^\*/g, "").trim())
      .filter(Boolean);
    const typeAnnotation = get(nodePath, "typeAnnotation.typeAnnotation");
    const type = parseTypeAnnotation(typeAnnotation);
    return { name, type, comments };
  };
  return nodePaths.map(parseInterfaceDefinitionsNode);
}
```

至此，可以得到 `Button` 的接口定义。

```js
[
  [
    {
      name: "text",
      type: "string",
      comments: ["文字"],
    },
    {
      name: "onClick",
      type: "() => void",
      comments: ["点击事件"],
    },
  ],
];
```

接下来只要将解析后的结果转成想要的格式即可。

## 测试

```js
function parseTypeScriptComponentInterface(code) {
  let ast = transformCode2Ast(code);
  let interfaces = findInterfaces(ast);
  let definitions = Object.keys(interfaces).reduce((a, c) => {
    a[c] = a[c] || [];
    a[c].push(parseInterfaceDefinitions(interfaces[c]));
    return a;
  }, Object.create(null));
  return definitions;
}

const code = `
import React from 'react';

export interface IProps {
  /**
   * button 
   * 显示文字
   */
  text: string;
  // 点击事件
  onClick: () => void;
  // 属性 3
  props3: (arg: any) => void;
  // 属性 4
  props4: (arg: { name: string, age: number }) => React.Node
}

const Button = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
`;

let ret = parseTypeScriptComponentInterface(code);
```

输出：

```js
{
  "IProps": [
    [
      {
        "name": "text",
        "type": "string",
        "comments": [
          "button",
          "显示文字"
        ]
      },
      {
        "name": "onClick",
        "type": "() => void",
        "comments": [
          "点击事件"
        ]
      },
      {
        "name": "props3",
        "type": "( arg: any) => void",
        "comments": [
          "属性 3"
        ]
      },
      {
        "name": "props4",
        "type": "( arg: { name: string, age: number }) => React.Node",
        "comments": [
          "属性 4"
        ]
      }
    ]
  ]
}
```

[源代码地址](https://github.com/fantasticit/parse-typescript-component-interface)。
