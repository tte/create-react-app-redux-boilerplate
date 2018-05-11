import constants from 'constants/index'


export function clickHandler() {
  return {
    type: constants.TEST__CLICK
  }
}

export default {
  clickHandler
}
