import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import {decorate, observable, reaction} from 'mobx'
import routes from 'routes'
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";

const StyledCircularProgress = styled(CircularProgress)`
  && {
    position: relative;
    left: calc(50% - 25px);
  }
`

class EstablishingConnection extends Component {
  constructor(props) {
    super(props)


  }

  componentDidMount() {
    reaction(
      () => this.props.store.socketStore.disconnected,
      () => {
        if (!this.props.store.socketStore.disconnected) {
          if (!this.checkIfIsInRoom()) {
            this.props.store.roomStore.joinRoom(
              this.props.store.userStore.userName,
              this.props.store.roomStore.roomId,
              this.props.store.roomStore.roomPassword
            )
          } else {
            window.location.reload();
          }
        }
      }
    )
  }

  checkIfIsInRoom = () => {
    let link = document.location.href.split('/')
    console.log(link)
    return link[3] !== 'room'
  }

  render() {
    const {
      store: {
        socketStore: {disconnected}
      }
    } = this.props
    return (
      <Dialog open={disconnected} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Connection lost</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connection to server is lost, Im doing my best to reconnect!
          </DialogContentText>
          <LinearProgress />
          {/*<StyledCircularProgress style={{margin: "0 auto"}}/>*/}
        </DialogContent>
        <DialogActions>
          {/*<Button onClick={this.cancelJoinRoom} color='primary'>*/}
          {/*Cancel Join*/}
          {/*</Button>*/}
          {/*<Button onClick={this.joinRoom} color='primary' variant='contained'>*/}
          {/*Join Room*/}
          {/*</Button>*/}
        </DialogActions>
      </Dialog>
    )
  }
}

decorate(EstablishingConnection, {
  userName: observable,
  roomPassword: observable
})

export {EstablishingConnection}
export default inject('store')(withRouter(observer(EstablishingConnection)))
