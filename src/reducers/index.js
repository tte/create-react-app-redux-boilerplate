import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import test from './test'
import auth from './auth'

export const rootReducer = combineReducers({
    router: routerReducer,
    test,
    auth
  })

export default rootReducer
