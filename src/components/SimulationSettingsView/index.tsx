import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { Views } from 'store/model/NavigationState';
import './simulation-settings-view.css';

const SimulationSettingsView = (): JSX.Element => {
  const navigationService = useNavigationService();

  const onCancelClick = () => navigationService.navigateTo(Views.MainAnalysisView);

  return (
    <Container maxWidth='md' id='simulation-settings-view'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <TextField variant='standard' label='Start date' />
        </Grid>
        <Grid item xs={12} className='input-container'>
          <TextField variant='standard' label='End date date' />
        </Grid>
        <Grid item xs={6} sm={3} className='input-container'>
          <Button color='secondary' onClick={onCancelClick}>Cancel</Button>
        </Grid>
        <Grid item xs={6} sm={3} className='input-container'>
          <Button variant='contained'>Confirm</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SimulationSettingsView;
