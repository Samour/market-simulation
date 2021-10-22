import { NavigationState, Views } from 'store/model/NavigationState';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';
import { ChangeNavigationLocationMutation } from 'store/mutations/navigation/ChangeNavigationLocationMutation';

const initialState: NavigationState = {
  location: Views.MainAnalysisView,
};

const reducer = (state: NavigationState | undefined, mutation: IMutation): NavigationState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.NAVIGATION_CHANGE_LOCATION) {
    const { location } = mutation as ChangeNavigationLocationMutation;
    return {
      ...state,
      location,
    };
  } else {
    return state;
  }
};

export default reducer;
