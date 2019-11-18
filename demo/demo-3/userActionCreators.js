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
