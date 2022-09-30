export interface Item {
  id: number;
  price: number;
  inventory: number;
}

export interface Inventory {
  items: Item[]
}
