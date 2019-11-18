// 定义一个中间件
export function loggerMiddleware(store) {
  return function newDispatch(dispatch) {
    return function logger(action) {
      console.log('from loggerMiddleware:', action, store.getState())
      // 正常传递 action
      dispatch(action)
    }
  }
}

// 箭头函数的形式定义中间件, 其实效果与上面是等效的, 不过下面这种这种
// 更加简洁, 比如 redux-thunk 都是这样的定义的
export const dateMiddleware = store => dispatch => action => {
  console.log('from dateMiddleware:', Date.now())
  dispatch(action)
}

