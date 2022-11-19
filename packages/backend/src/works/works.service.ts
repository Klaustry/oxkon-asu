import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { Work } from '../entities/works.entity';
import { ObjectService } from '../objects/objects.service';
import { CreateWorkDto, UpdateWorkDto } from './works.dto';
import { WorkQuery } from './works.query';

@Injectable()
export class WorkService {
  constructor(private readonly objectService: ObjectService) {}

  async save(objectId: string, createWorkDto: CreateWorkDto): Promise<Work> {
    const { work_id, work_name } = createWorkDto;
    const object = await this.objectService.findById(objectId);
    return await Work.create({
      work_id,
      work_name,
      object,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(workQuery: WorkQuery): Promise<Work[]> {
    Object.keys(workQuery).forEach((key) => {
      workQuery[key] = ILike(`%${workQuery[key]}%`);
    });

    return await Work.find({
      where: workQuery,
      order: {
        work_id: 'ASC',
        work_name: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Work> {
    const work = await Work.findOne(id);

    if (!work) {
      throw new HttpException(
        `Could not find work with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return work;
  }

  async findByObjectIdAndId(objectId: string, id: string): Promise<Work> {
    const work = await Work.findOne({ where: { objectId, id } });
    if (!work) {
      throw new HttpException(
        `Could not find work with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return work;
  }

  async findAllByObjectId(
    objectId: string,
    workQuery: WorkQuery,
  ): Promise<Work[]> {
    Object.keys(workQuery).forEach((key) => {
      workQuery[key] = ILike(`%${workQuery[key]}%`);
    });
    return await Work.find({
      where: { objectId, ...workQuery },
      order: {
        work_id: 'ASC',
        work_name: 'ASC',
      },
    });
  }

  async update(
    objectId: string,
    id: string,
    updateWorkDto: UpdateWorkDto,
  ): Promise<Work> {
    const work = await this.findByObjectIdAndId(objectId, id);
    return await Work.create({ id: work.id, ...updateWorkDto }).save();
  }

  async delete(objectId: string, id: string): Promise<string> {
    const work = await this.findByObjectIdAndId(objectId, id);
    await Work.delete(work);
    return id;
  }

  async count(): Promise<number> {
    return await Work.count();
  }
}
