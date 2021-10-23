import { SimulationSettings } from 'store/model/SimulationState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface SimulationSetSettingsMutation extends IMutation {
  type: MutationType.SIMULATION_SET_SETTINGS;
  simulationSettings: SimulationSettings | null;
}

export const simulationSetSettingsMutation = (
  simulationSettings: SimulationSettings | null,
): SimulationSetSettingsMutation => ({
  type: MutationType.SIMULATION_SET_SETTINGS,
  simulationSettings,
});
