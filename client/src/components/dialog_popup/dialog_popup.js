import React, {Component} from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {decorate, observable} from "mobx";
import routes from "routes"

class DialogPopup extends Component {
  constructor(props) {
    super(props)
    this.userName = ""
    this.roomPassword = ""
  }

  componentDidMount() {
    // if (localStorage.getItem("userName") !== null) {
    //   this.userName = JSON.parse(localStorage.getItem("userName"))
    // }
  }

  render() {
    const {store: {userStore: {isConnected, loggedIn}}, component} = this.props
    return (
      <Dialog
        open={!isConnected}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please write your username below if you want to join to the room.
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelJoinRoom} color="primary">
            Cancel Join
          </Button>
          <Button onClick={this.joinRoom} color="primary" variant="contained">
            Join Room
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

decorate(DialogPopup, {
  userName: observable,
  roomPassword: observable
});

export {DialogPopup}
export default inject("store")(withRouter(observer(DialogPopup)));

