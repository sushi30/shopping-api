import request from 'supertest';
import App from '@/app';
import ItemRoute from '@/routes/item.route';
import { CreateItemDto, ListInventoryDto } from '@/dtos/item.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Items', () => {
  describe('[POSt] /item/listInventory', () => {
    it('response statusCode 400 / username is not admin', () => {
      const itemRoutes = new ItemRoute();
      const app = new App([itemRoutes]);

      return request(app.getServer()).post(`${itemRoutes.path}/listInventory`).send({ username: 'foo' }).expect(401);
    });
  });

  describe('[POST] /item/listInventory', () => {
    it('response statusCode 200 / initial inventory ', () => {
      const itemRoutes = new ItemRoute();
      const app = new App([itemRoutes]);
      const itemData: ListInventoryDto = {
        username: 'admin',
      };
      return request(app.getServer())
        .post(`${itemRoutes.path}/listInventory`)
        .send(itemData)
        .expect(200)
        .expect(res => !!res.body.items)
        .expect(res => res.body.items.length == 4);
    });
  });

  describe('[POST] /item', () => {
    it('response statusCode 200 / item is added', () => {
      const itemRoutes = new ItemRoute();
      const app = new App([itemRoutes]);
      const itemData: CreateItemDto = {
        username: 'admin',
        item_id: '50',
        price: 3,
      };
      return request(app.getServer()).post(`${itemRoutes.path}`).send(itemData).expect(200);
    });
  });
});
