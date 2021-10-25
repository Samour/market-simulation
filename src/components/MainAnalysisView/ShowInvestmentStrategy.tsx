import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { AppState } from 'store/model/AppState';
import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { InvestmentFrequency } from 'simulator/models/InvestmentStrategy';

const selector = (state: AppState): InvestmentStrategy | null => state.investmentStrategy.investmentStrategy;

const toDollars = (value: number): string => `$${(value / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const frequencyDescription = (frequency: InvestmentFrequency): string => {
  if (frequency === InvestmentFrequency.DAILY) {
    return 'Daily';
  } else if (frequency === InvestmentFrequency.WEEKLY) {
    return 'Weekly';
  } else if (frequency === InvestmentFrequency.FORTNIGHTLY) {
    return 'Fortnightly';
  } else if (frequency === InvestmentFrequency.MONTHLY) {
    return 'Monthly';
  } else if (frequency === InvestmentFrequency.QUARTERLY) {
    return 'Quarterly';
  } else if (frequency === InvestmentFrequency.YEARLY) {
    return 'Yearly';
  } else {
    return frequency;
  }
};

const ShowInvestmentStrategy = (): JSX.Element => {
  const strategy = useSelector(selector);

  if (!strategy) {
    return <></>;
  }

  return (
    <Grid container className='stats-container'>
      <Grid item xs={6}>
        Initial capital:
      </Grid>
      <Grid item xs={6}>
        {toDollars(strategy.initialCapital)}
      </Grid>
      <Grid item xs={6}>
        Periodic additional capital:
      </Grid>
      <Grid item xs={6}>
        {toDollars(strategy.periodicAdditionalCapital)}
      </Grid>
      <Grid item xs={6}>
        Investment frquency:
      </Grid>
      <Grid item xs={6}>
        {frequencyDescription(strategy.investmentFrequency)}
      </Grid>
      <Grid item xs={6}>
        Max investment per trade:
      </Grid>
      <Grid item xs={6}>
        {toDollars(strategy.maxInvestmentPerTrade)}
      </Grid>
      <Grid item xs={6}>
        Per-trade cost:
      </Grid>
      <Grid item xs={6}>
        {toDollars(strategy.perTradeCost)}
      </Grid>
    </Grid>
  );
};

export default ShowInvestmentStrategy;
