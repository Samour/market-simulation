import React from 'react';
import { Container, Grid, TextField, Button, CircularProgress } from '@mui/material';
import './index.css';
import { useDatasetSelectionForm } from './datasetSelectionForm';

const DatasetSelectionView = (): JSX.Element => {
  const {
    fileErrorMsg,
    code,
    codeErrorMsg,
    fileIsLoading,
    setCode,
    setFile,
    onCancelClick,
    onConfirmClick,
  } = useDatasetSelectionForm();

  const onCodeChange = (e: any) => setCode(e.target.value);
  const onFileChange = (e: any) => setFile(e.target.files[0] ?? null);

  const confirmBtnContent = fileIsLoading ? <CircularProgress size='1.5rem' color='info' /> : 'Use dataset';

  return (
    <Container id='dataset-selection-view' maxWidth='md'>
      <Grid container>
        <Grid item xs={12} className='input-container'>
          <input type='file' accept='text/csv' onChange={onFileChange} />
          <span className='file-error'>{fileErrorMsg}</span>
        </Grid>
        <Grid item xs={12} className='input-container'>
          <TextField
            label='Code'
            error={!!codeErrorMsg}
            helperText={codeErrorMsg}
            variant='standard'
            value={code}
            onChange={onCodeChange} />
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button color='secondary' disabled={fileIsLoading} onClick={onCancelClick}>Cancel</Button>
        </Grid>
        <Grid item xs={6} md={3} className='input-container'>
          <Button variant='contained' disabled={fileIsLoading} onClick={onConfirmClick}>{confirmBtnContent}</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DatasetSelectionView;
