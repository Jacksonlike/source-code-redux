// 核心代码, 使用 dispath 对 actionCreator 进行包装
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

/**
 * 把 value 值为 actionCreator(了解什么是 actionCreator 可以查看 demo-3)
 * 的对象的 value 值用 dispatch 进行包装, 使得它们可以直接被调用. 这只是为
 * 了方便调用而已, 所以平时开发用的比较少, 一般用在 react-redux 中 connect
 * 方法的实现. 
 * 
 * @param actionCreators value 值都是 actionCreator 方法的对象
 * 
 * @param dispatch Redux store 中的 dispatch 方法
 * 
 * @returns 把 actionCreators 中的所有 value 值都用 dispatch 进行包装.
 * 同时也可以传入一个 action creator 作为第一个参数, 这时会返回一个用
 * dispatch 包装过的方法.
 * 
 */
export default function bindActionCreators(actionCreators, dispatch) {
  // 支持第一个参数传入的是 一个 action creator 方法
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
