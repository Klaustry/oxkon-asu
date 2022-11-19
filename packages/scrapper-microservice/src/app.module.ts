import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';
import { CurlScrapperModule } from './curl-scrapper/curl-scrapper.module';

@Module({
  imports: [ScrapperModule, CurlScrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
