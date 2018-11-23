import React, { Component } from "react";
import {inject, observer, Provider} from "mobx-react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "./components/static/header";
import Router from "./components/router/router";
import Notification from "./components/notification/notification"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notification />
        <Header />
          <Grid container>
           <Router />
          </Grid>
      </div>
    );
  }
}
export {App};
export default inject("store")(withRouter(observer(App)));

