export interface ItemResponse {
  item_id: string;
  inventory: number;
}

export interface ListInventoryResponse {
  items: ItemResponse[];
}

