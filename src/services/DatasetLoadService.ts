import Papa, { ParseResult } from 'papaparse';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { StockClosePrice } from 'store/model/StockDatasetsState';
import { stockDatasetsAddMutation } from 'store/mutations/stockDatasets/StockDatasetsAddMutation';
import { stockDatasetsRemoveAllMutation } from 'store/mutations/stockDatasets/StockDatasetsRemoveAllMutation';
import { IGraphService, useGraphService } from './GraphService';
import { IParseStrategy } from './parse/IParseStrategy';
import { yahooFinanceParseStrategy } from './parse/YahooFinanceParseStrategy';

export interface IDatasetLoadService {
  loadDatasetFile(code: string, file: File): Promise<string | null>;
}

class DatasetLoadService implements IDatasetLoadService {

  constructor(private readonly parseStrategy: IParseStrategy, private readonly graphService: IGraphService,
    private readonly dispatch: Dispatch) { }

  private async parseFileCSV(file: File): Promise<StockClosePrice[]> {
    return new Promise<ParseResult<any>>((complete, error) => {
      Papa.parse(file, {
        header: true,
        complete,
        error,
      });
    }).then((result) => this.parseStrategy(result));
  }

  async loadDatasetFile(code: string, file: File): Promise<string | null> {
    let closePrices: StockClosePrice[];
    try {
      closePrices = await this.parseFileCSV(file);
    } catch (e) {
      return 'There is a problem with the file format';
    }

    this.dispatch(stockDatasetsRemoveAllMutation());
    this.dispatch(stockDatasetsAddMutation({ code, closePrices }));

    this.graphService.clearAllGraphs();
    this.graphService.createGraphForStock(code);

    return null;
  }
}

export const useDatasetLoadService = (): IDatasetLoadService => {
  const graphService = useGraphService();
  const dispatch = useDispatch();

  return useMemo(() =>
    new DatasetLoadService(yahooFinanceParseStrategy(), graphService, dispatch),
    [graphService, dispatch]
  );
};
