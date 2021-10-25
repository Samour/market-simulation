import { useMemo } from 'react';
import { useStore } from 'react-redux';
import { Store } from 'redux';
import { AppState } from 'store/model/AppState';
import { TimeSeries, TimeSeriesDataPoint } from 'store/model/GraphState';
import { StockDataset } from 'store/model/StockDatasetsState';
import { graphAddMutation } from 'store/mutations/graph/GraphAddMutation';
import { graphRemoveAllMutation } from 'store/mutations/graph/GraphRemoveAllMutation';
import { graphRemoveMutation } from 'store/mutations/graph/GraphRemoveMutation';

const MAX_DATA_POINTS = 500;

export interface IGraphService {
  createGraph(timeSeries: TimeSeries): void;

  clearSimulationGraphs(): void;

  clearAllGraphs(): void;

  createGraphForStock(code: string): void;
}

class GraphService implements IGraphService {

  constructor(private readonly store: Store<AppState>) { }

  clearAllGraphs(): void {
    this.store.dispatch(graphRemoveAllMutation());
  }

  createGraph(timeSeries: TimeSeries): void {
    let { data } = timeSeries;
    if (data.length > MAX_DATA_POINTS) {
      const reducedDataPoints: TimeSeriesDataPoint[] = [];
      for (let i = 0; i < MAX_DATA_POINTS; i++) {
        const idx = Math.floor(i * data.length / MAX_DATA_POINTS);
        reducedDataPoints.push(data[idx]);
      }
      data = reducedDataPoints;
    }

    this.store.dispatch(graphAddMutation({
      key: timeSeries.key,
      label: timeSeries.label,
      secondaryAxisID: timeSeries.secondaryAxisID,
      data,
    }));
  }

  clearSimulationGraphs(): void {
    this.store.dispatch(graphRemoveMutation('expenditure'));
    this.store.dispatch(graphRemoveMutation('investment'));
  }

  createGraphForStock(code: string): void {
    const dataset: StockDataset | undefined = this.store.getState()
      .stockDatasets
      .stockDatasets
      .find((d) => d.code === code);
    if (!dataset) {
      return;
    }

    let data: TimeSeriesDataPoint[] = dataset.closePrices
      .map(({ date, price }) => [date, price / 100]);

    this.createGraph({
      key: dataset.code,
      label: dataset.code,
      secondaryAxisID: 'Stock Price',
      data,
    });
  }
}

export const useGraphService = (): IGraphService => {
  const store = useStore();

  return useMemo(() =>
    new GraphService(store),
    [store]
  );
};
