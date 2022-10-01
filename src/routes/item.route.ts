import { Router } from 'express';
import ItemController from '@controllers/item.controller';
import { CreateItemDto, ListInventoryDto, UpdateItemDto } from '@dtos/item.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ItemRoute implements Routes {
  public path = '/item';
  public router = Router();
  public itemController = new ItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.itemController.getItems);
    this.router.post(`${this.path}/listInventory`, validationMiddleware(ListInventoryDto, 'body'), this.itemController.listInventory);
    // this.router.get(`${this.path}/:id(\\d+)`, this.itemController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateItemDto, 'body'), this.itemController.createItem);
    this.router.put(`${this.path}`, validationMiddleware(UpdateItemDto, 'body'), this.itemController.updateItem);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.itemController.deleteUser);
  }
}

export default ItemRoute;
