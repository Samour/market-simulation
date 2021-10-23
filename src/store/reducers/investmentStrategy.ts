import { InvestementStrategyState } from 'store/model/InvestmentStrategyState';
import { IMutation } from 'store/mutations/IMutation';
import { InvestmentStrategySetStrategyMutation } from 'store/mutations/investmentStrategy/InvestmentStrategySetStrategyMutation';
import { MutationType } from 'store/mutations/MutationType';

const initialState: InvestementStrategyState = {
  investmentStrategy: null,
};

const reducer = (state: InvestementStrategyState | undefined, mutation: IMutation): InvestementStrategyState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.INVESTMENT_STRATEGY_SET_STRATEGY) {
    const { investmentStrategy } = mutation as InvestmentStrategySetStrategyMutation;
    return {
      ...state,
      investmentStrategy,
    };
  } else {
    return state;
  }
};

export default reducer;
