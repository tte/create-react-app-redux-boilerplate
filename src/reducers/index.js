import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import test from './test'

export const rootReducer = combineReducers({
    router: routerReducer,
    test
  })

export default rootReducer
