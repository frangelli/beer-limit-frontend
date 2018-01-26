export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (expense) => {
  return {
    type: SAVE_EXPENSE,
    payload: expense
  }
}
