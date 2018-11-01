import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {decorate, observable} from "mobx";


class JoinDialog extends Component {
  handleChange = (e) => {
    this.input = e.target.value
  }
  joinRoom = (name) => {
    const {match: {params}} = this.props
    this.props.store.joinRoom(params.id, params.password, name)
    this.props.store.openJoinDialog = false
    this.props.store.connected = true
  }

  cancelJoinRoom = () => {
    this.props.history.push(`/`)
  }

  render() {

    return (
      <Dialog
        open={this.props.store.openJoinDialog}
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
            id="name"
            label="User Name"
            type="text"
            fullWidth
            value={this.input}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelJoinRoom} color="primary">
            Cancel Join
          </Button>
          <Button onClick={() => {
            this.joinRoom(this.input)
          }} color="primary" variant="contained">
            Join Room
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

decorate(JoinDialog, {
  input: observable
});
export default inject("store")(withRouter(observer(JoinDialog)));

// export default JoinDialog