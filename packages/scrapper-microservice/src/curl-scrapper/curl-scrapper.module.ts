import { Module } from '@nestjs/common';
import { CurlScrapperController } from './curl-scrapper.controller';
import { CurlScrapperService } from './curl-scrapper.service';

@Module({
  controllers: [CurlScrapperController],
  providers: [CurlScrapperService]
})
export class CurlScrapperModule {}
