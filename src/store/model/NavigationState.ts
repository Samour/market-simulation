export enum Views {
  DatasetSelectionView = 'DatasetSelectionView',
  MainAnalysisView = 'MainAnalysisView',
  StrategySelectionView = 'StrategySelectionView',
  SimulationSettingsView = 'SimulationSettingsView',
}

export interface NavigationState {
  location: Views;
}
