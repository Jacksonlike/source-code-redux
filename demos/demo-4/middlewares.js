import isPromise from 'is-promise'

// 定义一个中间件, 这里的 store 中有只有 dispatch 和 getState 两个属性
export function loggerMiddleware(store) {
  return function newDispatch(dispatch) {
    return function logger(action) {
      console.log('from loggerMiddleware:', action, store.getState())
      // 正常传递 action
      dispatch(action)
    }
  }
}

/**
 * 箭头函数的形式定义中间件, 其实效果与上面是等效的, 不过下面这种这种
 * 更加简洁, 比如 redux - thunk 都是这样的定义的
 */
export const dateMiddleware = _ => next => action => {
  console.log('from dateMiddleware:', Date.now())
  next(action)
}

/**
 * 使用这个中间件, 使得 redux 支持 Function 类型的 action
 * 参考 redux - thunk 源码
 */
export const functionMiddleware = ({ dispatch }) => next => action => {
  console.log('from functionMiddleware: ', typeof action)
  if (typeof action === 'function') {
    return action(dispatch)
  }

  return next(action)
}

/**
 * 使用这个中间件, 使得 redux 支持 Promise 类型的 action.
 * 参考 redux - promise 源码, redux-promise 还支持 action.payload
 * 为 Promise
 */
export const promiseMiddleware = ({ dispatch }) => next => action => {
  console.log('from promiseMiddleware: ', isPromise(action))
  if (isPromise(action)) {
    return action.then(dispatch)
  }

  return next(action)
}
