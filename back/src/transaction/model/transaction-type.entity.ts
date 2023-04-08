import { ConstructableBaseEntity } from '../../common/model/constructable-base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TransactionType extends ConstructableBaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @Column('varchar', { length: 1 })
  signal: '+' | '-';
}
