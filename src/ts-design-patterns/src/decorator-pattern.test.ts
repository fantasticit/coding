import { Book, giftWrap, hardbindBook } from './decorator-pattern';

it('decorator-pattern', () => {
  const book1 = giftWrap(new Book('js', 10));
  expect(book1.isGiftWrapped).toBeTruthy();

  const book2 = hardbindBook(new Book('ts', 10));
  expect(book2.price).toBe(15);

  const book3 = giftWrap(hardbindBook(new Book('go', 20)));
  expect(book3.isGiftWrapped).toBeTruthy();
  expect(book3.price).toBe(25);
});
