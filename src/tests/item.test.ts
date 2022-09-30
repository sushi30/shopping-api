import request from 'supertest';
import App from '@/app';
import ItemRoute from '@/routes/item.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Items', () => {
  describe('[POSt] /item/listInventory', () => {
    it('response statusCode 400 / username is not admin', () => {
      const itemRoutes = new ItemRoute();
      const app = new App([itemRoutes]);

      return request(app.getServer()).post(`${itemRoutes.path}/listInventory`).send({username: "foo"}).expect(401);
    });
  });
});
