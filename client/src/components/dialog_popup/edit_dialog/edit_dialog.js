import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { decorate, observable } from 'mobx'
import styled from 'styled-components'
import Select from 'react-select'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormLabel from '@material-ui/core/FormLabel'

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

class LinkDialog extends Component {
  constructor (props) {
    super(props)
    this.openDialog = true
    this.roomName = ''
    this.board = ''
  }

  componentDidMount () {
    const { data } = this.props
    this.roomName = data.room_name
  }

  componentDidUpdate () {
    const { data } = this.props
    this.roomName = data.room_name
  }

  cancelLink = () => {
    this.openDialog = false
    this.props.handleClose()
  }

  handleChangeBoard = selectedElement => {
    console.log(selectedElement)
    this.board = { value: selectedElement.value, label: selectedElement.label }
    this.props.store.jiraStore.setBoardId({
      value: selectedElement.value,
      label: selectedElement.label
    })
  }

  handleChangeRoomName = e => {
    this.roomName = e.target.value
  }

  handleChangeRoomPassword = e => {
    this.roomPassword = e.target.value
  }

  handleEdit = () => {}

  render () {
    const {
      store: {
        jiraStore: { jiraBoardsFetching, jiraBoards }
      },
      open,
      data
    } = this.props
    return (
      <StyledDialog
        open={open && this.openDialog}
        aria-labelledby='form-dialog-title'
      >
        {console.log(data)}
        <DialogTitle id='form-dialog-title'>Edit Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy your room link and past it to your coworkers if you want them
            to join you.
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
          {jiraBoardsFetching && <StyledCircularProgress />}
          {jiraBoards.values.length > 0 && !jiraBoardsFetching && (
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
          <Button onClick={this.cancelLink} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleCopy} color='primary' variant='contained'>
            Edit room
          </Button>
        </DialogActions>
      </StyledDialog>
    )
  }
}

decorate(LinkDialog, {
  openDialog: observable,
  roomName: observable
})

export { LinkDialog }
export default inject('store')(withRouter(observer(LinkDialog)))
