export interface ItemResponse {
  item_id: string;
  price: number;
  amount: number;
}

export interface CartResponse {
  total_cost: number;
  items: ItemResponse[];
}

