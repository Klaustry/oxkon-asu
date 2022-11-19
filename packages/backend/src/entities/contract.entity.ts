import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Work } from './works.entity';

@Entity()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  short_name: number;

  @Column()
  name: string;

  @Column()
  archive: boolean;

  @Column({ nullable: true })
  contractor: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Work, (work) => work.contract)
  works!: Work[];
}
