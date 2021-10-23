import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface SimulationInProgressMutation extends IMutation {
  type: MutationType.SIMULATION_IN_PROGRESS;
  simulationInProgress: boolean;
}

export const simulationInProgressMutation = (simulationInProgress: boolean): SimulationInProgressMutation => ({
  type: MutationType.SIMULATION_IN_PROGRESS,
  simulationInProgress,
});
