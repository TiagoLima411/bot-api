import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SignatureService } from './signature.service';

describe('SignatureService', () => {
  let service: SignatureService;
  const configService = new ConfigService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test.local', '.env.test', '.env'],
        }),
      ],
      providers: [SignatureService],
    }).compile();

    service = module.get<SignatureService>(SignatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('.create', async () => {
    const req = {
      method: 'GET',
      url: `${configService.get<string>('BASE_PATH')}/me`,
      query: null,
      boby: null,
    };

    const result = await service.create(req);
    expect(result).toMatch(/[a-z,0-9]/);
  });
});
