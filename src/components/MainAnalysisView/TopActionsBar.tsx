import React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { Views } from 'store/model/NavigationState';
import './top-actions-bar.css';

const TopActionsBar = (): JSX.Element => {
  const navigationService = useNavigationService();
  const loadDatasetClick = () => navigationService.navigateTo(Views.DatasetSelectionView);

  return (
    <Grid container id='top-actions-bar'>
      <Grid item xs={12} md={6} className='button-container'>
        <Button variant='contained' onClick={loadDatasetClick}>Load dataset</Button>
      </Grid>
    </Grid>
  );
};

export default TopActionsBar;
