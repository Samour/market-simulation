import React from 'react';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { useStrategySelectionForm } from './strategySelectionForm';
import { Views } from 'store/model/NavigationState';
import { InvestmentFrequency } from 'simulator/models/InvestmentStrategy';
import './index.css';

const StrategySelectionView = (): JSX.Element => {
  const navigationService = useNavigationService();
  const {
    initialCapital,
    additionalCapital,
    investmentFrequency,
    maxInvestmentPerTrade,
    perTradeCost,
    frequencyErrorMsg,
    setInitialCapital,
    setAdditionalCapital,
    setInvestmentFrequency,
    setMaxInvestmentPerTrade,
    setPerTradeCost,
    onSubmit,
  } = useStrategySelectionForm();

  const onCancelClick = () => navigationService.navigateTo(Views.MainAnalysisView);

  return (
    <Container id='strategy-selection-view' maxWidth='md'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Intial Capital</InputLabel>
              <Input
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
                startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Periodic Additional Capital</InputLabel>
              <Input
                value={additionalCapital}
                onChange={(e) => setAdditionalCapital(e.target.value)}
                startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Investment Frequency</InputLabel>
              <Select
                label='Investment Frequency'
                error={!!frequencyErrorMsg}
                value={investmentFrequency}
                onChange={(e) => setInvestmentFrequency(e.target.value as InvestmentFrequency)}>
                <MenuItem value={InvestmentFrequency.DAILY}>Daily</MenuItem>
                <MenuItem value={InvestmentFrequency.WEEKLY}>Weekly</MenuItem>
                <MenuItem value={InvestmentFrequency.FORTNIGHTLY}>Fortnightly</MenuItem>
                <MenuItem value={InvestmentFrequency.MONTHLY}>Monthly</MenuItem>
                <MenuItem value={InvestmentFrequency.QUARTERLY}>Quarterly</MenuItem>
                <MenuItem value={InvestmentFrequency.YEARLY}>Yearly</MenuItem>
              </Select>
              <FormHelperText error={!!frequencyErrorMsg}>{frequencyErrorMsg}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Maximum investment per trade</InputLabel>
              <Input
                value={maxInvestmentPerTrade}
                onChange={(e) => setMaxInvestmentPerTrade(e.target.value)}
                startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Per-trade cost</InputLabel>
              <Input
                value={perTradeCost}
                onChange={(e) => setPerTradeCost(e.target.value)}
                startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button color='secondary' onClick={onCancelClick}>Cancel</Button>
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button variant='contained' onClick={onSubmit}>Use strategy</Button>
        </Grid>
      </Grid>
    </Container >
  );
};

export default StrategySelectionView;
