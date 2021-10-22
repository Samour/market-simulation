export type TimeSeriesDataPoint = [Date, number];

export interface TimeSeries {
  key: string;
  label: string;
  data: TimeSeriesDataPoint[];
}

export type AxisType = 'linear' | 'ordinal' | 'time' | 'utc' | 'log';
export type AxisPosition = 'top' | 'bottom' | 'left' | 'right';

export interface Axis {
  type: AxisType;
  position: AxisPosition;
  primary?: boolean;
}

export interface GraphState {
  data: TimeSeries[];
  axes: Axis[];
}
