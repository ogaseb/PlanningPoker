import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import {decorate, observable} from 'mobx'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormLabel from '@material-ui/core/FormLabel'
import Select from "react-select";

const StyledDialog = styled(Dialog)`
  & > div > div {
    width: -webkit-fill-available;
  }
`

const StyledSelect = styled(Select)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`

const StyledCircularProgress = styled(CircularProgress)`
  && {
    margin: 0 auto;
  }
`

class CreateDialogComponent extends Component {
  constructor(props) {
    super(props)
    this.openDialog = true
    this.roomName = ''
    this.roomPassword = ''
  }

  componentDidMount() {
    this.openDialog = true
  }

  handleChangeRoomName = e => {
    this.roomName = e.target.value
  }

  handleChangeRoomPassword = e => {
    this.roomPassword = e.target.value
  }

  handleChangeBoard = selectedElement => {
    this.board = {value: selectedElement.value, label: selectedElement.label}
    // this.props.store.jiraStore.setBoardId({
    //   value: selectedElement.value,
    //   label: selectedElement.label
    // })
  }

  handleCreateRoom = () => {
    const {
      store: {
        socketStore: {openNotification},
        roomStore: {createRoom},
        userStore: {userName}
      }
    } = this.props
    if (userName && this.roomName && this.roomPassword) {
      createRoom(userName, this.roomName, this.roomPassword, this.board.value )
      this.openDialog = false
      this.props.handleClose()
    } else {
      openNotification(
        'To create a room you need to fill all inputs',
        'warning'
      )
    }
  }

  cancelJoinRoom = () => {
    this.openDialog = false
    this.props.handleClose()
  }

  render() {
    const {
      store: {
        jiraStore: {jiraBoardsFetching, jiraBoards, jiraLoggedIn}
      },
      open,
    } = this.props
    return (
      <StyledDialog
        open={open && this.openDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please write room name and password for it.
          </DialogContentText>
          <TextField
            fullWidth
            type='text'
            label='Room Name'
            value={this.roomName}
            onChange={this.handleChangeRoomName}
            margin='dense'
          />
          <TextField
            fullWidth
            type='password'
            label='Room Password'
            value={this.roomPassword}
            onChange={this.handleChangeRoomPassword}
            margin='dense'
          />
          {jiraLoggedIn && jiraBoardsFetching && <StyledCircularProgress/>}
          {jiraLoggedIn && jiraBoards.values.length && !jiraBoardsFetching && (
            <>
              <FormLabel> Jira Board </FormLabel>
              <StyledSelect
                onChange={this.handleChangeBoard}
                options={jiraBoards.values.map(data => {
                  return {
                    value: data.id,
                    label: data.name
                  }
                })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelJoinRoom} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={this.handleCreateRoom}
            color='primary'
            variant='contained'
          >
            Create Room
          </Button>
        </DialogActions>
      </StyledDialog>
    )
  }
}

decorate(CreateDialogComponent, {
  openDialog: observable,
  roomName: observable,
  roomPassword: observable,
  board: observable
})

export {CreateDialogComponent}
export default inject('store')(withRouter(observer(CreateDialogComponent)))
