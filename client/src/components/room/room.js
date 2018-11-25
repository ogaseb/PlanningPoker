import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import JoinDialog from "../join_room/join_dialog";
import Issue from "./issue/issue";
import CardResults from "./card_results/card_results";
import Controls from "./controls/controls";
import Lists from "./lists/lists";
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import {decorate, observable} from "mobx";
import Redirect from "react-router-dom/Redirect";

const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  text-align:center;
  flex:1;
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 48px);
  overflow-y: auto;
  text-align:center;
  width:100%;
  }
`;
class Room extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    this.notFound = window.__ROOM_NOT_FOUND__
    window.onpopstate = this.onBackButtonEvent


    setInterval(() => {
      if (this.props.store.user.kicked) {
        this.props.history.push("/")
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
      this.props.store.notificationMessage = "You have left the Room"
      this.props.store.notificationVariant = "warning"
      this.props.history.push("/")
    }, 100)
  };

  render() {
    return (
      <React.Fragment>
        {this.notFound && <Redirect to="/error"/>}
        <BrowserView style={{display: "flex",flexWrap:"wrap", margin: "0 auto", width:"100%"}}>
          <JoinDialog/>
          <StyledGrid item md={10}>
            <StyledCard>
              <Issue/>
              <CardResults/>
              <Controls/>
            </StyledCard>
          </StyledGrid>
          <StyledGrid item md={2}>
            <StyledCard>
              <Lists/>
            </StyledCard>
          </StyledGrid>
        </BrowserView>
        <MobileView style={{display: "flex", flexWrap:"wrap", margin: "0 auto", width:"100%"}} >
          <JoinDialog/>
            <StyledCard>
              <Issue/>
              <CardResults/>
              <Controls/>
            </StyledCard>
            <StyledCard>
              <Lists/>
            </StyledCard>
        </MobileView>
      </React.Fragment>
    );
  }
}

decorate(Room, {
  notFound: observable,
});

export {Room}
export default inject("store")(withRouter(observer(Room)));
