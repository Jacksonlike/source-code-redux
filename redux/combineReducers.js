
/**
 * combineReducers 的作用就是将多个 reducer 合并成一个 reducer 方法.
 * 它会调用每一个子 reducer, 然后根据返回生成一颗状态树, 其中的 key 值
 * 与传入的参数 reducers 的 key 值一一对应
 * 
 * @param reducers 一个 value 值都是 reducer 的对象, 通过 combine 方法
 * 可以把多个 reducer 合并到成一个. reducer 在任何情况都不应该返回
 * undefined , 因此当 reducer 接收的 state 参数是 undefined 时, reducer
 * 应该返回 initialState, 而当 reducer 接收的 action 参数无效时, reducer
 * 应该不进行任何操作直接返回当前状态.(这两点很重要, 在源码中有进行验证, 不过
 * 验证的代码不影响功能, 故这里研究 redux 原理时去掉了. 具体作用可以仔细看下
 * 接下来的代码实现过程, 也可以琢磨下 createStore 方法中最后调用 dispatch 
 * 方法获取 initialState 的部分.)
 * 
 * @return 返回合并后的 reducer 方法.
 * 
 */
export default function combineReducers(reducers) {
  // 省略一些不影响功能的代码
  const reducers = reducers
  const reducerKeys = Object.keys(reducers)

  return function combination(state, action) {
    // TODO hasChange 这个变量是不是可以不要呢？
    let hasChanged = false
    const nextState = {}
    
    // 这里就体现了前面说的当 reducer 接收的 action 参数无效时, reducer
    // 应该不进行任何操作直接返回当前状态. 因为不管是什么 action, reducers 
    // 中每一个 reducer 都会被调用到, 而最终 combination 函数返回的 state 
    // 是所有 reducer 函数的返回的子 state 的集合.
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducerKeys[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)

      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey      
    }
    hasChanged = 
      hasChanged || reducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}