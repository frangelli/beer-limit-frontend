import moment from 'moment';

import {
  SAVE_EXPENSE,
  SET_START_DATE,
  SET_END_DATE,
  LOAD_EXPENSES,
  LOAD_CATEGORIES,
  LOAD_BUDGETS,
  SAVE_BUDGET,
  SAVE_CATEGORY
} from '../actions';

const initialState = {
  expenses: [],
  categories: [],
  budgets: [],
  startDate: moment().startOf('month').toDate(),
  endDate: moment().endOf('month').toDate()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EXPENSE:
      return {
        ...state
      };
    case SAVE_BUDGET:
      return {
        ...state
      };
    case SAVE_CATEGORY:
      return {
        ...state
      };
    case LOAD_EXPENSES:
      return {
        ...state,
        ...{expenses: action.payload.data}
      };
    case LOAD_CATEGORIES:
      return {
        ...state,
        ...{categories: action.payload.data}
      };
    case LOAD_BUDGETS:
      return {
        ...state,
        ...{budgets: action.payload.data}
      };
    case SET_START_DATE:
      return {
        ...state,
        ...{startDate: action.payload}
      };
    case SET_END_DATE:
      return {
        ...state,
        ...{endDate: action.payload}
      };
    default:
      return state;
  }
};
