import { CreateItemDto, UpdateItemDto } from '@dtos/item.dto';
import { HttpException } from '@exceptions/HttpException';
import { Inventory, Item } from '@interfaces/item.interface';
import itemModel from '@models/items.model';
import { isEmpty } from '@utils/util';

class ItemsService {
  public items = itemModel;

  public async findAllItems(): Promise<Item[]> {
    const users: Item[] = this.items;
    return users;
  }

  public async listInventory(): Promise<Item[]> {
    return this.items
  }

  public async updateItemPrice(id: number, price: number): Promise<Item> {
    let updatedItem: Item;
    this.items = this.items.map(item => {
      if (item.id !== id) return item;
      const newItem = {
        ...item,
        price,
      };
      updatedItem = newItem;
      return newItem;
    });
    return updatedItem;
  }

  public async updateInventory(id: number, amount: number): Promise<Item> {
    let updatedItem: Item;
    this.items = this.items.map(item => {
      if (item.id !== id) return item;
      const newItem = {
        ...item,
        inventory: amount,
      };
      updatedItem = newItem;
      return newItem;
    });
    return updatedItem;
  }

  // TODO this repeats code with updateInventory
  public async addInventory(id: number, added: number): Promise<Item> {
    let updatedItem: Item;
    this.items = this.items.map(item => {
      if (item.id !== id) return item;
      const newItem = {
        ...item,
        inventory: item.inventory + added,
      };
      updatedItem = newItem;
      return newItem;
    });
    return updatedItem;
  }

  public async createItem(itemData: CreateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "You're not itemData");

    const findItem: Item = this.items.find(item => item.id === Number.parseInt(itemData.item_id));

    if (findItem) {
      return this.updateItemPrice(findItem.id, itemData.price);
    }

    const createItemData: Item = {
      id: Number.parseInt(itemData.item_id),
      inventory: 0,
      price: itemData.price,
    };

    this.items = [...this.items, createItemData];

    return createItemData;
  }
}

export default ItemsService;
