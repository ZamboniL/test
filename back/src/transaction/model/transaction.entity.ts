import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { TransactionType } from './transaction-type.entity';
import { ConstructableBaseEntity } from '../../common/model/constructable-base.entity';

@Entity()
export class Transaction extends ConstructableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TransactionType)
  @JoinColumn({ name: 'typeId' })
  type: TransactionType;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  product: string;

  @Column()
  price: string;

  @Column()
  seller: string;
}
