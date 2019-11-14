export const createReducer = (actionHandlers, initialState) => (
  state = initialState,
  action
) => {
  const actionHandler = actionHandlers[action.type];

  if (!actionHandler) return state;

  return actionHandler(state, action);
};
