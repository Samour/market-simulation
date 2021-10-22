export enum Views {
  DatasetSelectionView = 'DatasetSelectionView',
  MainAnalysisView = 'MainAnalysisView',
}

export interface NavigationState {
  location: Views;
}
