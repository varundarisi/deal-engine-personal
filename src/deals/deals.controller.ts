import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealDto } from './deal/deal.dto';
import { UpdateDealDto } from './deal/update-deal.dto';
import { ClaimDealDto } from './deal/claim-deal.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post('/create')
  async createDeal(@Body() deal: DealDto) {
    return await this.dealsService.createDeal(deal);
  }

  @Patch('/end-deal/:id')
  async endDeal(@Param('id') dealId: string) {
    return await this.dealsService.endDeal(dealId);
  }

  @Put('/update/:id')
  async updateDeal(@Param('id') dealId: string, @Body() updateDeal: UpdateDealDto) {
    return await this.dealsService.updateDeal(dealId, updateDeal);
  }

  @Post('/claim-deal')
  async claimDeal(@Body() claimDealDto: ClaimDealDto) {
    try {
      return await this.dealsService.claimDeal(claimDealDto);
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
