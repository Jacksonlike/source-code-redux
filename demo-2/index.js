import {
  createStore,
  combineReducers,
} from '../redux'
import tradeReducer from "./tradeReducer"
import userReducer from "./userReducer"

// 通过 combineReducers 函数可以将原本按模块进行拆分后的子 state 和子 reducer
// 合并到一个 reducer 中传递给 createStore
const store = createStore(combineReducers({
  trade: tradeReducer,
  user: userReducer,
}))

// 注册回调
store.subscribe(() => {
  console.log("state subscribe: ", store.getState())
})

store.dispatch({ type: 'COUNT_INCREASE' })
store.dispatch({ type: 'COUNT_DECREASE' })
store.dispatch({
  type: 'SET_NAME',
  name: 'LiKe'
})
store.dispatch({
  type: 'SET_PHONENUMBER',
  phoneNumber: '188 8888 8888'
})
