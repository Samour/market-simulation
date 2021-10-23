export enum Views {
  DatasetSelectionView = 'DatasetSelectionView',
  MainAnalysisView = 'MainAnalysisView',
  StrategySelectionView = 'StrategySelectionView',
}

export interface NavigationState {
  location: Views;
}
