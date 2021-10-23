import dayjs from 'dayjs';
import { IParseStrategy } from './IParseStrategy';

const parseToDate = (value: string): Date => {
  const result = dayjs(value).toDate();
  if (Number.isNaN(result.getTime())) {
    throw new Error('Failure while parsing Date value');
  }

  return result;
};

const parseToCents = (value: string): number => {
  const result = Math.round(Number.parseFloat(value) * 100);
  if (Number.isNaN(result)) {
    throw new Error('Failure while parsing numeric value');
  }

  return result;
};

export const yahooFinanceParseStrategy = (): IParseStrategy => (result) => {
  return result.data.map((e) => ({
    date: parseToDate(e['Date']),
    price: parseToCents(e['Close']),
  }));
};
