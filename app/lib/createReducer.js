/*
 * Will dynamically create reducers
 * enforcing a unique way to describe reducers
 */
export default function createReducer(initialState, handlers) {
  return (state = initialState, action = handlers) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
