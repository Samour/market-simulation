import { ParseResult } from 'papaparse';
import { StockClosePrice } from 'store/model/StockDatasetsState';

export type IParseStrategy = (result: ParseResult<any>) => StockClosePrice[];
