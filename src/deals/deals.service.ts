import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entity/deals.entity';
import { Repository } from 'typeorm';
import { ClaimedDeals } from './entity/claimed-deals.entity';
import { DealDto } from './deal/deal.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDealDto } from './deal/update-deal.dto';
import { ClaimDealDto } from './deal/claim-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal) private readonly dealRepository: Repository<Deal>,
    @InjectRepository(ClaimedDeals)
    private readonly claimedDealRepository: Repository<ClaimedDeals>,
  ) {}

  async createDeal(dealDto: DealDto) {
    const newDeal = this.dealRepository.create({
      ...dealDto,
      id: uuidv4(),
      isActive: true,
    });
    return await this.dealRepository.save(newDeal);
  }

  async endDeal(dealId: string) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId, isActive: true },
    });
    if (!deal) {
      throw new Error("deal doesn't exist");
    }
    deal.isActive = false;
    return await this.dealRepository.save(deal);
  }

  async updateDeal(dealId: string, dealDto: UpdateDealDto) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId, isActive: true },
    });
    if (!deal) {
      throw new Error("deal doesn't exist");
    }
    const updatedDeal = { ...deal, ...dealDto };
    const newDeal = this.dealRepository.create(updatedDeal);
    return await this.dealRepository.save(newDeal);
  }

  async claimDeal(claimDealDto: ClaimDealDto) {
    const deal = await this.dealRepository.findOne({
      where: { id: claimDealDto.dealId, isActive: true },
    });
    if (!deal) {
      throw new Error("deal doesn't exist");
    }
    if (deal.totalItems <= 0) {
      throw new Error('deal is totally claimed');
    }
    const currentTime = new Date();
    if (currentTime > deal.dealTime) {
      throw new Error('deal is expired');
    }
    const claimedDeal = await this.claimedDealRepository.findOne({
      where: {
        dealId: claimDealDto.dealId,
        userId: claimDealDto.userId,
      },
    });
    if(claimedDeal) {
      throw new Error('deal is already claimed, Try some another deal');
    }
    const newClaimedDeal = this.claimedDealRepository.create({dealId: claimDealDto.dealId, userId: claimDealDto.userId});
    await this.claimedDealRepository.save(newClaimedDeal);
    deal.totalItems--;
    await this.dealRepository.save(deal);
    return {message: 'Deal Claimed Successfully'};
  }
}
