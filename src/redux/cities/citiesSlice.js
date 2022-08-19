import { createSlice, combineReducers } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setCities: (_, { payload }) => payload,

    addCity: (state, { payload }) => [...state, payload],

    editCity: (state, { payload }) =>
      state.map(city => (city.id === payload.id ? payload : city)),

    deleteCity: (state, { payload }) =>
      state.filter(city => city.id !== payload),
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter: (_, { payload }) => payload,
  },
});

export const { setCities, addCity, editCity, deleteCity } = itemsSlice.actions;
export const { changeFilter } = filterSlice.actions;

const citiesReducer = combineReducers({
  [itemsSlice.name]: itemsSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
});

export default citiesReducer;
