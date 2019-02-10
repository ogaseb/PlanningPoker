import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Header from './components/static/header'
import Router from './components/router/router'
import Notification from './components/notification/notification'

class App extends Component {
  constructor (props) {
    super(props)
    this.props.store.socketStore.initialize()
    this.props.store.userStore.initialize()
    this.props.store.roomStore.initialize()
    this.props.store.jiraStore.initialize()
  }

  render () {
    return (
      <div className='App'>
        <Notification />
        <Header />
        <Grid container>
          <Router />
        </Grid>
      </div>
    )
  }
}
export { App }
export default inject('store')(withRouter(observer(App)))
