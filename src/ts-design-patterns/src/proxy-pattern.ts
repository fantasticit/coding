/**
 * 代理模式
 * 这是一种结构设计模式，其行为恰如其名。 它充当另一个对象的代理或占位符，以控制对其的访问。
 * 它通常用于目标对象受约束且可能无法有效处理其所有职责的情况。 在这种情况下，代理通常会为客户端提供相同的接口，并添加一个间接级别以支持对目标对象的受控访问，以避免对目标对象施加不适当的压力。
 * 在处理大量网络请求的应用程序时，代理服务器模式非常有用，可以避免不必要或多余的网络请求。
 */
function fetch(url) {
  return `fetch: ${url}`;
}

const cache = [];
export const proxyFetch = new Proxy(fetch, {
  apply(target, thisArg, args) {
    const url = args[0];

    if (cache.includes(url)) {
      return `${url} - Response from cache`;
    } else {
      cache.push(url);
      return Reflect.apply(target, thisArg, args);
    }
  }
});
