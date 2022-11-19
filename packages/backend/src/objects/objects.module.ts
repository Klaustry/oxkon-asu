import { forwardRef, Module } from '@nestjs/common';

import { WorkModule } from '../works/works.module';
import { ObjectController } from './objects.controller';
import { ObjectService } from './objects.service';

@Module({
  imports: [forwardRef(() => WorkModule)],
  controllers: [ObjectController],
  providers: [ObjectService],
  exports: [ObjectService],
})
export class ObjectModule {}
