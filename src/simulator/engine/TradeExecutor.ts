import { AlgorithmState } from 'simulator/models/AlgorithmState';
import { StockClosePrice } from 'simulator/models/StockTimeSeries';

export interface ITradeExecutor {
  executeTrade(dateOfTrade: StockClosePrice): void;
}

export class TradeExecutor implements ITradeExecutor {

  constructor(private readonly algorithmState: AlgorithmState) { }

  executeTrade(dateOfTrade: StockClosePrice): void {
    // Make capital available for investment
    const capitalToInvest = Math.min(
      this.algorithmState.accountBalances.uninvestedCapital,
      this.algorithmState.investmentStrategy.maxInvestmentPerTrade,
    );
    this.algorithmState.accountBalances.uninvestedCapital -= capitalToInvest;
    this.algorithmState.accountBalances.availableCapital += capitalToInvest;

    // Capital available after trade fee
    const capitalForTrade = this.algorithmState.accountBalances.availableCapital
      - this.algorithmState.investmentStrategy.perTradeCost;
    // No. of shares we can buy with this amount
    const shareCount = Math.floor(capitalForTrade / dateOfTrade.price);

    // Only execute trade if we can afford to buy at least 1 share
    if (shareCount < 1) {
      return;
    }

    const shareCost = shareCount * dateOfTrade.price;
    const shareAndTradeCost = shareCost + this.algorithmState.investmentStrategy.perTradeCost;

    this.algorithmState.accountBalances.availableCapital -= shareAndTradeCost;
    this.algorithmState.accountBalances.sharesOwned += shareCount;
    this.algorithmState.accountBalances.shareExpendature += shareCost;
    this.algorithmState.accountBalances.totalExpendature += shareAndTradeCost;
  }
}
