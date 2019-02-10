import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import MainPage from 'components/main_page/main_page'
import Rooms from 'components/rooms/rooms'
import CreateRoom from 'components/create_room/create_room'
import JoinRoom from 'components/join_room/join_room'
import Room from 'components/room/room'
import ConnectJira from 'components/connect_jira/connect_jira'
import Error from 'components/error/error'

import routes from 'routes'

class Router extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path={routes.root()} component={MainPage} />
        <Route exact path={routes.rooms()} component={Rooms} />
        <Route exact path={routes.create()} component={CreateRoom} />
        <Route exact path={routes.join()} component={JoinRoom} />
        <Route exact path={routes.jira()} component={ConnectJira} />
        <Route exact path={routes.error()} component={Error} />
        <Route path={routes.room(':roomName', ':id')} component={Room} />
        <Route component={Error} />
      </Switch>
    )
  }
}

export default inject('store')(withRouter(observer(Router)))
