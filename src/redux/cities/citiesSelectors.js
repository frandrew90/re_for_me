const getCities = state => state.cities.data.items;

const getFilter = state => state.cities.filter;

const getLoading = state => state.cities.data.loading;

const getError = state => state.cities.data.error;

export { getCities, getFilter, getLoading, getError };
