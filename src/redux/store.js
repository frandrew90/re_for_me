import { configureStore } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';
import { customMiddlewareLogger } from './middleware/logger';
// import { myMiddleware } from './middleware/logger';
// import citiesReducer from './cities/citiesReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import citiesReducer from './cities/citiesSlice';
import tutorsReducer from './tutors/tutorsReducer';

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

// const logger = createLogger({
//   collapsed: (getState, action, logEntry) => !logEntry.error,
//   timestamp: false,
// });

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    // cities: citiesReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: () => [],
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(logger)
      // .concat(myMiddleware)
      .concat(customMiddlewareLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
