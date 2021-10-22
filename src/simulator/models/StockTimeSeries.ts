export interface StockClosePrice {
  date: Date;
  // Whole number of cents
  price: number;
}

export interface StockTimeSeries {
  code: string;
  priceTimeSeries: StockClosePrice[]
}
