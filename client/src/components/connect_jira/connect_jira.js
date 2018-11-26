import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircle from "@material-ui/icons/AddCircle"
import {ArrowUpBold, Login, Logout} from "mdi-material-ui";
import {decorate, observable} from "mobx";
import Jira from "../../img/jira.png"
import Select from "react-select"
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  overflow-y:auto;
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
  top: calc(50vh - 350px);
`;

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

class ConnectJira extends Component {
  constructor(props) {
    super(props)
    this.board = false
    this.saveCredentials = true
  }

  componentDidMount() {
    if (localStorage.getItem("jira-credentials") !== null && localStorage.getItem("jira-subdomains") !== null) {
      const data = JSON.parse(localStorage.getItem("jira-credentials"));
      const subdomains = JSON.parse(localStorage.getItem("jira-subdomains"));
      this.props.store.jiraLogin(subdomains[0], data.jiraLogin, data.jiraPassword)
    }
  }

  handleJiraLogin = () => {
    if (this.jiraLogin !== "" && this.jiraPassword !== "" && this.jiraSubdomain !== "") {
      this.props.store.jiraLogin(this.jiraSubdomain, this.jiraLogin, this.jiraPassword)
      const subDomains = [this.jiraSubdomain]
      const data = {
        jiraLogin: this.jiraLogin,
        jiraPassword: this.jiraPassword
      }
      this.jiraLogin = this.jiraPassword = this.jiraSubdomain = ""
      if (this.saveCredentials) {
        localStorage.setItem("jira-subdomains", JSON.stringify(subDomains));
        localStorage.setItem("jira-credentials", JSON.stringify(data));
      }
    }
  }

  handleJiraLogout = () => {
    localStorage.removeItem("jira-credentials");
    localStorage.removeItem("jira-subdomains");
    this.props.store.jira.jiraLoggedIn = false
    this.props.store.jira.jiraBoards = []
  }

  handleChange = (e) => {
    if (e.target.id === "login-jira") {
      this.jiraLogin = e.target.value
    }
    if (e.target.id === "password-jira") {
      this.jiraPassword = e.target.value
    }
    if (e.target.id === "subdomain-jira") {
      this.jiraSubdomain = e.target.value
    }
    if (e.target.id === "save-credentials") {
      this.saveCredentials = e.target.checked
    }
  }

  goToRoom = () => {
    if (this.props.store.jira.jiraLoggedIn){
      this.props.store.saveBoardId(this.board,this.props.store.room.roomId)
    }
    this.props.history.push(`/room/${this.props.store.room.roomName}/${this.props.store.room.roomId}`)
  }

  handleChangeBoard = selectedElement => {
    this.board = selectedElement.value
    this.props.store.jira.boardId = selectedElement.value
  };

  render() {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <FormWrapper>
            <img style={{width: "100px", margin: "0 auto"}} src={Jira} alt={"Jira logo"}/>
            <Typography variant="h3" align={"center"}>
              Jira Integration
            </Typography>
            {!this.props.store.jira.jiraLoggedIn &&
            <Typography>
              Do you want to setup Jira integration? This will allow you to select issues and set ther story points
              directly from Planning Poker
            </Typography>}
            {this.props.store.jira.jiraLoggedIn &&
            <Typography>
              Select board you want to make an estimations for and go to your room
            </Typography>}
            {!this.props.store.jira.jiraLoggedIn && <React.Fragment>
              <TextField
                id="subdomain-jira"
                label="Jira subdomain"
                placeholder="subdomain.atlassian.net"
                value={this.jiraSubdomain}
                onChange={this.handleChange}
                type="text"
                margin="normal"
              />
              <TextField
                id="login-jira"
                label="Jira E-mail"
                value={this.jiraLogin}
                onChange={this.handleChange}
                type="email"
                margin="normal"
              />
              <TextField
                id="password-jira"
                label="Jira api-key"
                value={this.jiraPassword}
                onChange={this.handleChange}
                type="password"
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="save-credentials"
                    checked={this.saveCredentials}
                    onChange={this.handleChange}
                    value="save"
                    color="primary"
                  />
                }
                label="Keep me logged in"
              />

            </React.Fragment>}

            {this.props.store.jira.jiraLoggedIn && this.props.store.jira.jiraBoardsFetching &&
            <StyledCircularProgress/>}

            {this.props.store.jira.jiraLoggedIn &&
            this.props.store.jira.jiraBoards.values.length > 0 &&
            !this.props.store.jira.jiraBoardsFetching &&
            <React.Fragment>
              <FormLabel> Jira Board </FormLabel>
              <StyledSelect
                onChange={this.handleChangeBoard}
                options={this.props.store.jira.jiraBoards.values.map((data) => {
                  return {
                    value: data.id,
                    label: data.name
                  }
                })}
              />
            </React.Fragment>}
            <Grid style={{marginTop: "40px"}} container>
              <Grid item xs={5}>
                {this.props.store.jira.jiraLoggedIn &&
                <StyledButton disabled={!this.board} color="primary" variant="contained" onClick={this.goToRoom}>
                  Go to room
                  <AddCircle style={{marginLeft: "10px"}}/>
                </StyledButton>}
                {!this.props.store.jira.jiraLoggedIn &&
                <StyledButton color="primary" variant="contained" onClick={this.handleJiraLogin}>
                  Connect to Jira
                  <Login style={{marginLeft: "10px"}}/>
                </StyledButton>}
              </Grid>
              <Grid item xs={2}>
                <StyledTypography variant="h5"> OR </StyledTypography>
              </Grid>
              <Grid item xs={5}>
                {this.props.store.jira.jiraLoggedIn &&
                <StyledButton color="primary" variant="contained" onClick={this.handleJiraLogout}>
                  Logout from Jira
                  <Logout style={{marginLeft: "10px"}}/>
                </StyledButton>}
                {!this.props.store.jira.jiraLoggedIn &&
                <StyledButton variant="contained" onClick={this.goToRoom}>
                  Skip and go to room
                  <ArrowUpBold style={{marginLeft: "10px"}}/>
                </StyledButton>}
              </Grid>
            </Grid>
          </FormWrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

decorate(ConnectJira, {
  jiraLogin: observable,
  jiraPassword: observable,
  jiraSubdomain: observable,
  jiraSubdomainMore: observable,
  board: observable,
  subdomains: observable,
  saveCredentials: observable
});

export {ConnectJira}
export default inject("store")(withRouter(observer(ConnectJira)));
