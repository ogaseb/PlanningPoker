import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";


const Select = styled.select`
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
    selectBoardId: ""
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
    // this.setState({selectBoardId: e.target.value});
    this.props.store.selectBoard(e.target.value)
  }

  selectIssue = (e) => {
    const fields = e.target.value.split("_")
    this.props.store.title = fields[0]
    this.props.store.description = fields[1]
    this.props.store.broadcastTitle()
    this.props.store.broadcastDescription()
  }

  render() {

    return (
      <React.Fragment>
        <UserDiv>
        <RoomName variant="body1" color="inherit">
          {this.props.store.userName !== "" && <div> User Name: {this.props.store.userName}</div> }
          {this.props.store.roomName !== "" && <div> Room Name: {this.props.store.roomName}</div> }
        </RoomName>
        <Typography>users : {this.props.store.users.length}</Typography>
        <Select size={this.props.store.users.length} onClick={this.handleSelect}>
          {this.props.store.users.length > 0 &&
          this.props.store.users.map((data, index) => {
            return (
              <option key={index} value={data.userId}>
                {data.userName}
              </option>
            );
          })}
        </Select>
        {this.props.store.admin && (
          <Wrapper>
            <Button onClick={this.handleKick}>Kick User</Button>
            <Button onClick={this.handleAdmin}>Give admin </Button>
          </Wrapper>
        )}
        </UserDiv>
        <JiraDiv>
          <Typography>Jira Task Picker</Typography>
          {this.props.store.jira.jiraBoards.values.length > 0 &&
          <Select onChange={this.selectBoard}>
            {this.props.store.jira.jiraBoards.values.map((data, index) => {
              return (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              );
            })}
          </Select>}
          {this.props.store.jira.activeBoard.issues.length > 0 &&
          <Select onChange={this.selectIssue}>
            {this.props.store.jira.activeBoard.issues.map((data, index) => {
              return (
                <option key={index} value={`${data.fields.summary}_${data.fields.description}`}>
                  {data.key} - {data.fields.summary}
                </option>
              );
            })}
          </Select>}
        </JiraDiv>
      </React.Fragment>
    )
  }
}


export default inject("store")(withRouter(observer(UserList)));

