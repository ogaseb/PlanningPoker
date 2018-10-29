import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./app.css";
import { Grid } from "@material-ui/core";
import Header from "./components/static/header";
import CreateRoom from "./components/create_room/create_room";
import JoinRoom from "./components/join_room/join_room";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.store.createRoom("ProPanek", "Inzy meeting", "testpassword");
    this.props.store.fetchRooms();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ textAlign: "center" }}>
          <Grid container>
            <CreateRoom />
            <JoinRoom />
          </Grid>
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(App));

// export default App;
