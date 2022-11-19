import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Company } from './company.entity';
import { Work } from './works.entity';

@Entity()
export class ObjectP extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  address: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  reference_url: string;

  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  ceil_height: number;

  @Column({ nullable: true })
  wall_thickness: number;

  @Column({ nullable: true })
  build_area: number;

  @Column({ nullable: true })
  basement_area: number;

  @Column({ nullable: true })
  area: number;

  @Column({ nullable: true })
  volume: number;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  levels: number;

  @Column({ nullable: true })
  sections: number;

  @Column({ nullable: true })
  form: string;

  @Column({ nullable: true })
  wall_material: string;

  @Column({ nullable: true })
  floor_material: string;

  @Column({ nullable: true })
  basement_wall_material: string;

  @Column()
  dateCreated: Date;

  @OneToMany(() => Work, (work) => work.object)
  works!: Work[];

  @ManyToOne(() => Company, (company) => company.objects)
  company: Company;
}
