import { SideEnum, StateEnum, TypeEnum } from '../interfaces/order.interface';

export const createOrderDtoMock = {
  sn: 'PPFVVJN5GHHGXJ',
  client_order_id: '123456',
  market_symbol: 'tbcbrl',
  side: SideEnum,
  type: TypeEnum,
  state: StateEnum,
  price: '5.2',
  price_avg: '0.1',
  quantity: '100.0',
  quantity_executed: '100.0',
  instant_amount: null,
  instant_amount_executed: null,
  created_at: '2022-02-08T18:06:10.026Z',
  trades_count: 1,
};

export const responseCreateOrderMock = {
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
};
