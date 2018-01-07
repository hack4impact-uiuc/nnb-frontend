import React from 'react'
import { connect } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'

import { routeType } from 'selectors'
import { ROUTE_HOME, ROUTE_ABOUT, ROUTE_LOGIN } from 'types'
import { About } from '../view/About'
import { Home } from '../view/Home'
import { Login } from '../'

const routesMap = {
  [ROUTE_HOME]: Home,
  [ROUTE_ABOUT]: About,
  [ROUTE_LOGIN]: Login,
  [NOT_FOUND]: Home
}

const mapStateToProps = state => ({
  route: routeType(state)
})

const Container = ({ route }) => {
  const Route = routesMap[route] ? routesMap[route] : routesMap[NOT_FOUND]
  return <Route />
}

export const Routes = connect(mapStateToProps)(Container)
