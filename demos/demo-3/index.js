import {
  createStore,
  combineReducers,
  bindActionCreators,
} from '../../redux'
import tradeReducer from './tradeReducer'
import userReducer from './userReducer'
import * as userActionCreators from './userActionCreators'
import * as tradeActionCreators from './tradeActionCreators'

const store = createStore(combineReducers({
  trade: tradeReducer,
  user: userReducer,
}))

// 注册回调
store.subscribe(() => {
  console.log('state subscribe: ', store.getState())
})

// bindActionCreators 实现很简单, 但是把 dispatch 的调用细节, 
// 以及 action 进行了很好的隔离封装
const actionCreators = bindActionCreators({
  ...userActionCreators,
  ...tradeActionCreators,
}, store.dispatch)


// 实际调用
// 完全不需要知道实现细节, 只需要知道 actionCreators 提供哪些方法即可
actionCreators.setName('LiKe')
actionCreators.setPhoneNumber('177 7777 7777')
actionCreators.increment()
