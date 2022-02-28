import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import {
  createOrderDtoMock,
  responseCreateOrderMock,
} from './mocks/orders.mock';

describe('HttpClientService', () => {
  let service: OrdersService;
  let result;

  const ordersServiceMock = {
    create: jest.fn().mockReturnValue(responseCreateOrderMock),
    findAll: jest.fn().mockReturnValue({ data: [responseCreateOrderMock] }),
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
        sn: 'PPFVVJN5GHHGXJ',
        client_order_id: '123456',
        market_symbol: 'tbcbrl',
        side: 'SELL',
        type: 'MARKET',
        state: 'CANCELED',
        price: '5.2',
        price_avg: '0.0',
        quantity: '100.0',
        quantity_executed: '100.0',
        instant_amount: null,
        instant_amount_executed: null,
        created_at: '2022-02-08T18:06:10.026Z',
        trades_count: 0,
        _id: '621b6739fe284e9bd3e10220',
        __v: 0,
      });
    });
  });

  describe('.findAll', () => {
    it(`retunrs expected body`, async () => {
      result = await service.findAll();

      expect(result).toEqual({
        data: [
          {
            sn: 'PPFVVJN5GHHGXJ',
            client_order_id: '123456',
            market_symbol: 'tbcbrl',
            side: 'SELL',
            type: 'MARKET',
            state: 'CANCELED',
            price: '5.2',
            price_avg: '0.0',
            quantity: '100.0',
            quantity_executed: '100.0',
            instant_amount: null,
            instant_amount_executed: null,
            created_at: '2022-02-08T18:06:10.026Z',
            trades_count: 0,
            _id: '621b6739fe284e9bd3e10220',
            __v: 0,
          },
        ],
      });
    });
  });
});
