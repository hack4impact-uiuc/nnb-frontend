const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS'

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginSuccess(true))
  }
}

export function logout() {
  return dispatch => {
    dispatch(setLoginSuccess(false))
  }
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  }
}

export default function reducer(
  state = {
    isLoginSuccess: false,
    loginError: null
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      })

    default:
      return state
  }
}
