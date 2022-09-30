import { NextFunction, Request, Response } from 'express';
import { ListInventoryDto, UpdateItemDto } from '@dtos/item.dto';
import itemsService from '@services/items.service';
import { Inventory, Item } from '@/interfaces/item.interface';
import { ListInventoryResponse } from '@/responses/item.responses';

class ItemController {
  public itemService = new itemsService();

  public getItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllItemsData: Item[] = await this.itemService.findAllItems();

      res.status(200).json({ data: findAllItemsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public listInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const listInventoryData: ListInventoryDto = req.body;
      if (listInventoryData.username != 'admin') {
        res.status(401).json('Unauthorized');
      }

      // TODO handle case for item ids

      const items: Item[] = await this.itemService.listInventory();
      const inventoryResponse: ListInventoryResponse = {
        items: items.map(item => ({
          item_id: item.id.toString(),
          inventory: item.inventory,
        })),
      };
      res.status(200).json(inventoryResponse);
    } catch (error) {
      next(error);
    }
  };

  public createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: UpdateItemDto = req.body;
      if (itemData.username != 'admin') {
        res.status(401).json('Unauthorized');
      }
      const createItemData: Item = await this.itemService.createItem(itemData);

      res.status(200).json({ data: createItemData, message: 'created/updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: UpdateItemDto = req.body;
      const itemId = Number.parseInt(itemData.item_id);
      if (itemData.username != 'admin') {
        res.status(401).json('Unauthorized');
      }
      let updateItemData: Item;
      if (itemData.add) {
        updateItemData = await this.itemService.addInventory(itemId, itemData.add);
      } else if (itemData.amount) {
        updateItemData = await this.itemService.updateInventory(itemId, itemData.amount);
      } else {
        res.status(400).json({ message: 'amount or add must be specified' });
        return;
      }

      res.status(200).json({ data: { item_id: updateItemData.id.toString(), inventory: updateItemData.inventory }, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ItemController;
