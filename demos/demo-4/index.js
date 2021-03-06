import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
} from '../../redux'
import tradeReducer from './tradeReducer'
import userReducer from './userReducer'
import * as userActionCreators from './userActionCreators'
import * as tradeActionCreators from './tradeActionCreators'
import { 
  loggerMiddleware, 
  dateMiddleware,
  functionMiddleware,
  promiseMiddleware,
} from './middlewares'

// 通过 applyMiddleware 给 store 中的 dispatch 装载中间件

const store = createStore(combineReducers({
  trade: tradeReducer,
  user: userReducer,
}), applyMiddleware(
  functionMiddleware, 
  promiseMiddleware,
  loggerMiddleware,
  dateMiddleware,
))
// 下面这种方式和上面是等效的, 更多中间件的用法可以研究 redux-thunk
// const newCreateStore = applyMiddleware(loggerMiddleware, dateMiddleware)(createStore)
// const store = newCreateStore(combineReducers({
//   trade: tradeReducer,
//   user: userReducer,
// }))

// 注册回调
store.subscribe(() => {
  console.log("subscribe ...")
})

const actionCreators = bindActionCreators({
  ...userActionCreators,
  ...tradeActionCreators,
}, store.dispatch)

// 实际调用
actionCreators.setPhoneNumber('177 7777 7777')
actionCreators.increment()

actionCreators.setName('LiKe')
actionCreators.asyncSetName('Mike')
actionCreators.setNameWithTimeout('Jack', 'Rose')
