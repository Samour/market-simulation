import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface GraphRemoveMutation extends IMutation {
  type: MutationType.GRAPH_REMOVE;
  key: string;
}

export const graphRemoveMutation = (key: string): GraphRemoveMutation => ({
  type: MutationType.GRAPH_REMOVE,
  key,
});
