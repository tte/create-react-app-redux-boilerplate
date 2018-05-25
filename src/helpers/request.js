import urllib from 'url'
import fetch from 'isomorphic-fetch'


const defaultRequestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function request(url, method = 'GET', body, token = null) {
  const defaultParams = {
    method: method,
    headers: token
      ? { ...defaultRequestHeaders, 'Authorization': token }
      : defaultRequestHeaders
  }
  const params = body !== undefined
    ? { ...defaultParams, body: JSON.stringify(body) }
    : defaultParams

  return fetch(url, params)
}

export function requestJSON(payload) {
  const { url, method, token, body, onSuccess, onFail } = payload
  return new Promise((resolve, reject) => {
    return request(url, method, body, token)
      .then(res => {
        if(res.ok !== true) {
           const payload = { res }
           throw payload
        }

        return res
      })
      .then(res => res.json()
        .then(json => ({ json, res }))
        .catch(e => ({ json: {}, res })))
      .then(o => typeof onSuccess === "function" ? onSuccess(o) : o)
      .catch(e => {
        console.log(e)
        console.log("Request payload:", payload)
        if(typeof onFail === "function") {
          onFail(e)
        } else {
          alert("Unexpected error during request: " + e)
        }
        reject()
      })
      .then(resolve)
  })
}

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
  request,
  requestJSON,
  formatUrl
}
