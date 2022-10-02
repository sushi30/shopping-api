import { HttpException } from '@/exceptions/HttpException';
import { Cart } from '@/interfaces/cart.interface';
import cartModel from '@models/cart.models';

class CartService {
  public carts = cartModel;

  public newCart(username: string): Cart {
    return { username, items: [] };
  }

  public async addItemToCart(username: string, id: number, quantity: number): Promise<Cart> {
    let updatedCart = this.carts.find(cart => cart.username === username);
    if (!updatedCart) this.newCart(username);
    let updatedItem = updatedCart.items.find(item => item.id === id);
    if (!updatedItem) {
      updatedItem = { id, quantity: 0 };
      updatedCart.items.push(updatedItem);
    }
    updatedItem.quantity += quantity;
    updatedCart.items = updatedCart.items.map(item => (item.id !== id ? item : updatedItem));
    this.carts = this.carts.map(cart => (cart.username !== username ? cart : updatedCart));
    return updatedCart;
  }

  public async findCartByUsername(username: string): Promise<Cart> {
    const findCart: Cart = this.carts.find(cart => cart.username === username);
    if (!findCart) throw new HttpException(409, "You're not user");

    return findCart;
  }
}

export default CartService;
