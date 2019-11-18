import compose from './compose'

/**
 * 创建一个 dispatch 方法的中间件, 这对于各种任务都非常简单, 比如简洁的方式实现异步操作,
 * 或者打印每一次的 aciton.
 * redux-thunk 的实现就是一个例子.
 * 
 * 注意每一个中间件都会被提供 dispatch 和 getState 方法作为命名参数.
 * 
 * @param middlewares 所有的中间件
 * @returns 新的 createStore 方法(返回的 store 中的 dispatch 方法被重写).
 *
 */
export default function applyMiddleware(
  ...middlewares
) {
  // 源码使用的箭头函数, 为了便于理解进行了转换
  return function rewriteCreateStore(oldCreateStore) {
    return function newCreateStore(reducer, ...args) {
      const store = oldCreateStore(reducer, ...args)
      let dispatch = () => {
        throw new Error()
      }

      // 保证中间件方法能且仅能调用 store 中的 getState 方法和 dispatch 方法.
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 将每个元素都是 function 的数组 chain 转化为链式调用
      dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}
