import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entity/deals.entity';
import { ClaimedDeals } from './entity/claimed-deals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, ClaimedDeals])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
