import { requestJSON } from 'helpers/request'
import { FETCH, FETCH__WITH_TOKEN } from 'constants/index'

export const request = store => next => action => {
  const { type, payload } = action
  switch(type) {
    case FETCH__WITH_TOKEN:
      const { token } = store.getState().auth
      requestJSON({ ...payload, token })
      break;
    case FETCH:
      requestJSON(payload)
      break;
    default:
      next(action)
  }
}

export default request
