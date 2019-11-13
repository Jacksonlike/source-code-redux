/**
 * redux 基础使用
 * 只需要引入 createStore 即可实现发布-订阅模式
 */

import { createStore } from '../redux'

const initState = {
  count: 1,
  name: 'Jack',
}

const reducer = (state, action) => {
  if (!state) {
    state = initState
  }
  switch (action.type) {
    case 'COUNT_INCREASE': 
      return {
        ...state,
        count: state.count + 1,
      }
    case 'COUNT_DECREASE':
      return {
        ...state,
        count: (state.count - 1) < 0 ? 0 : (state.count - 1),
      }
    case 'SET_NAME':
      return {
        ...state,
        name: action.name || state.name,
      }
    default: 
      return state
  }
}

// 也可以在 createStore 时将初始状态传入 store.
const store = createStore(reducer)

// 注册回调
store.subscribe(() => {
  console.log("---state change---")
  console.log(store.getState())
})

store.dispatch({ type: 'COUNT_INCREASE' })
store.dispatch({ type: 'COUNT_DECREASE' })
store.dispatch({ 
  type: 'SET_NAME',
  name: 'LiKe'
})
