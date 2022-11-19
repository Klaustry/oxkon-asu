import { Test, TestingModule } from '@nestjs/testing';
import { CurlScrapperService } from './curl-scrapper.service';

describe('CurlScrapperService', () => {
  let service: CurlScrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurlScrapperService],
    }).compile();

    service = module.get<CurlScrapperService>(CurlScrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
