import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import {
  createOrderDtoMock,
  responseCreateOrderMock,
  listOrdersMock,
} from './mocks/orders.mock';

describe('OrdersService', () => {
  let service: OrdersService;
  let result;

  const ordersServiceMock = {
    create: jest.fn().mockReturnValue(responseCreateOrderMock),
    findAll: jest.fn().mockReturnValue(listOrdersMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test.local', '.env.test', '.env'],
        }),
      ],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(ordersServiceMock)
      .compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.create', () => {
    it(`retunrs expected body`, async () => {
      result = await service.create(createOrderDtoMock);

      expect(result).toEqual({
        message: 'PPFVVJN5GHHGXJ order is being processed.',
      });
    });
  });

  describe('.findAll', () => {
    it(`retunrs expected body`, async () => {
      result = await service.findAll();

      expect(result.data).toEqual([
        {
          _id: '622c98011d5280d7f25f4a41',
          sn: 'O47QWBIVDEZQX2',
          client_order_id: '1234567906',
          market_symbol: 'usdtbrl',
          side: 'BUY',
          type: 'MARKET',
          state: 'ACTIVE',
          price: null,
          price_avg: '0.0',
          quantity: '2.0',
          quantity_executed: '0.0',
          instant_amount: null,
          instant_amount_executed: null,
          created_at: '2022-03-12T12:54:25.177Z',
          trades_count: 0,
          __v: 0,
        },
        {
          _id: '622c9a01852fa978ce76dc45',
          sn: 'O4XTZXPU2YIPLY',
          client_order_id: '1234567907',
          market_symbol: 'usdtbrl',
          side: 'BUY',
          type: 'MARKET',
          state: 'ACTIVE',
          price: null,
          price_avg: '0.0',
          quantity: '2.0',
          quantity_executed: '0.0',
          instant_amount: null,
          instant_amount_executed: null,
          created_at: '2022-03-12T13:02:56.767Z',
          trades_count: 0,
          __v: 0,
        },
      ]);
    });
  });
});
