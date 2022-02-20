import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let result: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    result = controller.check();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.check', () => {
    it('resturns expected attributes', () => {
      expect(result.status).toEqual('ok');
      expect(result.ts).toBeDefined();
      expect(result.version).toEqual('0.0.2');
    });
  });
});
