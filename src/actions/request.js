import { FETCH, FETCH__WITH_TOKEN } from 'constants/index'

export function requestJSON(options) {
  return {
    type: FETCH,
    payload: options
  }
}

export function requestJSONWithToken(options) {
  return {
    type: FETCH__WITH_TOKEN,
    payload: options
  }
}

export default {
  requestJSON,
  requestJSONWithToken
}
