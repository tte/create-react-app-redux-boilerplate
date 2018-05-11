import { connect } from 'react-redux'
import View from './View'
import actions from 'actions/test'

const mapStateToProps = (state) => {
  const { test } = state
  return { ...test }
}

export default connect(mapStateToProps, actions)(View)
