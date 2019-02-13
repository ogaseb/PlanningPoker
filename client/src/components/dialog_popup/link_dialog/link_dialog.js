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

const StyledDialog = styled(Dialog)`
  & > div > div {
    width: -webkit-fill-available;
  }
`

class LinkDialog extends Component {
  constructor (props) {
    super(props)
    this.openDialog = true
    this.link = ''
  }

  componentWillUpdate () {
    const {
      data: { room_name, room_id }
    } = this.props
    this.openDialog = true
    this.link = `${window.location.host}/room/${room_name}/${room_id}`
  }

  componentDidMount () {
    const {
      data: { room_name, room_id }
    } = this.props
    this.openDialog = true
    this.link = `${window.location.host}/room/${room_name}/${room_id}`
  }

  handleCopy = () => {
    let copyText = document.getElementById('link')
    copyText.select()
    document.execCommand('copy')
    this.props.handleClose()
  }

  cancelLink = () => {
    this.openDialog = false
    this.props.handleClose()
  }

  render () {
    const { open } = this.props
    return (
      <StyledDialog
        open={open && this.openDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy your room link and past it to your coworkers if you want them
            to join you.
          </DialogContentText>
          <TextField
            InputProps={{
              readOnly: true
            }}
            fullWidth
            id='link'
            type='text'
            label='Link'
            value={this.link}
            onChange={this.handleChangeRoomPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelLink} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleCopy} color='primary' variant='contained'>
            Copy to clipboard and close
          </Button>
        </DialogActions>
      </StyledDialog>
    )
  }
}

decorate(LinkDialog, {
  openDialog: observable,
  link: observable
})

export { LinkDialog }
export default inject('store')(withRouter(observer(LinkDialog)))
