const initState = {
  count: 1,
}

export default (state, action) => {
  console.log('tradeReducer state: ', state, action)
  if (!state) {
    state = initState
  }
  switch (action.type) {
    case 'COUNT_INCREASE':
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}