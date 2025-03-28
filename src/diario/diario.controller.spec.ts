import { Test, TestingModule } from '@nestjs/testing';
import { DiarioController } from './diario.controller';

describe('DiarioController', () => {
  let controller: DiarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiarioController],
    }).compile();

    controller = module.get<DiarioController>(DiarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
