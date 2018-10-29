import React, { Component } from "react";
import { Grid, Card, Input } from "@material-ui/core";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

const StyledCard = styled(Card)`
  height: calc(100vh - 64px);
`;

class CreateRoom extends Component {
  state = {
    userName: "",
    roomName: "",
    roomPassword: ""
  };

  handleChange = (e, input) => {
    if (input === "userName") {
      this.setState({ userName: e.target.value });
    }
    if (input === "roomName") {
      this.setState({ roomName: e.target.value });
    }
    if (input === "roomPassword") {
      this.setState({ roomPassword: e.target.value });
    }
  };
  render() {
    return (
      <StyledGrid item xs={6}>
        <StyledCard>
          <form noValidate autoComplete="off">
            <Input
              id="user-name"
              label="User Name"
              value={this.state.userName}
              // onChange={this.handleChange('userName')}
              margin="normal"
              defaultValue=""
              ref={input => {
                this.state.userName = input.value;
              }}
            />
            <Input
              id="room-name"
              label="Room Name"
              value={this.state.name}
              onChange={this.handleChange("roomName")}
              margin="normal"
              defaultValue=""
            />
            <Input
              id="room-password"
              label="Room Password"
              value={this.state.name}
              onChange={this.handleChange("roomPassword")}
              margin="normal"
              defaultValue=""
            />
            <button onSubmit={this.handleSubmit}>Create Room</button>
          </form>
        </StyledCard>
      </StyledGrid>
    );
  }
}

export default CreateRoom;
