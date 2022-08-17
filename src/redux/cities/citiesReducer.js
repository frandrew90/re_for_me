import { combineReducers } from 'redux';

// State:
// {
//     tutors: [],
//     cities: {
//         items: [],
//         filter:'',
//         },
//     departments:[]
// }
// CitiesState:
// {
//     cities: {
//         items: [],
//         filter:'',
//         },
// }

// action = {type: 'action/type', payload:'data'}

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'cities/items_set':
      return action.payload;

    case 'cities/items_add':
      return [...state, action.payload];

    case 'cities/items_edit':
      return state.map(city =>
        city.id === action.payload.id ? action.payload : city,
      );

    case 'cities/items_delete':
      return state.filter(city => city.id !== action.payload.id);

    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'cities/filter_change':
      return action.payload;

    default:
      return state;
  }
};

const citiesReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default citiesReducer;
