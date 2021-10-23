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
import { AdditionalCapitalFrequency } from 'simulator/models/InvestmentStrategy';
import './index.css';

const StrategySelectionView = (): JSX.Element => {
  const navigationService = useNavigationService();
  const {
    initialCapital,
    additionalCapital,
    additionalCapitalFrequency,
    perTradeCost,
    frequencyErrorMsg,
    setInitialCapital,
    setAdditionalCapital,
    setAdditionalCapitalFrequency,
    setPerTradeCost,
    onSubmit,
  } = useStrategySelectionForm();

  const onCancelClick = () => navigationService.navigateTo(Views.MainAnalysisView);

  return (
    <Container id='strategy-selection-view' maxWidth='md'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <FormControl>
            <InputLabel>Intial Capital</InputLabel>
            <Input
              value={initialCapital}
              onChange={(e) => setInitialCapital(e.target.value)}
              startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <FormControl>
            <InputLabel>Periodic Additional Capital</InputLabel>
            <Input
              value={additionalCapital}
              onChange={(e) => setAdditionalCapital(e.target.value)}
              startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} className='input-container'>
          <FormControl fullWidth>
            <InputLabel>Additional Capital Frequency</InputLabel>
            <Select
              label='Additional Capital Frequency'
              error={!!frequencyErrorMsg}
              value={additionalCapitalFrequency}
              onChange={(e) => setAdditionalCapitalFrequency(e.target.value as AdditionalCapitalFrequency)}>
              <MenuItem value={AdditionalCapitalFrequency.DAILY}>Daily</MenuItem>
              <MenuItem value={AdditionalCapitalFrequency.WEEKLY}>Weekly</MenuItem>
              <MenuItem value={AdditionalCapitalFrequency.FORTNIGHTLY}>Fortnightly</MenuItem>
              <MenuItem value={AdditionalCapitalFrequency.MONTHLY}>Monthly</MenuItem>
              <MenuItem value={AdditionalCapitalFrequency.QUARTERLY}>Quarterly</MenuItem>
              <MenuItem value={AdditionalCapitalFrequency.YEARLY}>Yearly</MenuItem>
            </Select>
            <FormHelperText error={!!frequencyErrorMsg}>{frequencyErrorMsg}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <FormControl>
            <InputLabel>Per-trade cost</InputLabel>
            <Input
              value={perTradeCost}
              onChange={(e) => setPerTradeCost(e.target.value)}
              startAdornment={<InputAdornment position='start'>$</InputAdornment>} />
          </FormControl>
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
