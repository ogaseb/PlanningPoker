import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete"
import {ArrowUpBold} from "mdi-material-ui"
import Typography from "@material-ui/core/Typography/Typography";

const StyledGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

const StyledCard = styled(Card)`
  height: calc(100vh - 64px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 240px);
`;

const StyledCircularProgress = styled(CircularProgress)`
  &&{
  margin: 0 auto;
  }
`;

const StyledSelect = styled(Select)`
  width:100%;
`;

const StyledButton = styled(Button)`
  &&{
  width:100%;
  }
`;

class JoinRoom extends Component {
  state = {
    userName: "",
    roomPassword: "",
    roomId: "",
    board: ""
  };

  componentDidMount() {
    if (localStorage.getItem("userName") !== null) {
      this.setState({userName: JSON.parse(localStorage.getItem("userName"))});
    }
  }

  handleChange = e => {
    if (e.target.id === "join-user-name") {
      this.setState({userName: e.target.value});
    }
    if (e.target.id === "join-room-id") {
      this.setState({roomId: e.target.value});
    }
    if (e.target.id === "join-room-password") {
      this.setState({roomPassword: e.target.value});
    }
  };

  handleSubmit = () => {
    if (this.state.roomPassword !== "" && this.state.roomId !== "" && this.state.userName !== "" ) {
      this.props.store.joinRoom(
        this.state.roomId,
        this.state.roomPassword,
        this.state.userName
      );
      const interval = setInterval(() => {
        if (this.props.store.user.connected) {
          this.props.history.push(`/room/${this.props.store.room.roomName}/${this.props.store.room.roomId}`)
          clearInterval(interval)
        }
      }, 100)
    }else {
      this.props.store.notificationVariant = "warning"
      this.props.store.notificationMessage = "Choose a room you want to join"
    }
  };

  handleDelete = () => {
    if (this.state.roomPassword !== "" && this.state.roomId !== "") {
      this.props.store.deleteRoom(
        this.state.roomId,
        this.state.roomPassword
      );
    }
  };

  handleChangeBoard = event => {
    this.setState({[event.target.name]: event.target.value});
    this.props.store.jira.boardId = event.target.value
  };

  render() {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <Wrapper>
            <Typography variant="h3" align={"center"} >
              Join Room
            </Typography>
            <TextField
              id="join-user-name"
              label="User Name"
              value={this.state.userName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="join-room-id"
              label="Room id"
              placeholder="ex. 11a2bae1-1b9b-4807-9db6-c54c51989fe9"
              value={this.state.roomId}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="join-room-password"
              label="Room Password"
              value={this.state.roomPassword}
              onChange={this.handleChange}
              type="password"
              margin="normal"
            />

            <Grid style={{marginTop:"40px"}} container>
              <Grid item xs={6} >
                <StyledButton  color="primary" variant="contained" onClick={this.handleSubmit}>
                  Join room
                  <ArrowUpBold style={{marginLeft:"10px"}} />
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton color="secondary" variant="contained" onClick={this.handleDelete}>
                  Delete room
                  <DeleteIcon style={{marginLeft:"10px"}} />
                </StyledButton>
              </Grid>
            </Grid>
          </Wrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

export {JoinRoom};
export default inject("store")(observer(JoinRoom));
