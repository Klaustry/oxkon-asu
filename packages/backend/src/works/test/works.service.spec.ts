import { Test, TestingModule } from '@nestjs/testing';

import { CreateWorkDto, UpdateWorkDto } from '../works.dto';
import { WorkService } from '../works.service';

const MockService = {
  save: jest
    .fn()
    .mockImplementation((id: string, createWorkDto: CreateWorkDto) => {
      return {
        id: 'testid',
        dateCreated: new Date(),
        ...createWorkDto,
      };
    }),
  findAll: jest.fn().mockImplementation(() => {
    return [
      {
        id: 'testid1',
        work_id: 'test1',
        work_name: 'test1',
        dateCreated: new Date(),
      },
      {
        id: 'testid2',
        work_id: 'test2',
        work_name: 'test2',
        dateCreated: new Date(),
      },
      {
        id: 'testid3',
        work_id: 'test3',
        work_name: 'test3',
        dateCreated: new Date(),
      },
    ];
  }),
  findById: jest.fn().mockImplementation((id: string) => {
    return {
      id,
      work_id: 'test',
      work_name: 'test',
      dateCreated: new Date(),
    };
  }),
  findByCourseIdAndId: jest
    .fn()
    .mockImplementation((courseId: string, id: string) => {
      return {
        id,
        work_id: 'test',
        work_name: 'test',
        dateCreated: new Date(),
      };
    }),
  findAllByCourseId: jest.fn().mockImplementation((id: string) => {
    return [
      {
        id: 'testid1',
        work_id: 'test1',
        work_name: 'test1',
        dateCreated: new Date(),
      },
      {
        id: 'testid2',
        work_id: 'test2',
        work_name: 'test2',
        dateCreated: new Date(),
      },
      {
        id: 'testid3',
        work_id: 'test3',
        work_name: 'test3',
        dateCreated: new Date(),
      },
    ];
  }),
  update: jest
    .fn()
    .mockImplementation(
      (id: string, workId: string, updateWorkDto: UpdateWorkDto) => {
        return {
          id: workId,
          ...updateWorkDto,
        };
      },
    ),
  delete: jest.fn().mockImplementation((id: string, workId: string) => workId),
  count: jest.fn().mockReturnValue(10),
};

describe('WorkService', () => {
  let service: WorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WorkService,
          useValue: MockService,
        },
      ],
    }).compile();

    service = module.get<WorkService>(WorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveWork', () => {
    it('should get the saved work', async () => {
      const spy = jest.spyOn(global, 'Date');
      const work = await service.save('testcourseid', {
        work_id: 'test',
        work_name: 'test',
      });
      const date = spy.mock.instances[0];

      expect(work).toEqual({
        id: 'testid',
        work_id: 'test',
        work_name: 'test',
        dateCreated: date,
      });
    });
  });

  describe('findAllWork', () => {
    it('should get the list of all works', async () => {
      const works = await service.findAll({});
      expect(works[0].id).toBe('testid1');
      expect(works[1].work_id).toBe('test2');
      expect(works[2].work_name).toBe('test3');
    });
  });

  describe('findWorkById', () => {
    it('should get a work by id', async () => {
      const spy = jest.spyOn(global, 'Date');
      const work = await service.findById('testid');
      const date = spy.mock.instances[0];

      expect(work).toEqual({
        id: 'testid',
        work_id: 'test',
        work_name: 'test',
        dateCreated: date,
      });
    });
  });

  describe('findAllWorksByCourseIdAndId', () => {
    it('should get a contets', async () => {
      const spy = jest.spyOn(global, 'Date');
      const work = await service.findByCourseIdAndId('testcourseid', 'testid');
      const date = spy.mock.instances[0];

      expect(work).toEqual({
        id: 'testid',
        work_id: 'test',
        work_name: 'test',
        dateCreated: date,
      });
    });
  });

  describe('findAllWorksByCourseId', () => {
    it('should get the array of works', async () => {
      const works = await service.findAllByCourseId('testcourseid', {});

      expect(works[0].id).toBe('testid1');
      expect(works[1].work_id).toBe('test2');
      expect(works[2].work_name).toBe('test3');
    });
  });

  describe('updateWork', () => {
    it('should update a work and return changed values', async () => {
      const updatedWork = await service.update('testid', 'testworkid', {
        work_id: 'test',
        work_name: 'test',
      });

      expect(updatedWork).toEqual({
        id: 'testworkid',
        work_id: 'test',
        work_name: 'test',
      });

      const updatedWork2 = await service.update('testid', 'testworkid2', {
        work_name: 'test',
      });

      expect(updatedWork2).toEqual({
        id: 'testworkid2',
        work_name: 'test',
      });
    });
  });

  describe('deleteWork', () => {
    it('should delete a work and return the id', async () => {
      const id = await service.delete('testid', 'testworkid');
      expect(id).toBe('testworkid');
    });
  });

  describe('countWorks', () => {
    it('should get number of works', async () => {
      const count = await service.count();
      expect(count).toBe(10);
    });
  });
});
