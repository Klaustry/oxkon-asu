import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { ObjectP } from '../entities/objects.entity';
import { CreateObjectDto, UpdateObjectDto } from './objects.dto';
import { ObjectQuery } from './objects.query';

@Injectable()
export class ObjectService {
  async save(createObjectDto: CreateObjectDto): Promise<ObjectP> {
    return await ObjectP.create({
      ...createObjectDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(objectQuery: ObjectQuery): Promise<ObjectP[]> {
    // ObjectP.keys(objectQuery).forEach((key) => {
    //   objectQuery[key] = ILike(`%${objectQuery[key]}%`);
    // });
    return await ObjectP.find({
      where: objectQuery,
      order: {
        address: 'ASC',
        region: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<ObjectP> {
    const object = await ObjectP.findOne(id);
    if (!object) {
      throw new HttpException(
        `Could not find object with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return object;
  }

  async update(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectP> {
    const object = await this.findById(id);
    return await ObjectP.create({ id: object.id, ...updateObjectDto }).save();
  }

  async delete(id: string): Promise<string> {
    const object = await this.findById(id);
    await ObjectP.delete(object);
    return id;
  }

  async count(): Promise<number> {
    return await ObjectP.count();
  }
}
