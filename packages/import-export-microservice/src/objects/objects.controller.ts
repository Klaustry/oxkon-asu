import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ObjectP } from '../entities/objects.entity';
import { Work } from '../entities/works.entity';
import { Role } from '../enums/role.enum';
import { CreateWorkDto, UpdateWorkDto } from '../works/works.dto';
import { WorkQuery } from '../works/works.query';
import { WorkService } from '../works/works.service';
import { CreateObjectDto, UpdateObjectDto } from './objects.dto';
import { ObjectQuery } from './objects.query';
import { ObjectService } from './objects.service';

@Controller('objects')
//@ApiBearerAuth()
//@UseGuards(JwtGuard, RolesGuard)
@ApiTags('objects')
export class ObjectController {
  constructor(
    private readonly objectService: ObjectService,
    private readonly workService: WorkService,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.Editor)
  async save(@Body() CreateObjectDto: CreateObjectDto): Promise<ObjectP> {
    return await this.objectService.save(CreateObjectDto);
  }

  @Get()
  async findAll(@Query() objectQuery: ObjectQuery): Promise<ObjectP[]> {
    return await this.objectService.findAll(objectQuery);
  }

  @Get('/copy-files')
  async copyFiles(@Query() objectQuery: ObjectQuery): Promise<any> {
    return await this.objectService.createAndCopyDirectories();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ObjectP> {
    return await this.objectService.findById(id);
  }

  @Put('/:id')
  @Roles(Role.Admin, Role.Editor)
  async update(
    @Param('id') id: string,
    @Body() updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectP> {
    return await this.objectService.update(id, updateObjectDto);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<string> {
    return await this.objectService.delete(id);
  }

  @Post('/:id/works')
  @Roles(Role.Admin, Role.Editor)
  async saveWork(
    @Param('id') id: string,
    @Body() createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    return await this.workService.save(id, createWorkDto);
  }

  @Get('/:id/works')
  async findAllWorksByObjectId(
    @Param('id') id: string,
    @Query() workQuery: WorkQuery,
  ): Promise<Work[]> {
    return await this.workService.findAllByObjectId(id, workQuery);
  }

  @Put('/:id/works/:workId')
  @Roles(Role.Admin, Role.Editor)
  async updateWork(
    @Param('id') id: string,
    @Param('workId') workId: string,
    @Body() updateWorkDto: UpdateWorkDto,
  ): Promise<Work> {
    return await this.workService.update(id, workId, updateWorkDto);
  }

  @Delete('/:id/works/:workId')
  @Roles(Role.Admin)
  async deleteWork(
    @Param('id') id: string,
    @Param('workId') workId: string,
  ): Promise<string> {
    return await this.workService.delete(id, workId);
  }
}
