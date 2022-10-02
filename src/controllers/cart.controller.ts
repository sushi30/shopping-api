import { NextFunction, Request, Response } from 'express';
import itemsService from '@services/items.service';
import cartService from '@services/cart.service';
import { AddItemDto } from '@/dtos/cart.dto';
import { Cart } from '@/interfaces/cart.interface';
import { CartResponse } from '@/responses/cart.responses';

class CartController {
  public cartService = new cartService();
  public itemsService = new itemsService();

  public buildCartResponse = async (cart: Cart): Promise<CartResponse> => {
    const items = await Promise.all(cart.items.map(item => this.itemsService.getItemOrNull(item.id)));
    const totalCost = cart.items.reduce((acc, item, idx) => acc + items[idx].price * item.quantity, 0);
    return {
      total_cost: totalCost,
      items: cart.items.map((item, idx) => ({
        item_id: item.id.toString(),
        price: items[idx].price,
        amount: item.quantity,
      })),
    };
  };

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
      const updatedCart = await this.cartService.addItemToCart(addItemData.username, itemId, addItemData.quantity);
      await this.itemsService.addInventory(itemId, -addItemData.quantity);
      let cartResponse = await this.buildCartResponse(updatedCart);
      res.status(200).json(cartResponse);
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
