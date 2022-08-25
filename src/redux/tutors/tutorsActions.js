import { createAction } from '@reduxjs/toolkit';

const setTutors = createAction('tutors/set');
const addTutor = createAction('tutors/tutor_add');

const getTutorsRequest = createAction('tutors/getTutorsRequest');
const getTutorsSuccess = createAction('tutors/getTutorsSuccess');
const getTutorsError = createAction('tutors/getTutorsError');

export {
  setTutors,
  addTutor,
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
};
