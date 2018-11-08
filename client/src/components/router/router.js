import React from "react"
import { Route, withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"
import CreateRoom from '../../components/create_room/create_room'
import JoinRoom from '../../components/join_room/join_room'
import Room from '../../components/room/room'
import routes from '../../routes'

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path={routes.root()}
          component={CreateRoom}
        />
        <Route
          exact
          path={routes.root()}
          component={JoinRoom}
        />
        <Route
          exact
          path={routes.room(":id", ":password")}
          component={Room}
        />
      </React.Fragment>
    )
  }
}

export default inject("store")(withRouter(observer(Router)))
