import * as actionTypes from './actionTypes'

function receiveStuff(json) {
  return { type: actionTypes.RECEIVE_STUFF, payload: json.stuff }
}

export function fetchStuff() {
  return dispatch => {
    return mockFetch().then(json => dispatch(receiveStuff(json)))
  }
}

function mockFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ stuff: ['thing1', 'thing2', 'thing3'] })
    }, Math.random() * 50)
  })
}
