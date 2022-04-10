import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from '../http-client/http-client.service';
import { tickerHistoryMock } from './mocks/ticker-history.mock';
import { MoveAverageService } from './move-average.service';

const httpClientServiceMock = {
  getTickerHistory: jest.fn().mockReturnValue(tickerHistoryMock),
};

const moveAverageServiceMock = {
  create: jest.fn().mockReturnValue({
    date: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    avg_price: 200409.2813125,
  }),
  moveAverage: jest.fn().mockImplementation((queryString) => {
    return {
      date: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      avg_price: 200409.2813125,
    };
  }),
};

describe('MoveAverageService', () => {
  let service: MoveAverageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [MoveAverageService, HttpClientService],
    })
      .overrideProvider(MoveAverageService)
      .useValue(moveAverageServiceMock)
      .overrideProvider(HttpClientService)
      .useValue(httpClientServiceMock)
      .compile();

    service = module.get<MoveAverageService>(MoveAverageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when call moveAverage', () => {
    let result;
    beforeEach(async () => {
      const endTime = `${new Date().toISOString().slice(0, 11)}00:00:00`;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 7);
      const startTime = `${fromDate.toISOString().slice(0, 11)}00:00:00`;

      result = await service.moveAverage(
        `?InstrumentId=1&Interval=86400&FromDate=${startTime}&ToDate=${endTime}`,
      );
    });

    it('returns expected payload', () => {
      expect(result).toEqual({
        date: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
        avg_price: 200409.2813125,
      });
    });
  });

  describe('When call create', () => {
    let result;

    const endTime = `${new Date().toISOString().slice(0, 11)}00:00:00`;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    const startTime = `${fromDate.toISOString().slice(0, 11)}00:00:00`;

    const queryString = `?InstrumentId=1&Interval=86400&FromDate=${startTime}&ToDate=${endTime}`;

    beforeEach(async () => {
      result = await service.create(queryString);
      console.log(result);
    });

    it('returns expected payload', () => {
      expect(result).toEqual({ date: '10/04/2022', avg_price: 200409.2813125 });
    });
  });
});
