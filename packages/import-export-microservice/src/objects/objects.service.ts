import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isBtcAddress } from 'class-validator';
import * as xlsx from 'node-xlsx';
import { Contract } from 'src/entities/contract.entity';
import { Work } from 'src/entities/works.entity';
import { ILike } from 'typeorm';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';

import { Connection, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectP } from '../entities/objects.entity';
import { CreateObjectDto, UpdateObjectDto } from './objects.dto';
import { ObjectQuery } from './objects.query';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(Work)
    private readonly WorkDb: Repository<Work>, //private readonly dataSource: DataSource,
  ) {}

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
    const workSheetsFromFile = await xlsx.parse(`${process.cwd()}/2000.xlsx`);
    //console.log(workSheetsFromFile[0].data);

    const data = workSheetsFromFile[0].data;

    for (let i = 2; i < 20; i++) {
      //if (data[i][6] == 1)
      console.table({
        address: `${data[i][2]}`,
        region: ``, //`${data[i][5]}`,
        reference_url: `${data[i][5]}`,
        work_id: `${data[i][3]}`,
        obj_id: parseInt(data[i][71]) == NaN ? parseInt(data[i][71]) : 0,
        old_id: parseInt(data[i][71]) == NaN ? parseInt(data[i][71]) : 0,
        plan_year: 2022, //parseInt(data[i][1]),
        work_name: `${data[i][4]}`,
        contract: parseInt(data[i][0]),
        contactor: `ООО "${data[i][7]}"`,
      });
    }

    for (let i = 2; i < data.length; i++) {
      //if (data[i][6] == 1)
      await this.createOrUpdateobject({
        address: `${data[i][2]}`,
        region: ``, //`${data[i][5]}`,
        reference_url: `${data[i][5]}`,
        work_id: `${data[i][3]}`,
        obj_id: parseInt(data[i][71]) == NaN ? parseInt(data[i][71]) : 0,
        old_id: parseInt(data[i][71]) == NaN ? parseInt(data[i][71]) : 0,
        plan_year: 2022, //parseInt(data[i][1]),
        work_name: `${data[i][4]}`,
        contract: parseInt(data[i][0]),
        contactor: `ООО "${data[i][7]}"`,
      });
    }

    // for (let i = 2; i < data.length; i++) {
    //   await this.createOrUpdateobject({
    //     address: `${data[i][4]}`,
    //     region: `${data[i][2]}`,
    //     reference_url: `${data[i][32]}`,
    //   });
    // }

    return await ObjectP.find({
      where: {},
      order: {
        address: 'ASC',
        region: 'ASC',
      },
    });
  }

  async createOrUpdateobject({
    address,
    region,
    reference_url,
    work_id,
    obj_id,
    old_id,
    plan_year,
    work_name,
    contract,
    contactor,
  }) {
    const object =
      (await ObjectP.findOne({ reference_url: reference_url })) ??
      new ObjectP();
    //const work = (await Work.findOne({ objectId: object.id })) ?? new Work();
    object.address = address;
    object.region = region;
    //object.works = await this.getWork(address, work_id, obj_id);

    console.log(address, region, reference_url);

    object.reference_url = reference_url;
    object.dateCreated = new Date();
    const res = await object.save();

    await this.getWork(
      reference_url,
      work_id,
      obj_id,
      old_id,
      plan_year,
      work_name,
      contract,
      contactor,
    );
    return res;
  }

  async getWork(
    reference_url,
    work_id,
    obj_id,
    old_id,
    plan_year,
    work_name,
    contract,
    contactor,
  ) {
    const object = await ObjectP.findOne({ reference_url: reference_url });
    const work =
      (await Work.findOne({
        object: object,
        work_id: work_id,
      })) ?? new Work();

    console.log(object, work_id, obj_id, plan_year);

    work.contract = await this.getContract(contract, contactor);
    work.contract_short = contract;
    work.object = object;
    work.work_id = work_id;
    work.work_name = work_name;
    work.obj_id = obj_id;
    work.old_obj_id = old_id;
    work.progress = 0;
    work.progress_id = 0;
    work.progress_name = 'not_started';
    work.plan_year = plan_year;
    work.dateCreated = new Date();
    return await work.save();
  }

  async getContract(short_name, contactor) {
    let contract = await Contract.findOne({ short_name: short_name });

    if (contract == undefined) {
      contract = new Contract();
      contract.short_name = short_name;
      contract.name = `${short_name}-К`;
      contract.archive = false;
      contract.contractor = contactor;
      return await contract.save();
    } else return contract;
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

  async createAndCopyDirectories(): Promise<any> {
    const q = await this.WorkDb.createQueryBuilder('work')
      .leftJoinAndSelect('work.object', 'object')
      .select(
        'work.id,object.id as ob_id,obj_id,old_obj_id,work.work_id,work.work_name,object.address',
      )
      .where('contract_short = :contract', { contract: '1678' })
      .execute();
    // const qe = await this.WorkDb.query(`

    // `);

    //const q = await queryBuilder.getMany();
    //console.log(q);
    let h = '<table border="1">';
    q.map((e) => {
      h += `<tr><td>${e.id}</td><td>${e.ob_id}</td><td>${e.obj_id}</td><td>${e.old_obj_id}</td><td>${e.work_id}</td><td>${e.work_name}</td><td>${e.address}</td></tr>`;
    });
    h += '</table>';

    const src = path.join(__dirname, '..', '..', 'data', 'input', 'nnn');
    const dest = path.join(__dirname, '..', '..', 'data', 'output', 'www');

    console.log(src, dest);

    fs.move(src, dest)
      .then(() => {
        console.log('success!');
      })
      .catch((err) => {
        console.error(err);
      });

    return await h;
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
