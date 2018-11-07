import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button"
import {decorate, observable} from "mobx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";




const DefaultSelect = styled.select`
  width:100%;
`

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
`;

const UserDiv = styled.div`
  height:50%;
  overflow-y:auto;
`;
const JiraDiv = styled.div`
  height:50%;
  overflow-y:auto;
`;

class UserList extends Component {
  state = {
    userId: "",
    selectBoardId: "",
    board: "",
    issue: ""
  }

  handleSelect = e => {
    this.setState({userId: e.target.value});
  };

  handleKick = () => {
    if (this.state.userId !== "") {
      this.props.store.kickUser(this.state.userId)
    }
  }
  handleAdmin = () => {
    if (this.state.userId !== "") {
      this.props.store.changeAdmin(this.state.userId)
    }
  }

  selectBoard = (e) => {
    this.props.store.jira.boardId = e.target.value
    this.props.store.selectBoard(e.target.value)
  }





  render() {
    return (
      <React.Fragment>
        <UserDiv>
          <RoomName variant="body1" color="inherit">
            {this.props.store.user.userName !== "" && <div> User Name: {this.props.store.user.userName}</div>}
            {this.props.store.room.roomName !== "" && <div> Room Name: {this.props.store.room.roomName}</div>}
          </RoomName>
          <Typography>users : {this.props.store.user.users.length}</Typography>
          <DefaultSelect size={this.props.store.user.users.length} onClick={this.handleSelect}>
            {this.props.store.user.users.length > 0 &&
            this.props.store.user.users.map((data, index) => {
              return (
                <option key={index} value={data.userId}>
                  {data.userName}
                </option>
              );
            })}
          </DefaultSelect>
          {this.props.store.user.admin && (
            <Wrapper>
              <Button onClick={this.handleKick}>Kick User</Button>
              <Button onClick={this.handleAdmin}>Give admin </Button>
            </Wrapper>
          )}
        </UserDiv>
        <JiraDiv>
          {console.log(this.props.store.room.cardHistory)}
          {this.props.store.room.cardHistory.map((data, index) => {
            return (
              <ExpansionPanel  >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </JiraDiv>
      </React.Fragment>
    )
  }
}

decorate(UserList, {
  bufferIssues: observable,
});

export default inject("store")(withRouter(observer(UserList)));

