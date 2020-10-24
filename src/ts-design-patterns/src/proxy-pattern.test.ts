import { proxyFetch } from './proxy-pattern';

it('proxy-pattern', () => {
  proxyFetch('/api');
  expect(proxyFetch('/api')).toBe(`/api - Response from cache`);
});
