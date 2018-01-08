import { delay } from 'redux-saga'

import { login, logout } from '../../actions'

import { put, all, fork } from 'redux-saga/effects'

// Here we would do checks for existing data and load whatever we need for this view. Also manage
// generic tasks such as showing/hiding loaders based on UI needs.
export function* userLogin() {
  yield put(login())
}

export function* userLogout() {
  yield put(logout())
}

export default function* root() {
  yield all([fork(userLogin), fork(userLogout)])
}
