import React, { Component } from 'react'
import { Button, Card, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { decorate, observable, reaction } from 'mobx'
import { withCookies } from 'react-cookie'
import ReactTags from 'react-tag-autocomplete'
import CreateDialog from 'components/create_room/create_dialog'
import DialogPopup from 'components/dialog_popup/dialog_popup'

import routes from 'routes'

const StyledGrid = styled(Grid)`
  && {
    min-height: 300px;
  }
`

const StyledCard = styled(Card)`
  && {
    min-height: 300px;
  }
`

class Rooms extends Component {
  constructor (props) {
    super(props)
    this.userName = ''
    this.roomName = ''
    this.roomPassword = ''
    this.tags = [[{}]]
    reaction(
      () => props.store.userStore.loggedIn,
      () => {
        if (props.store.userStore.loggedIn) {
          console.log(this.props.store.userStore.userId)
          props.store.userStore.fetchUserRooms()
        }
      }
    )
    // this.roomFetchInterval = null
  }

  componentDidMount () {
    const {
      store: {
        userStore: { loggedIn }
      }
    } = this.props

    // this.roomFetchInterval = setInterval(() => {
    //   this.props.store.userStore.fetchUserRooms()
    // }, 1000)
  }

  handleJoinRoom = (roomName, roomId) => {
    const {
      history: { push }
    } = this.props
    push(routes.room(roomName, roomId))
  }

  handleDeleteRoom = roomId => {
    const {
      store: {
        roomStore: { deleteRoom }
      }
    } = this.props
    deleteRoom(false, roomId)
  }

  handleAdditionTag = tag => {
    console.log(tag)
    this.tags = [...this.tags, tag]
    // {id: tag, text: tag}
  }

  handleDeleteTag (i) {
    this.tags.splice(i, 1)
  }

  render () {
    const {
      store: {
        userStore: { userRooms }
      }
    } = this.props
    return (
      <>
        <CreateDialog />
        {console.table(userRooms)}
        <Grid container spacing={16}>
          {userRooms &&
            userRooms.map(data => (
              <StyledGrid item xs={3}>
                <StyledCard>
                  {data.room_name}
                  {data.room_id}
                  <Button
                    onClick={() => {
                      this.handleJoinRoom(data.room_name, data.room_id)
                    }}
                  >
                    Join Room
                  </Button>
                  <Button
                    onClick={() => {
                      this.handleDeleteRoom(data.room_id)
                    }}
                  >
                    Delete Room
                  </Button>
                  <ReactTags
                    autoresize
                    tags={this.tags}
                    handleDelete={this.handleDeleteTag}
                    handleAddition={this.handleAdditionTag}
                  />
                </StyledCard>
              </StyledGrid>
            ))}
          {/*<StyledCard>*/}
          {/*<FormWrapper>*/}
          {/*<Typography variant="h3" align={"center"}>*/}
          {/*Welcome to Planning Poker app*/}
          {/*</Typography>*/}
          {/*<Typography variant={"display1"}> please choose if you want to simply create one room or login to manage and*/}
          {/*access all you rooms</Typography>*/}
          {/*<StyledButtonGrid container>*/}
          {/*<Grid item xs={5}>*/}
          {/*<GoogleButton type="light" onClick={this.handleLogin}/>*/}
          {/*/!*<StyledButton variant="contained" onClick={this.handleJoin}>*!/*/}
          {/*/!*Join room*!/*/}
          {/*/!*<StyledArrowUpBold/>*!/*/}
          {/*/!*</StyledButton>*!/*/}
          {/*</Grid>*/}
          {/*<Grid item xs={2}>*/}
          {/*<StyledTypography variant="h5"> OR </StyledTypography>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={5}>*/}
          {/*<StyledButton color="primary" variant="contained" onClick={this.createGuestAccount}>*/}
          {/*guest sign in*/}
          {/*<StyledAddCircle/>*/}
          {/*</StyledButton>*/}
          {/*</Grid>*/}
          {/*</StyledButtonGrid>*/}
          {/*</FormWrapper>*/}
          {/*</StyledCard>*/}
        </Grid>
      </>
    )
  }
}

decorate(Rooms, {
  userName: observable,
  roomName: observable,
  roomPassword: observable,
  tags: observable
})

export { Rooms }
export default inject('store')(withCookies(withRouter(observer(Rooms))))
