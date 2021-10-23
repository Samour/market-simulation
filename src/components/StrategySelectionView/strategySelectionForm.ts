import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigationService } from 'services/NavigationService';
import { InvestmentFrequency } from 'simulator/models/InvestmentStrategy';
import { AppState } from 'store/model/AppState';
import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { Views } from 'store/model/NavigationState';
import { investmentStrategySetStrategy } from 'store/mutations/investmentStrategy/InvestmentStrategySetStrategyMutation';
import { simulationSetResultMutation } from 'store/mutations/simulation/SimulationSetResultMutation';

const NUMERIC_ALLOWED_CHARS = /^[0-9]*(\.[0-9]{0,2})?$/;

const selector = (state: AppState): InvestmentStrategy | null => state.investmentStrategy.investmentStrategy;

const centsToDollars = (value: number | undefined) => {
  return ((value ?? 0) / 100).toFixed(2);
};

export const useStrategySelectionForm = () => {
  const dispatch = useDispatch();
  const navigationService = useNavigationService();
  const existingStrategy = useSelector(selector);

  const [initialCapital, setInitialCapital] = useState<string>(centsToDollars(existingStrategy?.initialCapital));
  const [additionalCapital, setAdditionalCapital] = useState<string>(
    centsToDollars(existingStrategy?.periodicAdditionalCapital)
  );
  const [
    investmentFrequency,
    setInvestmentFrequency,
  ] = useState<InvestmentFrequency | ''>(existingStrategy?.investmentFrequency ?? '');
  const [maxInvestmentPerTrade, setMaxInvestmentPerTrade] = useState<string>(
    centsToDollars(existingStrategy?.maxInvestmentPerTrade)
  );
  const [perTradeCost, setPerTradeCost] = useState<string>(centsToDollars(existingStrategy?.perTradeCost));
  const [frequencyErrorMsg, setFrequencyErrorMsg] = useState<string | null>(null);

  const setIfValidAmount = (setter: (value: string) => void) => (value: string) => {
    if (NUMERIC_ALLOWED_CHARS.test(value)) {
      setter(value);
    }
  };

  const parseNumeric = (value: string): number => {
    const converted = Number.parseFloat(value);
    if (Number.isNaN(converted)) {
      return 0;
    }

    return Math.round(converted * 100);
  };

  const onSubmit = () => {
    if (!investmentFrequency) {
      setFrequencyErrorMsg('You must select a frequency');
      return;
    }

    dispatch(investmentStrategySetStrategy({
      initialCapital: parseNumeric(initialCapital),
      periodicAdditionalCapital: parseNumeric(additionalCapital),
      investmentFrequency,
      maxInvestmentPerTrade: parseNumeric(maxInvestmentPerTrade),
      perTradeCost: parseNumeric(perTradeCost),
    }));
    dispatch(simulationSetResultMutation(null));
    navigationService.navigateTo(Views.MainAnalysisView);
  };

  return {
    initialCapital,
    additionalCapital,
    investmentFrequency,
    maxInvestmentPerTrade,
    perTradeCost,
    frequencyErrorMsg,
    setInitialCapital: setIfValidAmount(setInitialCapital),
    setAdditionalCapital: setIfValidAmount(setAdditionalCapital),
    setInvestmentFrequency: (value: InvestmentFrequency) => {
      setFrequencyErrorMsg(null);
      setInvestmentFrequency(value);
    },
    setMaxInvestmentPerTrade: setIfValidAmount(setMaxInvestmentPerTrade),
    setPerTradeCost: setIfValidAmount(setPerTradeCost),
    onSubmit,
  };
};
