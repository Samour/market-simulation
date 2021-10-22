import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Views } from 'store/model/NavigationState';
import { changeNavigationLocationMutation } from 'store/mutations/navigation/ChangeNavigationLocationMutation';

export interface INavigationService {
  navigateTo(location: Views): void;
}

class NavigationService implements INavigationService {

  constructor(private readonly dispatch: Dispatch) { }

  navigateTo(location: Views): void {
    this.dispatch(changeNavigationLocationMutation(location));
  }
}

export const useNavigationService = (): INavigationService => {
  const dispatch = useDispatch();

  return useMemo(() =>
    new NavigationService(dispatch),
    [dispatch]
  );
};
