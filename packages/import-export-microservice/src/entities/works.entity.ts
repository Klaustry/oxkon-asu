import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Contract } from './contract.entity';
import { ObjectP } from './objects.entity';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  work_id: string;

  @Column()
  work_name: string;

  @Column()
  contract_short: string;

  @ManyToOne(() => Contract, (contract) => contract.works, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contractId' })
  contract: Contract;

  @Column({ nullable: true })
  plan_year: number;

  @Column({ nullable: true })
  progress_id: number;

  @Column({ nullable: true })
  progress_name: string;

  @Column({ nullable: true })
  progress: number;

  @Column({ nullable: true })
  obj_id: string;

  @Column({ nullable: true })
  old_obj_id: string;

  @Column()
  dateCreated: Date;

  @Column({ select: false, nullable: false })
  objectId: string;

  @ManyToOne(() => ObjectP, (object) => object.works, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'objectId' })
  object: ObjectP;
}
