import { SimulationState } from 'store/model/SimulationState';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';
import { SimulationInProgressMutation } from 'store/mutations/simulation/SimulationInProgressMutation';
import { SimulationSetResultMutation } from 'store/mutations/simulation/SimulationSetResultMutation';
import { SimulationSetSettingsMutation } from 'store/mutations/simulation/SimulationSetSettingsMutation';

const initialState: SimulationState = {
  simulationSettings: null,
  simulationInProgress: false,
  result: null,
};

const reducer = (state: SimulationState | undefined, mutation: IMutation): SimulationState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.SIMULATION_SET_SETTINGS) {
    const { simulationSettings } = mutation as SimulationSetSettingsMutation;
    return {
      ...state,
      simulationSettings,
    };
  } else if (mutation.type === MutationType.SIMULATION_IN_PROGRESS) {
    const { simulationInProgress } = mutation as SimulationInProgressMutation;
    return {
      ...state,
      simulationInProgress,
    };
  } else if (mutation.type === MutationType.SIMULATION_SET_RESULT) {
    const { result } = mutation as SimulationSetResultMutation;
    return {
      ...state,
      result,
    };
  } else {
    return state;
  }
};

export default reducer;
