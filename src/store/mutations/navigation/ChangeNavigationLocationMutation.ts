import { Views } from 'store/model/NavigationState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface ChangeNavigationLocationMutation extends IMutation {
  type: MutationType.NAVIGATION_CHANGE_LOCATION;
  location: Views;
}

export const changeNavigationLocationMutation = (location: Views): ChangeNavigationLocationMutation => ({
  type: MutationType.NAVIGATION_CHANGE_LOCATION,
  location,
});
