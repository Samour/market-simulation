import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface InvestmentStrategySetStrategyMutation extends IMutation {
  type: MutationType.INVESTMENT_STRATEGY_SET_STRATEGY;
  investmentStrategy: InvestmentStrategy | null;
}

export const investmentStrategySetStrategy = (
  investmentStrategy: InvestmentStrategy | null,
): InvestmentStrategySetStrategyMutation => ({
  type: MutationType.INVESTMENT_STRATEGY_SET_STRATEGY,
  investmentStrategy,
});
