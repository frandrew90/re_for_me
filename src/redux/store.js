import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  timestamp: false,
});

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: citiesReducer,
    departments: () => [],
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
