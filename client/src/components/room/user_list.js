import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const StyledSelect = styled(Select)`
  width:100%;
`

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

  selectIssue = (e) => {
    const fields = e.target.value.split("_")
    this.props.store.jira.title = fields[0]
    this.props.store.jira.description = fields[1]
    this.props.store.jira.issueId = fields[2]
    this.props.store.broadcastTitle()
    this.props.store.broadcastDescription()
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <React.Fragment>
        <UserDiv>
          <RoomName variant="body1" color="inherit">
            {this.props.store.user.userName !== "" && <div> User Name: {this.props.store.user.userName}</div>}
            {this.props.store.room.roomName !== "" && <div> Room Name: {this.props.store.room.roomName}</div>}
          </RoomName>
          <Typography>users : {this.props.store.user.users.length}</Typography>
          <DefaultSelect size={this.props.store.user.users.length} onChange={this.handleSelect}>
            {this.props.store.user.users.length > 0 &&
            this.props.store.user.users.map((data, index) => {
              return (
                <option key={index} value={data.userId}>
                  {console.log(data)}
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
          <Typography>Jira Task Picker</Typography>
          {this.props.store.jira.jiraBoards.values.length > 0 &&
          <StyledSelect
            inputProps={{
              name: 'board',
              id: 'board'
            }}
            value={this.state.board} onChange={(e) => {
            this.selectBoard(e);
            this.handleChange(e);
          }}>

            {this.props.store.jira.jiraBoards.values.map((data, index) => {
              return (
                <MenuItem key={index} value={data.id}>
                  {data.name}
                </MenuItem>
              );
            })}
          </StyledSelect>}
          {this.props.store.jira.activeBoard.issues.length > 0 &&
          <StyledSelect
            inputProps={{
              name: 'issue',
              id: 'issue'
            }}
            value={this.state.issue}
            onChange={(e) => {
              this.selectIssue(e);
              this.handleChange(e);
            }}>
            {this.props.store.jira.activeBoard.issues.map((data, index) => {
              return (
                <MenuItem key={index} value={`${data.fields.summary}_${data.fields.description}_${data.id}`}>
                  {data.key} - {data.fields.summary}
                  {console.log(data)}
                </MenuItem>
              );
            })}
          </StyledSelect>}
        </JiraDiv>
      </React.Fragment>
    )
  }
}


export default inject("store")(withRouter(observer(UserList)));

