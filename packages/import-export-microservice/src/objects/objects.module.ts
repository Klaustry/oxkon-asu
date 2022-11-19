import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkModule } from '../works/works.module';
import { ObjectController } from './objects.controller';
import { ObjectService } from './objects.service';
import { Work } from 'src/entities/works.entity';

@Module({
  imports: [forwardRef(() => WorkModule), TypeOrmModule.forFeature([Work])],
  controllers: [ObjectController],
  providers: [ObjectService],
  exports: [ObjectService],
})
export class ObjectModule {}
