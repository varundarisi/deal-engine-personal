import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsModule } from './deals/deals.module';
import { ClaimedDeals } from './deals/entity/claimed-deals.entity';
import { Deal } from './deals/entity/deals.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Load configuration from ormconfig.json
      ...require('../ormconfig.json'),
      entities: [Deal, ClaimedDeals],
      synchronize: true, // Automatically synchronize database schema with entities (for development only)
    }),
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
