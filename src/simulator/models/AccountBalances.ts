export interface AccountBalances {
  // Total liquid capital
  uninvestedCapital: number;
  // Liquid capital available for investment at the next trade
  availableCapital: number;
  // Number of stocks owned
  sharesOwned: number;
}
