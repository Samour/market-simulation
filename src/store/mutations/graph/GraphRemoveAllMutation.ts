import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface GraphRemoveAllMutation extends IMutation {
  type: MutationType.GRAPH_REMOVE_ALL;
}

export const graphRemoveAllMutation = (): GraphRemoveAllMutation => ({
  type: MutationType.GRAPH_REMOVE_ALL,
});
