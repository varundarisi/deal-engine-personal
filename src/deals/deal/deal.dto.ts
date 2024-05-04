import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  isNotEmpty,
} from 'class-validator';

export class DealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  createdById: string;

  @IsNumber()
  totalItems: number;

  @IsNotEmpty()
  dealTime: Date;

  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @IsNumber()
  price: number;

}
