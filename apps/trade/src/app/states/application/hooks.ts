import { useSelector } from 'react-redux';
import { AppState } from '../index';
import { ApplicationStatus } from './types';

export const useApplicationStatus = (): ApplicationStatus => {
  return useSelector((state: AppState) => state.application.applicationStatus);
};
