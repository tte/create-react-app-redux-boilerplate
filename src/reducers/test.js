import constants from '../constants'

const initState = {
  value: 0
}

const ACTION_HANDLERS = {
  [constants.TEST__CLICK]: (state) => {
    const { value } = state
    return {
      ...state,
      value: value + 1
    }
  }
}

export default function(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  const nextState = handler ? handler(state, action) : state
  return nextState
}
