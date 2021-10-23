import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigationService } from 'services/NavigationService';
import { AppState } from 'store/model/AppState'
import { Views } from 'store/model/NavigationState';
import { simulationSetSettingsMutation } from 'store/mutations/simulation/SimulationSetSettingsMutation';

interface State {
  initialStartDate: Date;
  initialEndDate: Date;
  minStartDate: Date;
  maxEndDate: Date;
}

const selector = (state: AppState): State => {
  const { closePrices } = state.stockDatasets.stockDatasets[0];
  return {
    initialStartDate: state.simulationState.simulationSettings?.startDate as Date,
    initialEndDate: state.simulationState.simulationSettings?.endDate as Date,
    minStartDate: closePrices[0].date,
    maxEndDate: closePrices[closePrices.length - 1].date,
  };
};

const formatDate = (date: Date): string => new Intl.DateTimeFormat().format(date);

const parseDate = (format: string): Date | null => {
  const date = dayjs(format, 'DD/MM/YYYY').toDate();
  if (Number.isNaN(date.getTime())) {
    return null;
  } else {
    return date;
  }
};

export const useSimulationSettingsForm = () => {
  const dispatch = useDispatch();
  const navigationService = useNavigationService();
  const {
    initialStartDate,
    initialEndDate,
    minStartDate,
    maxEndDate,
  } = useSelector(selector);
  const [startDate, setStartDate] = useState<string>(formatDate(initialStartDate));
  const [endDate, setEndDate] = useState<string>(formatDate(initialEndDate));
  const [startDateErrMsg, setStartDateErrMsg] = useState<string | null>(null);
  const [endDateErrMsg, setEndDateErrMsg] = useState<string | null>(null);

  const onCancelClick = () => navigationService.navigateTo(Views.MainAnalysisView);

  const onConfirmClick = () => {
    const parsedStartDate = parseDate(startDate);
    const parsedEndDate = parseDate(endDate);
    let valid = true;

    if (!parsedStartDate) {
      setStartDateErrMsg('Enter a valid date');
      valid = false;
    } else if (parsedStartDate < minStartDate) {
      setStartDateErrMsg(`Start date may not be earlier than ${formatDate(minStartDate)}`);
      valid = false;
    }

    if (!parsedEndDate) {
      setEndDateErrMsg('Enter a valid date');
      valid = false;
    } else if (parsedEndDate > maxEndDate) {
      setEndDateErrMsg(`End date may not be any later than ${formatDate(maxEndDate)}`);
      valid = false;
    }

    if (valid && parsedStartDate && parsedEndDate && parsedEndDate < parsedStartDate) {
      setStartDateErrMsg('Start date must be before end date');
      setEndDateErrMsg('End date must be after start date');
      valid = false;
    }

    if (!valid) {
      return;
    }

    dispatch(simulationSetSettingsMutation({
      startDate: parsedStartDate as Date,
      endDate: parsedEndDate as Date,
    }));
    navigationService.navigateTo(Views.MainAnalysisView);
  };

  return {
    startDate,
    endDate,
    startDateErrMsg,
    endDateErrMsg,
    setStartDate: (value: string) => {
      setStartDate(value);
      setStartDateErrMsg(null);
    },
    setEndDate: (value: string) => {
      setEndDate(value);
      setEndDateErrMsg(null);
    },
    onCancelClick,
    onConfirmClick,
  };
};
