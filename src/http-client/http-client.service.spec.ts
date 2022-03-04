import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientModule } from './http-client.module';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let result;

  const httpClientServiceMock = {
    fetch: jest.fn().mockImplementation((url) => {
      try {
        if (url !== undefined) {
          return { data: 'Some data' };
        }
      } catch (error) {
        throw new BadRequestException('Bad Request');
      }
    }),
    post: jest.fn().mockImplementation((url, body, headers) => {
      return { data: 'Some data' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test.local', '.env.test', '.env'],
        }),
        HttpClientModule,
      ],
    })
      .overrideProvider(HttpClientService)
      .useValue(httpClientServiceMock)
      .compile();

    service = module.get<HttpClientService>(HttpClientService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.fetch', () => {
    describe(`when call fetch`, () => {
      it(`retunrs expected body`, async () => {
        result = await service.fetch('http://mockroute/api/any');
        expect(result).toEqual({ data: 'Some data' });
      });
    });

    describe(`when call fetch`, () => {
      it(`retunrs expected error`, async () => {
        try {
          await service.fetch(undefined);
        } catch (error) {
          expect(error).toThrowError();
        }
      });
    });
  });

  describe('.post', () => {
    const url = 'http://mockroute/api/any';
    const headers = {
      headers: {
        'X-CUSTOM-HEADER': 'x_custom_header',
      },
    };
    const body = {
      key: 'giropops',
    };

    it('returns expected body', async () => {
      const result = await service.post(url, body, headers);
      expect(result).toEqual({ data: 'Some data' });
    });
  });
});
