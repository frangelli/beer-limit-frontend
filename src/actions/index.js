import moment from 'moment';
import axios from 'axios';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_BUDGET = 'SAVE_BUDGET';
export const LOAD_EXPENSES = 'LOAD_EXPENSES';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_BUDGETS = 'LOAD_BUDGETS';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';

const SERVER_API_ROOT = 'https://beerlimit.herokuapp.com/api';

export const loadCategories = () => {
  let req = axios.get(`${SERVER_API_ROOT}/categories`);
  return {
    type: LOAD_CATEGORIES,
    payload: req
  }
}

export const loadBudgets = () => {
  let req = axios.get(`${SERVER_API_ROOT}/budgets`);
  return {
    type: LOAD_BUDGETS,
    payload: req
  }
}

export const saveExpense = (expense) => {
  let req = axios.post(`${SERVER_API_ROOT}/expenses`, expense);
  return {
    type: SAVE_EXPENSE,
    payload: req
  }
}

export const saveBudget = (budget) => {
  let req = axios.post(`${SERVER_API_ROOT}/budgets`, budget);
  return {
    type: SAVE_BUDGET,
    payload: req
  }
}

export const loadExpenses = (startDate, endDate) => {
  startDate = moment(startDate).format();
  endDate = moment(endDate).format();
  let req = axios.get(`${SERVER_API_ROOT}/expenses?startDate=${startDate}&endDate=${endDate}`);
  return {
    type: LOAD_EXPENSES,
    payload: req
  }
}

export const setStartDate = (date) => {
  return {
    type: SET_START_DATE,
    payload: date
  }
}

export const setEndDate = (date) => {
  return {
    type: SET_END_DATE,
    payload: date
  }
}
