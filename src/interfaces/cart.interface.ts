export interface CartItem {
  id: number;
  quantity: number;
}

export interface Cart {
  username: string;
  items: CartItem[];
}
