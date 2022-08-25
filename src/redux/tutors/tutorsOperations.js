import { getData } from '../../services/api';
import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
} from './tutorsActions';

const API_ENDPOINT = 'tutors';

const getTutors = () => async dispatch => {
  dispatch(getTutorsRequest());
  try {
    const tutors = await getData(API_ENDPOINT);
    dispatch(getTutorsSuccess(tutors));
  } catch (error) {
    dispatch(getTutorsError(error.message));
  }
};

export { getTutors };
