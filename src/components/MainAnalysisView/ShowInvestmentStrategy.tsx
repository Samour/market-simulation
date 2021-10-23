import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { AppState } from 'store/model/AppState';
import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { AdditionalCapitalFrequency } from 'simulator/models/InvestmentStrategy';
import './show-investment-strategy.css';

const selector = (state: AppState): InvestmentStrategy | null => state.investmentStrategy.investmentStrategy;

const toDollars = (value: number): string => `$${Math.round(value / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const frequencyDescription = (frequency: AdditionalCapitalFrequency): string => {
  if (frequency === AdditionalCapitalFrequency.DAILY) {
    return 'Daily';
  } else if (frequency === AdditionalCapitalFrequency.WEEKLY) {
    return 'Weekly';
  } else if (frequency === AdditionalCapitalFrequency.FORTNIGHTLY) {
    return 'Fortnightly';
  } else if (frequency === AdditionalCapitalFrequency.MONTHLY) {
    return 'Monthly';
  } else if (frequency === AdditionalCapitalFrequency.QUARTERLY) {
    return 'Quarterly';
  } else if (frequency === AdditionalCapitalFrequency.YEARLY) {
    return 'Yearly';
  } else if (frequency === AdditionalCapitalFrequency.NOT_APPLICABLE) {
    return 'N/A';
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
    <Grid container id='show-investment-strategy'>
      <Grid item xs={12} sm={6}>
        <Grid container>
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
            Additional capital frquency:
          </Grid>
          <Grid item xs={6}>
            {frequencyDescription(strategy.additionalCapitalFrequency)}
          </Grid>
          <Grid item xs={6}>
            Per-trade cost:
          </Grid>
          <Grid item xs={6}>
            {toDollars(strategy.perTradeCost)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShowInvestmentStrategy;
