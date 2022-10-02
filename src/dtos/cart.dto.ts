import { IsNumber, IsNumberString, IsString, Min } from 'class-validator';

export class AddItemDto {
  @IsString()
  public username: string;

  @IsNumberString()
  public item_id: string;

  @IsNumber()
  @Min(1)
  public quantity: number;
}
