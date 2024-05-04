import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { DealDto } from './deal.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDealDto {
  @IsOptional()
  @IsNumber()
  totalItems: number;

  @IsOptional()
  @IsNotEmpty()
  dealTime: Date;

  @IsOptional()
  @IsNumber()
  price: number;
}
