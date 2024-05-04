import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClaimedDeals } from './claimed-deals.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('deal')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false, type: 'varchar' })
  name: string;

  @Column({ name: 'created_by_id', nullable: false, type: 'uuid' })
  createdById: string;

  @Column({ name: 'item_id', nullable: false, type: 'uuid' })
  itemId: string;

  @Column({ name: 'total_items', nullable: true, type: 'int' })
  totalItems: number;

  @Column({ name: 'price', nullable: true, type: 'int' })
  price: number;

  @Column({ name: 'is_active', nullable: false, type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => ClaimedDeals, (claimedDeal) => claimedDeal.deal)
  claimedDeals: ClaimedDeals[];

  @Column({ name: 'deal_time', nullable: true, type: 'timestamptz' })
  dealTime: Date;

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
