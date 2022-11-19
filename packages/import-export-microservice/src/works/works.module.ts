import { forwardRef, Module } from '@nestjs/common';

import { ObjectModule } from '../objects/objects.module';
import { WorkService } from './works.service';

@Module({
  imports: [forwardRef(() => ObjectModule)],
  controllers: [],
  providers: [WorkService],
  exports: [WorkService],
})
export class WorkModule {}
