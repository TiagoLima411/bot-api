import { SideEnum, StateEnum, TypeEnum } from '../interfaces/order.interface';

export const createOrderDtoMock = {
  side: SideEnum,
  type: TypeEnum,
  market_symbol: 'tbcbrl',
  client_order_id: '123456',
  quantity: '100.0',
  remark: 'teste',
  price: '123000',
};

export const responseCreateOrderMock = {
  message: `PPFVVJN5GHHGXJ order is being processed.`,
};

export const listOrdersMock = {
  data: [
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
  ],
};
