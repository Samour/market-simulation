import { Dispatch } from 'redux';
import { MetricEvent } from 'simulator/metric/MetricEvent';
import { AccountBalances } from 'simulator/models/AccountBalances';
import { StockClosePrice } from 'store/model/StockDatasetsState';
import { simulationSetResultMutation } from 'store/mutations/simulation/SimulationSetResultMutation';
import { IGraphService } from './GraphService';

interface MetricDetails {
  date: Date;
  totalExpenditure: number;
  investmentValue: number;
}

export class SimulationAnalyser {

  private readonly metrics: MetricDetails[] = [];

  constructor(
    private readonly graphService: IGraphService,
    private readonly dispatch: Dispatch,
    private readonly priceTimeSeries: StockClosePrice[],
  ) { }

  receiveMetric(metric: MetricEvent): void {
    this.metrics.push({
      date: metric.date,
      totalExpenditure: metric.accountBalances.totalExpendature,
      investmentValue: metric.accountBalances.sharesOwned * metric.closingPrice,
    });
  }

  publishMetrics(accountBalances: AccountBalances): void {
    const {
      uninvestedCapital,
      availableCapital,
      shareExpendature,
      totalExpendature,
      sharesOwned,
    } = accountBalances;
    const finalSharePrice = this.priceTimeSeries[this.priceTimeSeries.length - 1].price;
    const shareValue = sharesOwned * finalSharePrice;
    const returnOnInvestment = Math.round(shareValue * 100 * 100 / totalExpendature - 10000) / 100;

    this.dispatch(simulationSetResultMutation({
      uninvestedCapital: uninvestedCapital + availableCapital,
      totalAmountInvested: shareExpendature,
      totalAmountSpent: totalExpendature,
      sharesOwned,
      shareValue,
      returnOnInvestment,
    }));

    this.graphService.createGraph({
      key: 'expenditure',
      label: 'Total Expenditure',
      secondaryAxisID: 'Investment Value',
      data: this.metrics.map(({ date, totalExpenditure }) => [date, totalExpenditure / 100]),
    });
    this.graphService.createGraph({
      key: 'investment',
      label: 'Investment Value',
      secondaryAxisID: 'Investment Value',
      data: this.metrics.map(({ date, investmentValue }) => [date, investmentValue / 100]),
    });
  }
}
