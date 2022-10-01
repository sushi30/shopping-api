import { Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsString, IsOptional, ValidateNested, Allow } from 'class-validator';

export class CreateItemDto {
  @IsString()
  public username: string;

  @IsNumberString()
  public item_id: string;

  @IsNumber()
  public price: number;
}

export class UpdateItemDto {
  @IsString()
  public username: string;

  @IsNumberString()
  public item_id: string;

  @IsOptional()
  @IsNumber()
  public amount: number;

  @IsOptional()
  @IsNumber()
  public add: number;
}

export class ItemInventoryDto {
  @IsNumberString()
  public item_id: string;
}

export class ListInventoryDto {
  @IsString()
  public username: string;

  @Type(() => ItemInventoryDto)
  @ValidateNested()
  public items?: ItemInventoryDto[];
}
