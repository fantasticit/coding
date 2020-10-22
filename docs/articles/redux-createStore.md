---
title: "Redux源码学习：createStore"
index: 5
---

本文将学习 createStore，并实现一个简单的 createStore。

# createStore

接下来就按照 `createStore` 的内部流程来解读。

## 1 引入工具函数

createStore 引入的函数有：

- symbol-observable (Symbol.observable 的 pollyfill)
- ActionTypes
- isPlainObject： 通过 Object.getPrototypeof 获取对象原型，比较以判断是否为 plain object

## 2 参数声明

createStore 接受三个参数：

- reducer：根据当前的 state tree 和 要触发的 action 来生成并返回 新的（next）state tree
- preloadedState: 可选的初始 state
- enhancer: 可选的用以增强 store 的 第三方能力

createStore 返回一个 redux store 用以读取 state、触发 action 和 订阅 changes

## 3 内部流程

首先，判断 preloadedState 和 enhancer:

```javascript
if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
  enhancer = preloadedState;
  preloadedState = undefined;
}

if (typeof enhancer !== "undefined") {
  if (typeof enhancer !== "function") {
    throw new Error("Expected the enhancer to be a function.");
  }

  return enhancer(createStore)(reducer, preloadedState);
}
```

所以 `enhancer` 应是一个 柯里化函数，如果给定了 `enhancer` 则 直接调用 `reducer` 和 `preloadedState` 返回 `enhanced` 的 `store`（当然也是 createstore 生成 ）。
其次，判断 reducer 是否为函数，不是则报错：

```javascript
if (typeof reducer !== "function") {
  throw new Error("Expected the reducer to be a function.");
}
```

紧接着，声明了以下变量：

```javascript
let currentReducer = reducer;
let currentState = preloadedState;
let currentListeners = [];
let nextListeners = currentListeners;
let isDispatching = false;
```

然后 dispatch 初始化 action（dispatch({ type: ActionTypes.INIT })） （这样每个 reducer 都会返回自己的初始状态，这样就有效地填充了 初始的 state tree）
最后返回一个对象：

```javascript
return {
  dispatch,
  subscribe,
  getState,
};
```

## 4 dispatch (action)

dispatch 是唯一的触发 状态变化（state change）的途径，它只接受一个 isPlainObject 的 action，具体流程如下：

1. 判断 `action` 是否 `isPlainObject`，否则报错
2. 判断是否声明了 `action.type` ，没有则报错
3. 判断是否 `isDispatching`，如果是报错（目前无法 `dispatch action`）
4. 尝试调用 `currentReducer` (传入的 `reducer`)

```javascript
try {
  isDispatching = true;
  currentState = currentReducer(currentState, action);
} finally {
  isDispatching = false;
}

// 依次调用 listeners
const listeners = (currentListeners = nextListeners);
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i];
  listener();
}
```

## 5 subscribe

subscribe 接收一个 `listener` 函数，它首先 `ensureCanMutateNextListeners`（通过 `nextListeners = currentListeners.slice()` 保存当前的监听函数 ），当初次` ensures` 时，`nextListeners`为 []，然后将传入的 `listener` 加入到 `nextListeners`，这样 `nextListeners`中便有了 `listeners`，这样在`dispacth` 中便有了 listeners 便可以循环调用 `listeners`，同时 subscribe 返回一个包含取消监听函数的对象。

## 6 模仿实现

目前可以简单总结下 `createStore` 返回一个主要包含（我说的主要） `getState`、`subscribe` 和 `dispatch`。通过`dispatch ation` 调用 `reducer(currentState, action)`以完成 `change state`，那么接下来按照这个思路实现一个简单的 `createStore`:

```javascript
function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  let listeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return {
      unsubscribe() {
        let index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      },
    };
  }

  function dispatch(action) {
    try {
      currentState = reducer(currentState, action);
    } finally {
    }

    // 遍历监听函数
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  dispatch({ type: "INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

测试以下:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      let count = state.count;
      count++;
      return { ...state, count };

    default:
      return state;
  }
}

const store = createStore(reducer, { count: 0 });

let listener = store.subscribe(() =>
  console.log("订阅store.count: ", store.getState().count)
);

store.dispatch({ type: "ADD" });
store.dispatch({ type: "ADD" });

listener.unsubscribe();

store.dispatch({ type: "ADD" });
```

输出如下：

```javascript
订阅store.count:  1
订阅store.count:  2
```

# 总结

通过阅读 `createStore` 的源码可以发现这部分的核心主要就是在 `reducer`、`dispatch` 以及 `state`，理清楚这些便明白了 `createStore` 的简单与巧妙。
