import {
  SAVE_EXPENSE
} from '../actions';

const initialState = {
  expenses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EXPENSE:
      return {
        ...state,
        ...{expenses: [...state.expenses, action.payload]}
      };
    default:
      return state;
  }
};
