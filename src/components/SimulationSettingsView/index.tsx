import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useSimulationSettingsForm } from './simulationSettingsForm';
import './simulation-settings-view.css';

const SimulationSettingsView = (): JSX.Element => {
  const {
    startDate,
    endDate,
    startDateErrMsg,
    endDateErrMsg,
    setStartDate,
    setEndDate,
    onCancelClick,
    onConfirmClick,
  } = useSimulationSettingsForm();

  return (
    <Container maxWidth='md' id='simulation-settings-view'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <TextField
            variant='standard'
            label='Start date'
            error={!!startDateErrMsg}
            helperText={startDateErrMsg}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} />
        </Grid>
        <Grid item xs={12} className='input-container'>
          <TextField
            variant='standard'
            label='End date'
            error={!!endDateErrMsg}
            helperText={endDateErrMsg}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={3} className='input-container'>
          <Button color='secondary' onClick={onCancelClick}>Cancel</Button>
        </Grid>
        <Grid item xs={6} sm={3} className='input-container'>
          <Button variant='contained' onClick={onConfirmClick}>Confirm</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SimulationSettingsView;
