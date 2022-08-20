import { createReducer } from '@reduxjs/toolkit';
import { setTutors, addTutor } from './tutorsActions';

// ==========================================
// console.dir(setTutors.type); === 'tutors/set'
// console.dir(setTutors.toString()); === 'tutors/set'
// [setTutors] === setTutors.toString(); === 'tutors/set'
// ==========================================

// Простой способ(Usage with the "Map Object" Notation):
// const tutorsReducer = createReducer([], {
//   [setTutors]: (_, action) => action.payload,
//   [addTutor]: (state, action) => [...state, action.payload],
// });

//============================================

// С помощью билдера - рекомендуемый (Usage with the "Builder Callback" Notation)
//(лучше работает с TS):

const tutorsReducer = createReducer([], builder => {
  builder
    .addCase(setTutors, (_, action) => action.payload)
    .addCase(addTutor, (state, action) => [...state, action.payload]);
});

export default tutorsReducer;
