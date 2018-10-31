import React, { Component } from "react";
import { Grid, Card, Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const StyledGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

const StyledCard = styled(Card)`
  height: calc(100vh - 64px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 144px);
`;

class JoinRoom extends Component {
  state = {
    userName: "",
    roomPassword: "",
    roomId: ""
  };

  handleChange = e => {
    if (e.target.id === "join-room-password") {
      this.setState({ roomPassword: e.target.value });
    }
    if (e.target.id === "join-user-name") {
      this.setState({ userName: e.target.value });
    }
  };

  handleSelect = e => {
    this.setState({ roomId: e.target.value });
  };

  handleSubmit = () => {
    if (this.state.roomPassword !== "" && this.state.roomId !== "") {
      this.props.store.joinRoom(
        this.state.roomId,
        this.state.roomPassword,
        this.state.userName
      );
      const interval = setInterval(() => {
        if(this.props.store.connected){
          this.props.history.push(`/room/${this.props.store.roomId}/${this.state.roomPassword}`)
          clearInterval(interval)
        }
      }, 100)
    }
  };

  render() {
    return (
      <StyledGrid item xs={6}>
        <StyledCard>
          <Wrapper>
            <select size="10" onClick={this.handleSelect}>
              {this.props.store.rooms.length > 0 &&
                this.props.store.rooms.map((data, index) => {
                  return (
                    <option key={index} value={data.roomId}>
                      Room Name: {data.roomName} - users: {data.user.length}
                    </option>
                  );
                })}
            </select>
            <TextField
              id="join-user-name"
              label="User Name"
              value={this.state.userName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="join-room-password"
              label="Room Password"
              value={this.state.roomPassword}
              onChange={this.handleChange}
              type="password"
            />
            <Button onClick={this.handleSubmit}>Join room</Button>
          </Wrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

// export default JoinRoom;
export default inject("store")(observer(JoinRoom));
