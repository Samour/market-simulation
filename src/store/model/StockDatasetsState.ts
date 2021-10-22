export interface StockClosePrice {
  date: Date;
  price: number;
}

export interface StockDataset {
  code: string;
  closePrices: StockClosePrice[];
}

export interface StockDatasetState {
  stockDatasets: StockDataset[];
}
