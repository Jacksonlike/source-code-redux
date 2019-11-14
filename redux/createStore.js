/**
 * 创建一个 Redux store，有以下特点：
 * 1. 全局唯一的状态树
 * 2. store 中的数据只能通过调用 dispatch() 进行改变
 * 3. 通常会把 state tree 和 reducer 按组件纬度进行拆分, 使用
 * combineReducers 可以把所有的 reducer 合并到一个 reducer 方法
 * 
 * @param reducer 接收两个参数, 当前的状态树和要执行的动作(action),
 * 并返回执行完 action 后的状态树. reducer 实际上表示的是更改 state 的
 * 计划, 在创建 store 时进行传入, 保证了程序运行时状态通过计划内的方法进
 * 行更改.
 * 
 * @param preloadedState 初始化的状态. 
 * 
 * @param enhancer store 的功能拓展(实际上就是一堆中间件的集合). 可使用 
 * applyMiddleware 创建中间件来拓展 redux 的功能
 * 
 * @return 返回一个 Redux store 对象, 可以用来获取状态, 调度 action,
 * 订阅监听状态的变化
 * 
 */
export default function createStore(
  reducer, 
  preloadedState,
  enhancer
) {
  // createStore 方法允许我们省略 preloadedState 的方式进行调用
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  // 加工 dispatch, 使得用户定义的中间件能够在 dispatch 时被执行
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  /**
   * 浅拷贝. 保证了在 dispatch 的过程中, 能正常使用 nextListeners 来
   * 添加/取消订阅. 往下看 dispatch 源码中有说明.
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * 获取当前状态树
   */
  function getState() {
    if (isDispatching) {
      throw new Error()
    }

    return currentState
  }

  /**
   * 注册一个监听事件. 每次 dispatch 一个 action 的时候都
   * 会被调用, 这时状态树可能已经发生变化了，在回调中可以使用
   * getState 方法读取当前的状态树.
   * 
   * @param listener 每一次的 dispatch 都会执行的回调函数
   * @returns 返回的是取消订阅的方法
   */
  function subscribe(listener) {
    if (isDispatching) {
      throw new Error()
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error()
      }

      // isSubscribed 保证了每个监听者最多被取消订阅一次
      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      // TODO
      currentListeners = null
    }
  }

  /**
   * 调度一个 action. 这是改变状态的唯一方法
   * 
   * createStore 时传入的 reducer 方法会在这时被调用, reducer
   * 接收的参数是当前的状态树和传入的 action, 返回值会被当作下一个
   * 状态树. 同时所有的 listener 都会被通知到.
   * 
   * 只支持纯对象的 action. 如果需要 dispatch 一个 Promise, Observable
   * 等其他一些东西, 则需要自行添加中间件进行支持.
   * TODO 在 demo 中进行了演示.
   * 
   * @param action 用一个纯对象来代表“状态的改变是什么”, 每一个 action 
   * 都必须要有一个 type 属性, 最好是字符串类型的. 
   * @returns 为了方便, 会把相同的 action 进行返回.
   * 
   */
  function dispatch(action) {
    if (isDispatching) {
      throw new Error()
    }

    try {
      // 根据传入的 action 指令, 执行预设的修改 state 的计划
      // isDispatching 表示当前正在执行计划, 修改状态树
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    /**
     * nextListeners 保证的是接下来的步骤, 不会由于用户新增订阅或者
     * 取消订阅而产生 bug.
     */ 
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }

    return action
  }

  /**
   * 替换当前的 reducer
   */
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer

    // 跟接下来调用 dispatch 是相同的作用
    dispatch({ type: Symbol() })
    return store
  }

  // 发起一个初始化的 action, 触达 reducer 执行默认的 action,
  // 不进行任何操作, 仅仅是返回初始化的状态. 以此来初始化状态树.
  dispatch({ type: Symbol() })

  const store = ({
    dispatch,
    subscribe,
    getState,
    replaceReducer
  })
  return store
}
