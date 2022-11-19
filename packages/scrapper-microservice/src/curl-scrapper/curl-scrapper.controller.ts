import { Controller, Get } from '@nestjs/common';
import { CurlScrapperService } from './curl-scrapper.service';

@Controller('curl-scrapper')
export class CurlScrapperController {
  constructor(private curlScrapperService: CurlScrapperService) {}
  @Get()
  scrapperController() {
    return this.curlScrapperService.getDataViaCurl();
  }
}
