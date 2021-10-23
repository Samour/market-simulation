import { TimeSeries } from 'store/model/GraphState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface GraphAddMutation extends IMutation {
  type: MutationType.GRAPH_ADD;
  data: TimeSeries;
}

export const graphAddMutation = (data: TimeSeries): GraphAddMutation => ({
  type: MutationType.GRAPH_ADD,
  data,
});
