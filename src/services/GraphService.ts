import { useMemo } from 'react';
import { useStore } from 'react-redux';
import { Store } from 'redux';
import { AppState } from 'store/model/AppState';
import { TimeSeriesDataPoint } from 'store/model/GraphState';
import { StockDataset } from 'store/model/StockDatasetsState';
import { graphAddMutation } from 'store/mutations/graph/GraphAddMutation';
import { graphRemoveAllMutation } from 'store/mutations/graph/GraphRemoveAllMutation';

const MAX_DATA_POINTS = 500;

export interface IGraphService {
  clearAllGraphs(): void;

  createGraphForStock(code: string): void;
}

class GraphService implements IGraphService {

  constructor(private readonly store: Store<AppState>) { }

  clearAllGraphs(): void {
    this.store.dispatch(graphRemoveAllMutation());
  }

  createGraphForStock(code: string): void {
    const dataset: StockDataset | undefined = this.store.getState()
      .stockDatasets
      .stockDatasets
      .find((d) => d.code === code);
    if (!dataset) {
      return;
    }

    let dataPoints: TimeSeriesDataPoint[] = dataset.closePrices
      .map(({ date, price }) => [date, price]);
    if (dataPoints.length > MAX_DATA_POINTS) {
      const reducedDataPoints: TimeSeriesDataPoint[] = [];
      for (let i = 0; i < MAX_DATA_POINTS; i++) {
        const idx = Math.floor(i * dataPoints.length / MAX_DATA_POINTS);
        reducedDataPoints.push(dataPoints[idx]);
      }
      dataPoints = reducedDataPoints;
    }

    console.log(dataPoints);
    this.store.dispatch(graphAddMutation({
      key: dataset.code,
      label: dataset.code,
      data: dataPoints,
    }));
  }
}

export const useGraphService = (): IGraphService => {
  const store = useStore();

  return useMemo(() =>
    new GraphService(store),
    [store]
  );
};
