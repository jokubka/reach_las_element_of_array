const calculatePath = require('./app');

test('Array [0, 2, 4, 5] to be false', () => {
   expect(calculatePath([0, 2, 4, 5])).toBeFalsy();
});

test('Array [2, 2, 1, 0, 3, 5, 2] to be false', () => {
   expect(calculatePath([2, 2, 1, 0, 3, 5, 2])).toBeFalsy();
});

test('Array [1, 2, 0, 3, 0, 2, 0] to be string of 1 ⇒ 2 ⇒ 3 ⇒ 0', () => {
   expect(calculatePath([1, 2, 0, 3, 0, 2, 0])).toEqual('1 &#8658; 2 &#8658; 3 &#8658; 0');
});
