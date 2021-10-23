import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigationService } from 'services/NavigationService';
import { AdditionalCapitalFrequency } from 'store/model/InvestmentStrategyState';
import { Views } from 'store/model/NavigationState';
import { investmentStrategySetStrategy } from 'store/mutations/investmentStrategy/InvestmentStrategySetStrategyMutation';

const NUMERIC_ALLOWED_CHARS = /^[0-9]*(\.[0-9]{0,2})?$/;

export const useStrategySelectionForm = () => {
  const dispatch = useDispatch();
  const navigationService = useNavigationService();
  const [initialCapital, setInitialCapital] = useState<string>('0');
  const [additionalCapital, setAdditionalCapital] = useState<string>('0');
  const [
    additionalCapitalFrequency,
    setAdditionalCapitalFrequency
  ] = useState<AdditionalCapitalFrequency | ''>('');
  const [perTradeCost, setPerTradeCost] = useState<string>('0');
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
    const periodicAdditionalCapital = parseNumeric(additionalCapital);
    if (!!periodicAdditionalCapital && !additionalCapitalFrequency) {
      setFrequencyErrorMsg('You must select a frequency');
      return;
    }

    dispatch(investmentStrategySetStrategy({
      initialCapital: parseNumeric(initialCapital),
      periodicAdditionalCapital,
      additionalCapitalFrequency: additionalCapitalFrequency || AdditionalCapitalFrequency.YEARLY,
      perTradeCost: parseNumeric(perTradeCost),
    }));
    navigationService.navigateTo(Views.MainAnalysisView);
  };

  return {
    initialCapital,
    additionalCapital,
    additionalCapitalFrequency,
    perTradeCost,
    frequencyErrorMsg,
    setInitialCapital: setIfValidAmount(setInitialCapital),
    setAdditionalCapital: setIfValidAmount(setAdditionalCapital),
    setAdditionalCapitalFrequency: (value: AdditionalCapitalFrequency) => {
      setFrequencyErrorMsg(null);
      setAdditionalCapitalFrequency(value);
    },
    setPerTradeCost: setIfValidAmount(setPerTradeCost),
    onSubmit,
  };
};
