export interface AccountBalances {
  // Total liquid capital
  uninvestedCapital: number;
  // Liquid capital available for investment at the next trade
  availableCapital: number;
  // Running total of amount spent buying shares
  shareExpendature: number;
  // Running total of amount spent to buy shares + trading fees
  totalExpendature: number;
  // Number of stocks owned
  sharesOwned: number;
}
