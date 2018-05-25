import React from 'react'
import constants from 'constants/index'

const options200 = {
  url: 'http://httpbin.org/status/200'
}

export default (props) => {
  const {
    value,
    requestJSON,
    requestJSONWithToken,
    clickHandler } = props
  requestJSON(options200)
  requestJSONWithToken(options200)
  return (
    <div>
      <div>here we are</div>
      <div>{value}</div>
      <div>
        <button onClick={e => clickHandler()}>Increment</button>
      </div>
    </div>
  )
}
