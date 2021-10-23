import { EndOfMonthPeriodCalculator, FixedNoOfDaysPeriodCalculator, IPeriodElapsed } from 'simulator/engine/PeriodElapsed';
import { InvestmentFrequency, InvestmentStrategy } from 'simulator/models/InvestmentStrategy';

export interface IPeriodElapsedFactory {
  createPeriodElapsed(investmentStrategy: InvestmentStrategy): IPeriodElapsed;
}

class PeriodElapsedFactory implements IPeriodElapsedFactory {
  
  createPeriodElapsed(investmentStrategy: InvestmentStrategy): IPeriodElapsed {
    if (investmentStrategy.investmentFrequency === InvestmentFrequency.DAILY) {
      return new FixedNoOfDaysPeriodCalculator(1);
    } else if (investmentStrategy.investmentFrequency === InvestmentFrequency.WEEKLY) {
      return new FixedNoOfDaysPeriodCalculator(7);
    } else if (investmentStrategy.investmentFrequency === InvestmentFrequency.FORTNIGHTLY) {
      return new FixedNoOfDaysPeriodCalculator(14);
    } else if (investmentStrategy.investmentFrequency === InvestmentFrequency.MONTHLY) {
      return new EndOfMonthPeriodCalculator(1);
    } else if (investmentStrategy.investmentFrequency === InvestmentFrequency.QUARTERLY) {
      return new EndOfMonthPeriodCalculator(3);
    } else if (investmentStrategy.investmentFrequency === InvestmentFrequency.YEARLY) {
      return new EndOfMonthPeriodCalculator(12);
    } else {
      throw new Error(`InvestmentFrequency value not recognized: ${investmentStrategy.investmentFrequency}`);
    }
  }
}

export const periodElapsedFactory = (): IPeriodElapsedFactory => new PeriodElapsedFactory();
