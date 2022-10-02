import request from 'supertest';
import App from '@/app';
import CartRoute from '@/routes/cart.route';
import { AddItemDto } from '@/dtos/cart.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Cart', () => {
  describe('[POST] /cart/addItem', () => {
    it('response statusCode 200 / initial inventory ', () => {
      const cartRoutes = new CartRoute();
      const app = new App([cartRoutes]);
      const addItemData: AddItemDto = {
        username: 'alice',
        item_id: '1',
        quantity: 1,
      };
      return request(app.getServer())
        .post(`${cartRoutes.path}/addItem`)
        .send(addItemData)
        .expect(200, {
          total_cost: 2,
          items: [
            {
              item_id: '1',
              price: 1,
              amount: 2,
            },
          ],
        });
    });
  });

  describe('[POST] /cart/addItem add new item', () => {
    it('response statusCode 200 / initial inventory ', () => {
      const cartRoutes = new CartRoute();
      const app = new App([cartRoutes]);
      const addItemData: AddItemDto = {
        username: 'alice',
        item_id: '2',
        quantity: 3,
      };
      return request(app.getServer())
        .post(`${cartRoutes.path}/addItem`)
        .send(addItemData)
        .expect(200, {
          total_cost: 17,
          items: [
            {
              item_id: '1',
              price: 1,
              amount: 1,
            },
            {
              item_id: '2',
              price: 5,
              amount: 3,
            },
          ],
        });
    });
  });
});
