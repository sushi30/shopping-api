import { Cart } from '@/interfaces/cart.interface';

const cartModel: Cart[] = [
  { username: 'alice', items: [{ id: 1, quantity: 1 }] },
  {
    username: 'bob',
    items: [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
    ],
  },
];

export default cartModel;
