import { Test, TestingModule } from '@nestjs/testing';
import { CurlScrapperController } from './curl-scrapper.controller';

describe('CurlScrapperController', () => {
  let controller: CurlScrapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurlScrapperController],
    }).compile();

    controller = module.get<CurlScrapperController>(CurlScrapperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
