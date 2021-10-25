import { MetricEvent } from './MetricEvent';

export type MetricEventListener = (metric: MetricEvent) => void;

export interface IMetricEventBus {
  setListener(listener: MetricEventListener): void;

  publishMetric(metric: MetricEvent): void;
}

export class MetricEventBus implements IMetricEventBus {

  private listener: MetricEventListener = () => { };

  setListener(listener: MetricEventListener): void {
    this.listener = listener;
  }

  publishMetric(metric: MetricEvent): void {
    this.listener?.(metric);
  }
}
