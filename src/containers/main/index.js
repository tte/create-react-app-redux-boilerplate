import { connect } from 'react-redux'
import View from './View'
import testActions from 'actions/test'
import requestActions from 'actions/request'

const mapStateToProps = (state) => {
  const { test } = state
  return { ...test }
}

const actions = { ...testActions, ...requestActions }

export default connect(mapStateToProps, actions)(View)
