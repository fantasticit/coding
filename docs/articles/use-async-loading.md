---
title: "异步过程中 loading 指示器的优化"
index: 0
---

## 异步过程中 loading 指示器的优化

在网络请求、耗时操作等异步场景下，一般都会给用户一个指示（如 loading 加载中指示器）。但是有时候异步操作可能并没有想象的那么耗时，比如一个 ajax 请求可能会在 200ms 内完成，也可能会超过 200ms 才能完成，如果不管三七二十一直接上 loading，反而对用户体验不好。

总结一下：

1. 在异步操作的开始和结束过程中，展示指示器
2. 异步操作耗时很短的话，不展示指示器

针对 `React` ，可以封装 `useAsyncLoading` hook，来完成这种操作。

## `useAsyncLoading` 使用方式

```ts
const [wrappedPromiseAction, loading] = useAsyncLoading(promiseAction, 200)
```

解释：针对 `promiseAction` 如果 *200ms* 内完成 `loading` 为 `false` ，反之为 `true`。

### `useAsyncLoading` 代码实现

```tsx
import React, { useState, useCallback, useEffect, useRef } from "react";

type PromiseAction = (...args: any[]) => Promise<any>;

function useAsyncLoading<A extends PromiseAction>(
  action: A,
  wait: number
): [A, boolean] {
  const timerRef = useRef(null);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);

  const actionWithPending = useCallback(
    (...args: Parameters<A>) => {
      setPending(true);
      const promise = action(...args);
      promise.then(
        () => setPending(false),
        () => setPending(false)
      );
      return promise;
    },
    [action]
  );

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setLoading(pending);
    }, wait);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [wait, pending]);

  return [actionWithPending as A, loading];
}
```

### `useAsyncLoading` demo 示例

```tsx
import React, { useState, useCallback } from "react";

const mockApi = (): Promise<string> => {
  const time = Math.random() * 400;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("此次请求耗时: " + time + "ms");
    }, time);
  });
};

export default function App() {
  const [mock, loading] = useAsyncLoading(mockApi, 200);
  const [data, setData] = useState("");

  const getData = useCallback(() => {
    mock().then((res) => {
      setData(res);
    });
  }, [mock]);

  return (
    <div className="App">
      <button onClick={getData}>发起请求</button>
      {loading && <h1>loading</h1>}
      {!loading && <p>{data}</p>}
    </div>
  );
}
```

[codesanbox 链接](https://codesandbox.io/s/black-haze-s97fs?file=/src/App.tsx)
