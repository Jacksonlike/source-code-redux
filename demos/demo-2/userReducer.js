const initState = {
  name: 'Jack',
  phoneNumber: '18888888888'
}

export default (state, action) => {
  console.log('userReducer state: ', state, action)
  if (!state) {
    state = initState
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name || state.name,
      }
    case 'SET_PHONENUMBER':
      // 先进行验证 ...
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }
    default:
      return state
  }
}