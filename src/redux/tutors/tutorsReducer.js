import { createReducer, combineReducers } from '@reduxjs/toolkit';

import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
} from './tutorsActions';

const itemsReducer = createReducer([], builder => {
  builder.addCase(getTutorsSuccess, (_, action) => action.payload);
});

const loadingReducer = createReducer(false, builder => {
  builder
    .addCase(getTutorsRequest, () => true)
    .addCase(getTutorsSuccess, () => false)
    .addCase(getTutorsError, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(getTutorsRequest, () => null)
    .addCase(getTutorsError, (_, { payload }) => payload);
});

const tutorsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default tutorsReducer;
