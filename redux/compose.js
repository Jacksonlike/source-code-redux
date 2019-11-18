/**
 * 对单参数函数进行从右到左的组合, 最右的函数可以是多参数的.
 *
 * @param funcs 需要进行组合的函数
 * @returns 返回组合后的函数. 比如, `compose(f, g, h)` 转换后 `(...args) => f(g(h(...args)))`.
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
