import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AddCircle from "@material-ui/icons/AddCircle"
import {ArrowUpBold} from "mdi-material-ui";



const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 64px);
  }
`;

const FormWrapper = styled.div`
  @media only screen and (max-width: 768px) {
     width: 90%;
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 240px);
`;

const StyledButton = styled(Button)`
  &&{
  width:100%;
  }
`;

const StyledTypography = styled(Typography)`
  &&{
  text-align:center;
  position:relative;
  top:20%;
  }
`;

class CreateRoom extends Component {
  state = {
    userName: "",
    roomName: "",
    roomPassword: "",
    board: ""
  };

  componentDidMount() {
    if (localStorage.getItem("userName") !== null) {
      this.setState({userName: JSON.parse(localStorage.getItem("userName"))});
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
          this.props.history.push(`/jira`)
          // this.props.history.push(`/room/${this.state.roomName}/${this.props.store.room.roomId}`)
          clearInterval(interval)
        }
      }, 100)
    }
    else {
      this.props.store.notificationVariant = "warning"
      this.props.store.notificationMessage = "To create a room you need to fill all inputs"
    }
  };

  handleJoin = () => {
    this.props.history.push(`/join`)
  }

  handleChangeBoard = event => {
    this.setState({[event.target.name]: event.target.value});
    this.props.store.jira.boardId = event.target.value
  };

  render() {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <FormWrapper>
            <Typography variant="h3" align={"center"} >
              Create Room
            </Typography>
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
              margin="normal"
            />
            <TextField
              id="room-password"
              label="Room Password"
              value={this.state.roomPassword}
              onChange={this.handleChange}
              type="password"
              margin="normal"
            />

            <Grid style={{marginTop:"40px"}} container>
              <Grid item xs={5} >
                <StyledButton color="primary" variant="contained" onClick={this.handleSubmit}>
                  Create Room
                  <AddCircle style={{marginLeft:"10px"}} />
                </StyledButton>
              </Grid>
              <Grid item xs={2} >
                <StyledTypography variant="h5"> OR </StyledTypography>
              </Grid>
              <Grid item xs={5}>
                <StyledButton variant="contained" onClick={this.handleJoin}>
                  Join room
                  <ArrowUpBold style={{marginLeft:"10px"}} />
                </StyledButton>
              </Grid>
            </Grid>
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}
export {CreateRoom}
export default inject("store")(withRouter(observer(CreateRoom)));
