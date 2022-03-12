import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientModule } from './http-client.module';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let result;

  const httpClientServiceMock = {
    fetch: jest.fn().mockImplementation((op) => {
      return {
        sn: 'O3SBHQXZJGPEE2',
        client_order_id: null,
        market_symbol: 'usdtbrl',
        side: 'BUY',
        type: 'MARKET',
        state: 'FILLED',
        price: null,
        price_avg: '2.36',
        quantity: '0.0',
        quantity_executed: '5.0',
        instant_amount: null,
        instant_amount_executed: null,
        created_at: '2022-03-08T03:26:36.856Z',
        trades_count: 1,
      };
    }),
    post: jest.fn().mockImplementation(({}) => {
      return { sn: 'O3SBHQXZJGPEE2' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
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

  describe('.post', () => {
    it('returns expected body', async () => {
      const result = await service.post({
        method: 'POST',
        url: '/rest/v3/orders',
        query_param: '',
        query_string: '',
        body: {
          side: 'BUY',
          type: 'MARKET',
          market_symbol: 'usdtbrl',
          client_order_id: '1234',
          remark: 'A remarkable note for the order.',
          quantity: '2',
        },
      });

      expect(result).toEqual({ sn: 'O3SBHQXZJGPEE2' });
    });
  });

  describe('.fetch', () => {
    it(`retunrs expected body`, async () => {
      result = await service.fetch({
        method: 'GET',
        url: '/rest/v3/orders',
        query_param: '/O3SBHQXZJGPEE2',
        query_string: '',
        body: '',
      });

      expect(result).toEqual({
        sn: 'O3SBHQXZJGPEE2',
        client_order_id: null,
        market_symbol: 'usdtbrl',
        side: 'BUY',
        type: 'MARKET',
        state: 'FILLED',
        price: null,
        price_avg: '2.36',
        quantity: '0.0',
        quantity_executed: '5.0',
        instant_amount: null,
        instant_amount_executed: null,
        created_at: '2022-03-08T03:26:36.856Z',
        trades_count: 1,
      });
    });
  });
});
