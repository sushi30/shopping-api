import { Router } from 'express';
import CartController from '@controllers/cart.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { AddItemDto } from '@/dtos/cart.dto';

class CartRoute implements Routes {
  public path = '/cart';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/addItem`, validationMiddleware(AddItemDto, 'body'), this.cartController.addItem);
    this.router.get(`${this.path}/:username`, this.cartController.getCartByUsername);
  }
}

export default CartRoute;
