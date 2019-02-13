import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { decorate, observable } from 'mobx'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { TextField } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Grid from '@material-ui/core/Grid/Grid'

const RoomName = styled.div`
  && {
    margin: 0 auto;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
`

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
`

const UserDiv = styled.div`
  height: 50%;
  overflow-y: auto;
`

const StyledButton = styled(Button)`
  && {
    width: 100%;
  }
`

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
  }
`

const StyledExpansionPanel = styled(ExpansionPanel)`
  && {
    width: 100%;
  }
`

class UserList extends Component {
  constructor (props) {
    super(props)
    this.roomPassword = ''
  }

  state = {
    anchorEl: null
  }

  handleKick = userId => {
    if (userId) {
      this.props.store.userStore.kickUser(userId)
    }
  }
  handleAdmin = userId => {
    if (userId) {
      this.props.store.userStore.changeAdmin(userId)
    }
  }
  handleDelete = () => {
    if (this.roomPassword) {
      this.props.store.roomStore.deleteRoom(this.roomPassword)
    }
  }

  handleChange = e => {
    this.roomPassword = e.target.value
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const {
      store: {
        userStore: { userName, admin },
        roomStore: { roomName, roomUsers }
      }
    } = this.props
    return (
      <UserDiv>
        <RoomName variant='body1' color='inherit'>
          <div> User Name: {userName}</div>
          <div> Room Name: {roomName}</div>
        </RoomName>
        <Typography>users : {roomUsers.length}</Typography>
        <UserWrapper>
          {console.log(roomUsers)}
          {roomUsers.length > 0 &&
            roomUsers.map(data => {
              return (
                <StyledExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={admin && <ExpandMoreIcon />}
                  >
                    <Typography>{data.userName}</Typography>
                  </ExpansionPanelSummary>
                  {admin && (
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item xs={6}>
                          <Button
                            color='secondary'
                            variant='contained'
                            onClick={() => {
                              this.handleKick(data.socketId)
                            }}
                          >
                            kick
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            color='primary'
                            variant='contained'
                            onClick={() => {
                              this.handleAdmin(data.socketId)
                            }}
                          >
                            admin
                          </Button>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  )}
                </StyledExpansionPanel>
              )
            })}
        </UserWrapper>
        {admin && (
          <Wrapper>
            <StyledTextField
              id='room-password'
              label='Room Password'
              value={this.roomPassword}
              onChange={this.handleChange}
              type='password'
              margin='normal'
            />
            <StyledButton
              color='secondary'
              variant='contained'
              onClick={this.handleDelete}
            >
              Delete room
              <DeleteIcon style={{ marginLeft: '10px' }} />
            </StyledButton>
          </Wrapper>
        )}
      </UserDiv>
    )
  }
}

decorate(UserList, {
  userId: observable,
  roomPassword: observable
})

export { UserList }
export default inject('store')(withRouter(observer(UserList)))
