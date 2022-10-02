import { NextFunction, Request, Response } from 'express';
import itemsService from '@services/items.service';
import cartService from '@services/cart.service';
import { AddItemDto } from '@/dtos/cart.dto';
import { Cart } from '@/interfaces/cart.interface';

class CartController {
  public cartService = new cartService();
  public itemsService = new itemsService();
  public addItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addItemData: AddItemDto = req.body;
      const itemId = Number.parseInt(addItemData.item_id);
      const existingItem = await this.itemsService.getItemOrNull(itemId);
      if (!existingItem) {
        res.status(400).json({ message: 'Item does not exist' });
        return;
      }
      // TODO need a lock mechanism for supporting multiple parallel requests
      if (existingItem.inventory < addItemData.quantity) {
        res.status(400).json({ message: 'Not enough inventory' });
        return;
      }
      await this.cartService.addItemToCart(addItemData.username, itemId, addItemData.quantity);
      await this.itemsService.addInventory(itemId, -addItemData.quantity);
      res.status(200).json({ data: {}, message: 'added item' });
    } catch (error) {
      next(error);
    }
  };

  public getCartByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userName = req.params.username;
      const findOneCartData: Cart = await this.cartService.findCartByUsername(userName);

      res.status(200).json({ data: findOneCartData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
