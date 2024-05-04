import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deal } from './deals.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('claimed_deals')
export class ClaimedDeals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Deal)
  @JoinColumn({ name: 'dealId', referencedColumnName: 'id' })
  deal: Deal;

  @Column({ name: 'deal_id', nullable: false, type: 'uuid' })
  dealId: string;

  @Column({ name: 'user_id', nullable: false, type: 'uuid' })
  userId: string;

  @Column({ name: 'created_at', nullable: true, type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true, type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  updateDefaultParams() {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
