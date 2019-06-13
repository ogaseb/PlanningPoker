import React, {Component} from 'react'
import {Button, Card, Grid} from '@material-ui/core'
import styled from 'styled-components'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import {decorate, observable, reaction} from 'mobx'
import routes from 'routes'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import {Atlassian, Cards} from 'mdi-material-ui'
import DialogPopup from 'components/dialog_popup/dialog_popup'

const StyledGrid = styled(Grid)`
  && {
    min-height: 300px;
    margin-top: 8px;
  }
`

const StyledCard = styled(Card)`
  && {
    min-height: 300px;
    position: relative;
  }
`

const StyledChip = styled(Chip)`
  && {
    margin-top: 5px;
    width: 90%;
    float: left;
    text-align: left;
    margin-left: 5%;
    justify-content: left;
    &:last-child {
      margin-bottom: 5px;
    }
  }
`

const ButtonWrapper = styled.div`
  && {
    display: inline-flex;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
`

const StyledButton = styled(Button)`
  && {
    flex: 1;
    margin-left: 2.5px;
    margin-right: 2.5px;
  }
`

const Wrapper = styled(Grid)`
  && {
    height: calc(100vh - 64px);
    overflow-x: hidden;
    overflow-y: auto;
  }
`

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.tags = [[{}]]
    this.openLinkDialog = false
    this.openEditDialog = false
    this.openJiraDialog = false
  }

  componentDidMount() {
    this.props.store.userStore.fetchUserRooms()
  }

  handleJoinRoom = (roomName, roomId) => {
    const {
      history: {push}
    } = this.props
    push(routes.room(roomName, roomId))
  }

  handleDeleteRoom = roomId => {
    const {
      store: {
        roomStore: {deleteRoom}
      }
    } = this.props
    deleteRoom(false, roomId)
  }

  handleLinkDialog = index => {
    const {
      store: {
        userStore: {userRooms}
      }
    } = this.props
    this.linkData = userRooms[index]
    this.openLinkDialog = true
  }

  handleEditDialog = index => {
    const {
      store: {
        userStore: {userRooms}
      }
    } = this.props
    this.editData = userRooms[index]
    this.openEditDialog = true
  }

  handleCloseLinkDialog = () => {
    this.openLinkDialog = false
  }

  handleCloseEditDialog = () => {
    this.openEditDialog = false
  }

  render() {
    const {
      store: {
        userStore: {userRooms}
      }
    } = this.props
    return (
      <>
        <Wrapper container spacing={16}>
          <DialogPopup
            linkDialog={this.openLinkDialog}
            data={this.linkData}
            closeLinkDialog={this.handleCloseLinkDialog}
          />
          <DialogPopup
            editDialog={this.openEditDialog}
            data={this.editData}
            closeEditDialog={this.handleCloseEditDialog}
          />
          {userRooms &&
          userRooms.map((data, index) => (
            <StyledGrid item xs={12} sm={6} md={6} lg={4} key={index}>
              {console.log(
                data.room_history !== null ? data.room_history.length : 'none'
              )}
              <StyledCard>
                <Grid container>
                  <Grid xs={12}>
                    <StyledChip
                      variant='outlined'
                      avatar={<Avatar>RN</Avatar>}
                      label={data.room_name}
                      color='primary'
                    />
                  </Grid>
                  <Grid xs={12}>
                    <StyledChip
                      variant='outlined'
                      avatar={<Avatar>ID</Avatar>}
                      label={data.room_id}
                      color='primary'
                    />
                  </Grid>
                  <Grid xs={6}>
                    <StyledChip
                      variant='outlined'
                      avatar={
                        <Avatar>
                          <Atlassian/>
                        </Avatar>
                      }
                      label={data.room_board_id || 'none'}
                      color='primary'
                    />
                  </Grid>
                  <Grid xs={6}>
                    <StyledChip
                      variant='outlined'
                      avatar={
                        <Avatar>
                          <Cards/>
                        </Avatar>
                      }
                      label={
                        `deals played: ${
                          data.room_history !== null
                            ? data.room_history.length
                            : 'none'
                          }` || 'none'
                      }
                      color='primary'
                    />
                  </Grid>
                </Grid>
                <ButtonWrapper>
                  <StyledButton
                    onClick={() => {
                      this.handleDeleteRoom(data.room_id)
                    }}
                    color='secondary'
                    variant='contained'
                  >
                    Delete
                  </StyledButton>

                  <StyledButton
                    onClick={() => {
                      this.handleEditDialog(index)
                    }}
                    variant='contained'
                  >
                    Edit
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      this.handleLinkDialog(index)
                    }}
                    variant='contained'
                  >
                    Link
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      this.handleJoinRoom(data.room_name, data.room_id)
                    }}
                    color='primary'
                    variant='contained'
                  >
                    Join
                  </StyledButton>
                </ButtonWrapper>
              </StyledCard>
            </StyledGrid>
          ))}
        </Wrapper>
      </>
    )
  }
}

decorate(Rooms, {
  linkData: observable,
  editData: observable,
  tags: observable,
  openLinkDialog: observable,
  openEditDialog: observable
})

export {Rooms}
export default inject('store')(withRouter(observer(Rooms)))
