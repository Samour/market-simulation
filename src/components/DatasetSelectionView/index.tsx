import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, TextField, Button } from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { useDatasetSelectionService } from 'services/DatasetSelectionService';
import { Views } from 'store/model/NavigationState';
import { AppState } from 'store/model/AppState';
import { DatasetSelectionState } from 'store/model/DatasetSelectionState';
import './index.css';

const selector = (state: AppState): DatasetSelectionState => state.datasetSelection;

const DatasetSelectionView = (): JSX.Element => {
  const navigationService = useNavigationService();
  const datasetSelectionService = useDatasetSelectionService();
  const { code } = useSelector(selector);
  const [file, setFile] = useState<File | null>(null);
  
  const onCodeChange = (e: any) => datasetSelectionService.setCode(e.target.value);
  const onFileChange = (e: any) => setFile(e.target.files[0] ?? null);
  const onCancelClick = () => {
    datasetSelectionService.clearForm();
    navigationService.navigateTo(Views.MainAnalysisView);
  };

  return (
    <Container id='dataset-selection-view' maxWidth='md'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <input type='file' accept='text/csv' onChange={onFileChange} />
        </Grid>
        <Grid item xs={12} className='input-container'>
          <TextField label='Code' variant='standard' value={code} onChange={onCodeChange} />
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button color='secondary' onClick={onCancelClick}>Cancel</Button>
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button variant='contained'>Use dataset</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DatasetSelectionView;
