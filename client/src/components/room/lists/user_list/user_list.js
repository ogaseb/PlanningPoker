import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button"
import {decorate, observable} from "mobx";
import DeleteIcon from '@material-ui/icons/Delete'
import {TextField} from "@material-ui/core";


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

const StyledButton = styled(Button)`
  &&{
  width:100%;
  }
`;
const StyledTextField = styled(TextField)`
  &&{
  width:100%;
  }
`;


class UserList extends Component {
  handleSelect = e => {
    this.userId = e.target.value
  };

  handleKick = () => {
    if (this.userId) {
      this.props.store.kickUser(this.userId)
    }
  }
  handleAdmin = () => {
    if (this.userId) {
      this.props.store.changeAdmin(this.userId)
    }
  }

  handleDelete = () => {
    if (this.roomPassword !== "" && this.props.store.room.roomId !== "") {
      this.props.store.deleteRoom(
        this.props.store.room.roomId,
        this.roomPassword
      );
    }
  };

  handleChange = e => {
    if (e.target.id === "room-password") {
     this.roomPassword = e.target.value
    }
  };

  render() {
    return (
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
              <StyledButton onClick={this.handleKick}>Kick User</StyledButton>
              <StyledButton onClick={this.handleAdmin}>Give admin </StyledButton>
              <StyledTextField
                id="room-password"
                label="Room Password"
                value={this.roomPassword}
                onChange={this.handleChange}
                type="password"
                margin="normal"
              />
              <StyledButton color="secondary" variant="contained" onClick={this.handleDelete}>
                Delete room
                <DeleteIcon style={{marginLeft: "10px"}}/>
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
});

export {UserList}
export default inject("store")(withRouter(observer(UserList)));

