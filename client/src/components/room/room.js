import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import JoinDialog from '../join_room/join_dialog'
import Issue from './issue/issue'
import CardResults from './card_results/card_results'
import Controls from './controls/controls'
import Lists from './lists/lists'

const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 48px);
  overflow-y: auto;
  }
`;

class Room extends Component {
  componentDidMount() {
    this.props.store.fetchUsers()
    window.onpopstate = this.onBackButtonEvent
    setInterval(() => {
      if (this.props.store.user.kicked) {
        this.props.history.push(`/`)
        this.props.store.user.kicked = false
      }
      if (!this.props.store.user.connected) {
        this.props.store.openJoinDialog = true
      }
    }, 250)
  }

  onBackButtonEvent = (e) => {
    e.preventDefault()
    this.props.store.kickUser(this.props.store.user.userId)
    this.props.store.room.rooms = this.props.store.user.users = []
    this.props.store.user.admin = this.props.store.user.connected = false
    this.props.store.user.userName = this.props.store.user.userId = this.props.store.room.roomName = this.props.store.room.roomId = ""
    setTimeout(() => {
      this.props.store.notificationMessage = "You have leaved the Room"
      this.props.store.notificationVariant = "warning"
      this.props.history.push(`/`)
    }, 100)
  }

  render() {
    return (
      <React.Fragment>
        <JoinDialog/>
        <StyledGrid item xs={10}>
          <StyledCard>
            <Issue/>
            <CardResults/>
            <Controls/>
          </StyledCard>
        </StyledGrid>
        <StyledGrid item xs={2}>
          <StyledCard>
            <Lists/>
          </StyledCard>
        </StyledGrid>
      </React.Fragment>
    );
  }
}

export {Room}
export default inject("store")(withRouter(observer(Room)));
