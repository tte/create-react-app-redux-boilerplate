import urllib from 'url'
import fetch from 'isomorphic-fetch'

export function requestJSON(payload) {
  const { url, method, token, body, onSuccess, onFail } = payload
  const errorHandler = (err) => {
    if(typeof onFail === "function") {
      onFail(err)
    }

    console.error("Error during request: " + err)
  }

  return new Promise((resolve, reject) => {
    let r = fetch(url, createReqParams(payload))
      .then(validateIfResOk)
      .then(safeExtractResJSON)

    if(typeof onSuccess === "function") {
      r = r.then(onSuccess)
    }

    return r.catch(e => {
        errorHandler(e)
        reject()
      })
      .then(resolve)
  })
}

const jsonRequestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function createReqParams(options) {
  const { method, token, body } = options
  let params = {
    method: method || 'GET',
    headers: jsonRequestHeaders,
  }

  if(body) {
    params.body = JSON.stringify(body)
  }

  if(token) {
    params.headers['Authorization'] = token
  }

  return params
}

function validateIfResOk(res) {
  if(res.ok !== true) {
    const payload = { res }
    throw payload
  }

  return res
}

function safeExtractResJSON(res) {
  return res.json()
    .then(json => ({ json, res }))
    .catch(e => ({ json: {}, res }))
}

// TODO: validate
export function formatUrl(payload) {
  const { url } = payload
  const requestUrl = urllib.parse(url, true)
  requestUrl.search = null
  const f = function(key, value) {
    switch(key) {
      case 'filters':
        Object.keys(value).map(k => f(`filters[${k}]`, value[k]))
        break
      case 'url':
        break
      default:
        Array.isArray(value)
        ? requestUrl.query[`${key}[]`] = value
        : requestUrl.query[key] = value
    }
  }
  Object.keys(payload).map(k => f(k, payload[k]))

  return requestUrl.format()
}

export default {
  requestJSON,
  formatUrl
}
