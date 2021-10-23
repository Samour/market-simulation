import { SimulationResult } from 'store/model/SimulationState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface SimulationSetResultMutation extends IMutation {
  type: MutationType.SIMULATION_SET_RESULT;
  result: SimulationResult | null;
}

export const simulationSetResultMutation = (result: SimulationResult | null): SimulationSetResultMutation => ({
  type: MutationType.SIMULATION_SET_RESULT,
  result,
});
