import React, {Component} from "react";
import {Grid, Button} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircle from "@material-ui/icons/AddCircle"
import {Logout} from "mdi-material-ui";
import {decorate, observable} from "mobx";
import Jira from "img/jira.png"
import Select from "react-select"
import routes from "routes"

const StyledButton = styled(Button)`
  &&{
  width:100%;
  }
`;

const StyledSelect = styled(Select)`
  width:100%;
  margin-top:40px;
  margin-bottom: 40px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  &&{
  margin: 0 auto;
  }
`;

const StyledTypography = styled(Typography)`
  &&{
  text-align:center;
  position:relative;
  top:20%;
  }
`;

const StyledImg = styled.img`
  width: 100px;
  margin: 0 auto;
`;

const StyledGrid = styled(Grid)`
  margin-top: 40px;
`;

const StyledAddCircle = styled(AddCircle)`
  margin-left: 10px;
`;

const StyledLogout = styled(Logout)`
  margin-left: 10px;
`;

class ConnectJiraLoggedIn extends Component {
  constructor(props) {
    super(props)
    this.board = false
  }

  handleJiraLogout = () => {
    localStorage.removeItem("jira-credentials");
    localStorage.removeItem("jira-subdomains");
    this.props.store.jiraStore.logout()
  }

  goToRoom = () => {
    const {store: {jiraStore: {jiraLoggedIn, saveBoardId}, roomStore: {roomName, roomId}}, history: {push}} = this.props
    if (jiraLoggedIn) {
      saveBoardId(this.board)
    }
    push(routes.room(roomName, roomId))
  }

  handleChangeBoard = selectedElement => {
    this.board = selectedElement.value
    this.props.store.jiraStore.setBoardId(selectedElement.value)
  };

  render() {
    const {store: {jiraStore: {jiraBoardsFetching, jiraBoards}}} = this.props
    return (
      <>
        <StyledImg src={Jira} alt={"Jira logo"}/>
        <Typography variant="h3" align={"center"}>
          Jira Integration
        </Typography>
        <Typography>
          Select board you want to make an estimations for and go to your room
        </Typography>
        {jiraBoardsFetching &&
        <StyledCircularProgress/>}
        {jiraBoards.values.length > 0 &&
        !jiraBoardsFetching &&
        <>
          <FormLabel> Jira Board </FormLabel>
          <StyledSelect
            onChange={this.handleChangeBoard}
            options={jiraBoards.values.map((data) => {
              return {
                value: data.id,
                label: data.name
              }
            })}
          />
        </>}
        <StyledGrid container>
          <Grid item xs={5}>
            <StyledButton disabled={!this.board} color="primary" variant="contained" onClick={this.goToRoom}>
              Go to room
              <StyledAddCircle/>
            </StyledButton>
          </Grid>
          <Grid item xs={2}>
            <StyledTypography variant="h5"> OR </StyledTypography>
          </Grid>
          <Grid item xs={5}>
            <StyledButton color="primary" variant="contained" onClick={this.handleJiraLogout}>
              Logout from Jira
              <StyledLogout/>
            </StyledButton>
          </Grid>
        </StyledGrid>
      </>
    );
  }
}

decorate(ConnectJiraLoggedIn, {
  board: observable,
});

export {ConnectJiraLoggedIn}
export default inject("store")(withRouter(observer(ConnectJiraLoggedIn)));
