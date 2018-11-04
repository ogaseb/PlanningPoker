import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 48px);
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 186px);
`;

const StyledButton = styled(Button)`
  &&{
  margin-top: 40px;
  }
`;

class CreateRoom extends Component {
  state = {
    userName: "",
    roomName: "",
    roomPassword: ""
  };

  componentDidMount() {
    if (localStorage.getItem("userName") !== null) {
      this.setState({userName:JSON.parse(localStorage.getItem("userName"))});
    }
  }

  handleChange = e => {
    if (e.target.id === "user-name") {
      this.setState({userName: e.target.value});
    }
    if (e.target.id === "room-name") {
      this.setState({roomName: e.target.value});
    }
    if (e.target.id === "room-password") {
      this.setState({roomPassword: e.target.value});
    }
  };

  handleSubmit = async () => {
    if (
      this.state.userName !== "" &&
      this.state.roomName !== "" &&
      this.state.roomPassword !== ""
    ) {
      this.props.store.createRoom(
        this.state.userName,
        this.state.roomName,
        this.state.roomPassword
      );
      const interval = setInterval(() => {
        if (this.props.store.user.connected) {
          this.props.history.push(`/room/${this.props.store.room.roomId}/${this.state.roomPassword}`)
          clearInterval(interval)
        }
      }, 100)

    }
  };

  render() {
    return (
      <StyledGrid item xs={6}>
        <StyledCard>
          <FormWrapper>
            <TextField
              id="user-name"
              label="User Name"
              value={this.state.userName}
              onChange={this.handleChange}
              margin="normal"
            />

            <TextField
              id="room-name"
              label="Room Name"
              value={this.state.roomName}
              onChange={this.handleChange}
            />
            <TextField
              id="room-password"
              label="Room Password"
              value={this.state.roomPassword}
              onChange={this.handleChange}
              type="password"
            />
            <StyledButton onClick={this.handleSubmit}>Create Room</StyledButton>
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

export default inject("store")(withRouter(observer(CreateRoom)));
