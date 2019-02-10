import React, { Component } from 'react'
import { Grid, Card, Button, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import DeleteIcon from '@material-ui/icons/Delete'
import { ArrowUpBold } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography/Typography'
import { decorate, observable, reaction } from 'mobx'
import routes from 'routes'

const StyledGrid = styled(Grid)`
  height: calc(100vh - 64px);
`

const StyledCard = styled(Card)`
  height: calc(100vh - 64px);
`

const Wrapper = styled.div`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 240px);
`

const StyledButton = styled(Button)`
  && {
    width: 100%;
  }
`

class JoinRoom extends Component {
  constructor (props) {
    super(props)
    this.userName = ''
    this.roomId = ''
    this.roomPassword = ''
  }

  componentDidMount () {
    // if (localStorage.getItem("userName") !== null) {
    //   this.setState({userName: JSON.parse(localStorage.getItem("userName"))});
    // }
    reaction(
      () => this.props.store.userStore.connected,
      () => {
        if (this.props.store.userStore.connected) {
          this.props.history.push(routes.room(this.roomName, this.roomId))
        }
      }
    )
  }

  handleChangeUserName = e => {
    this.userName = e.target.value
  }

  handleChangeRoomId = e => {
    this.roomId = e.target.value
  }

  handleChangeRoomPassword = e => {
    this.roomPassword = e.target.value
  }

  handleSubmit = () => {
    const {
      store: {
        roomStore: { joinRoom },
        socketRoom: { openNotification }
      }
    } = this.props
    if (this.roomPassword && this.roomId && this.userName) {
      joinRoom(this.userName, this.roomId, this.roomPassword)
    } else {
      openNotification('To join a room you need to fill all inputs', 'warning')
    }
  }

  handleDelete = () => {
    const {
      store: {
        roomStore: { deleteRoom }
      }
    } = this.props
    if (this.roomPassword && this.roomId) {
      deleteRoom(this.roomId, this.roomPassword)
    }
  }

  render () {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <Wrapper>
            <Typography variant='h3' align={'center'}>
              Join Room
            </Typography>
            <TextField
              id='join-user-name'
              label='User Name'
              value={this.userName}
              onChange={this.handleChangeUserName}
              margin='normal'
            />
            <TextField
              id='join-room-id'
              label='Room id'
              placeholder='ex. 11a2bae1-1b9b-4807-9db6-c54c51989fe9'
              value={this.roomId}
              onChange={this.handleChangeRoomId}
              margin='normal'
            />
            <TextField
              id='join-room-password'
              label='Room Password'
              value={this.roomPassword}
              onChange={this.handleChangeRoomPassword}
              type='password'
              margin='normal'
            />
            <Grid style={{ marginTop: '40px' }} container>
              <Grid item xs={6}>
                <StyledButton
                  color='primary'
                  variant='contained'
                  onClick={this.handleSubmit}
                >
                  Join room
                  <ArrowUpBold style={{ marginLeft: '10px' }} />
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton
                  color='secondary'
                  variant='contained'
                  onClick={this.handleDelete}
                >
                  Delete room
                  <DeleteIcon style={{ marginLeft: '10px' }} />
                </StyledButton>
              </Grid>
            </Grid>
          </Wrapper>
        </StyledCard>
      </StyledGrid>
    )
  }
}

decorate(JoinRoom, {
  userName: observable,
  roomId: observable,
  roomPassword: observable
})

export { JoinRoom }
export default inject('store')(observer(JoinRoom))
