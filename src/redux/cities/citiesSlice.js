import { createSlice } from '@reduxjs/toolkit';
import { getCities, addCity, editCity, deleteCity } from './citiesOperations';

const initialState = {
  data: {
    items: [],
    loading: false,
    error: null,
  },

  filter: '',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    // changeFilter: (state, { payload }) => ({ ...state, filter: payload }),
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    //GET
    builder.addCase(getCities.pending, state => {
      state.data.loading = true;
      state.data.error = null;
    });
    builder.addCase(getCities.fulfilled, (state, { payload }) => {
      state.data.loading = false;
      state.data.items = payload;
    });
    builder.addCase(getCities.rejected, (state, { payload }) => {
      state.data.loading = false;
      state.data.error = payload;
    });

    //ADD
    builder.addCase(addCity.pending, state => {
      state.data.loading = true;
      state.data.error = null;
    });
    builder.addCase(addCity.fulfilled, (state, { payload }) => {
      state.data.loading = false;
      state.data.items.push(payload);
      // state.data.items = [...state.data.items, payload];
    });
    builder.addCase(addCity.rejected, (state, { payload }) => {
      state.data.loading = false;
      state.data.error = payload;
    });

    //EDIT
    builder.addCase(editCity.pending, state => {
      state.data.loading = true;
      state.data.error = null;
    });
    builder.addCase(editCity.fulfilled, (state, { payload }) => {
      state.data.loading = false;
      const idx = state.data.items.findIndex(city => city.id === payload.id);
      state.data.items[idx] = payload;
    });
    builder.addCase(editCity.rejected, (state, { payload }) => {
      state.data.loading = false;
      state.data.error = payload;
    });

    //DELETE
    builder.addCase(deleteCity.pending, state => {
      state.data.loading = true;
      state.data.error = null;
    });
    builder.addCase(deleteCity.fulfilled, (state, { payload }) => {
      state.data.loading = false;
      const idx = state.data.items.findIndex(city => city.id === payload.id);
      state.data.items.splice(idx, 1);
    });
    builder.addCase(deleteCity.rejected, (state, { payload }) => {
      state.data.loading = false;
      state.data.error = payload;
    });
  },
});

export const { changeFilter } = citiesSlice.actions;

export default citiesSlice.reducer;
