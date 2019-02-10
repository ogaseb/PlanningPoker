import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AddCircle from "@material-ui/icons/AddCircle"
import {ArrowUpBold} from "mdi-material-ui";
import {decorate, observable, reaction,} from "mobx";
import routes from "routes"

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

const StyledAddCircle = styled(AddCircle)`
  &&{
  margin-left: 10px;
  }
`;

const StyledArrowUpBold = styled(ArrowUpBold)`
  &&{
  margin-left: 10px;
  }
`;

const StyledButtonGrid = styled(Grid)`
  &&{
  margin-top: 40px;
  }
`;

class CreateRoom extends Component {
  constructor(props) {
    super(props)
    this.userName = ""
    this.roomName = ""
    this.roomPassword = ""

    reaction(
      () => this.props.store.userStore.connected,
      () => {
        if (this.props.store.userStore.connected) {
          this.props.history.push(routes.jira())
        }
      },
    )
  }

  handleChangeUserName = (e) => {
    this.userName = e.target.value
  };

  handleChangeRoomName = (e) => {
    this.roomName = e.target.value
  };

  handleChangeRoomPassword = (e) => {
    this.roomPassword = e.target.value
  };

  handleSubmit = async () => {
    const {store: {socketStore: {openNotification}, roomStore: {createRoom}, userStore: {loggedIn, userName}}} = this.props
    if (
      loggedIn ? userName : this.userName &&
        this.roomName &&
        this.roomPassword
    ) {
      createRoom(
        loggedIn ? userName : this.userName,
        this.roomName,
        this.roomPassword
      );
    } else {
      openNotification("To create a room you need to fill all inputs", "warning")
    }
  };

  handleJoin = () => {
    this.props.history.push(routes.join())
  }

  render() {
    const {store: {userStore: {loggedIn}}} = this.props
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <FormWrapper>
            <Typography variant="h3" align={"center"}>
              Create Room
            </Typography>
            {!loggedIn && (<TextField
              type="text"
              label="User Name"
              value={this.userName}
              onChange={this.handleChangeUserName}
              margin="normal"
            />)}
            <TextField
              type="text"
              label="Room Name"
              value={this.roomName}
              onChange={this.handleChangeRoomName}
              margin="normal"
            />
            <TextField
              type="password"
              label="Room Password"
              value={this.roomPassword}
              onChange={this.handleChangeRoomPassword}
              margin="normal"
            />

            <StyledButtonGrid container>
              <Grid item xs={5}>
                <StyledButton color="primary" variant="contained" onClick={this.handleSubmit}>
                  Create Room
                  <StyledAddCircle/>
                </StyledButton>
              </Grid>
              <Grid item xs={2}>
                <StyledTypography variant="h5"> OR </StyledTypography>
              </Grid>
              <Grid item xs={5}>
                <StyledButton variant="contained" onClick={this.handleJoin}>
                  Join room
                  <StyledArrowUpBold/>
                </StyledButton>
              </Grid>
            </StyledButtonGrid>
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

decorate(CreateRoom, {
  userName: observable,
  roomName: observable,
  roomPassword: observable
});

export {CreateRoom}
export default inject("store")(withRouter(observer(CreateRoom)));
