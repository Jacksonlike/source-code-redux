export function setName(name) {
  return {
    type: 'SET_NAME',
    name: name,
  }
}

export function setPhoneNumber(newPhoneNumber) {
  return {
    type: 'SET_PHONENUMBER',
    phoneNumber: newPhoneNumber,
  }
}

// 返回的 action 为 Function
export function setNameWithTimeout(name1, name2) {
  return dispatch => {
    dispatch(setName(name1))

    // 3s 后自动设置名字为 name2
    setTimeout(() => {
      console.log('After 3s...')
      dispatch(setName(name2))
    }, 3*1000)
  }
}

const sleep = time =>
  new Promise(resolve => setTimeout(() => resolve(), time))

// 返回的 action 为 Promise
export async function asyncSetName(name) {
  // 模拟网络请求的延迟才获取到 name 的值
  await sleep(5000)

  return dispatch => {
    dispatch(setName(name))
  }
}
