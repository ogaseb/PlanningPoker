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

class JoinDialog extends Component {
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

  handleChangUserName = e => {
    this.userName = e.target.value
  };

  handleChangRoomPassword = e => {
    this.roomPassword = e.target.value
  };
  joinRoom = () => {
    const {match: {params}, store: {roomStore: {joinRoom}, socketStore: {openNotification}, userStore: {setUserName}}} = this.props
    if (this.userName && this.roomPassword) {
      setUserName(this.userName)
      joinRoom(this.userName, params.id, this.roomPassword)
    } else {
      openNotification("To join a room you need to fill all inputs", "warning")
    }
  }

  cancelJoinRoom = () => {
    this.props.history.push(routes.root())
  }

  render() {
    const {store: {userStore: {isConnected}}} = this.props
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
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
            value={this.userName}
            onChange={this.handleChangUserName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="roomPassword"
            label="Room Password"
            type="password"
            fullWidth
            value={this.roomPassword}
            onChange={this.handleChangRoomPassword}
          />
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

decorate(JoinDialog, {
  userName: observable,
  roomPassword: observable
});

export {JoinDialog}
export default inject("store")(withRouter(observer(JoinDialog)));

