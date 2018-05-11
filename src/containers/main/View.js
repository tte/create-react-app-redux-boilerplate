import React from 'react'

export default (props) => {
  const { value, clickHandler } = props
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
