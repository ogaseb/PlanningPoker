import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fuse from 'fuse.js'
import {decorate, computed, observable, toJS} from "mobx";


const StyledTextField = styled(TextField)`
  &&{
  width:90%;
  }
`

const StyledTitleCard = styled(Card)`
  &&{
  margin: 0 auto;
    margin-top:20px;

  width:100%;
  margin-bottom: 15px;
  }
`

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  &&{
  padding:0;
  }
`
const StyledTaskContener = styled(Card)`
  &&{
  max-height: 300px;
  overflow-y:auto;
  }
`

const StyledComment = styled(Card)`
  &&{
  margin-bottom:10px;
  }
`

const TitleCard = styled(Card)`
  &&{
    padding: 10px; 
    max-width: 80%; 
    text-align: left; 
    background-color:white;
    color:black;
  }
`



class Issue extends Component {
  state = {
    expanded: null,
  }

  componentDidMount() {
    if (this.props.store.jira.jiraLoggedIn && this.props.store.jira.boardId !== "") {
      this.props.store.selectBoard(this.props.store.jira.boardId)
    }
  }

  handleChange = (e) => {
    if (e.target.id === "title") {
      if (this.props.store.user.admin) {
        this.issueFilter = e.target.value
        this.props.store.jira.title = e.target.value
        this.props.store.broadcastTitle()
      }
    }
    if (e.target.id === "description") {
      if (this.props.store.user.admin) {
        this.props.store.jira.description = e.target.value
        this.props.store.broadcastDescription()
      }
    }
  }

  selectIssue = (index) => {
    const issues = document.getElementById("issues").childNodes
    for (let i = 0; i < issues.length; i++) {
      issues[i].style.backgroundColor = "white"
      issues[i].style.color = "black"
    }
    issues[index].style.backgroundColor = "#303F9F"
    issues[index].style.color = "white"

    this.props.store.jira.title = this.searchResults[index].summary
    this.props.store.jira.description = this.searchResults[index].description
    this.props.store.jira.issueId = this.searchResults[index].id
    this.props.store.broadcastTitle()
    this.props.store.broadcastDescription()
  }


  handleExpansionChange = (panel) => {
    this.setState({
      expanded: panel
    });

  };

  get fuse() {
    return new Fuse(toJS(this.props.store.jira.activeBoard.issues), {
      keys: ['key', 'summary'],
      threshold: 0.6
    })
  }

  get searchResults() {
    return this.fuse.search(this.issueFilter)
  }

  render() {

    return (
      <React.Fragment>
        {this.props.store.jira.activeBoardFetching && <CircularProgress/>}
        {(this.props.store.jira.activeBoard.issues.length > 0 &&
          this.props.store.user.admin &&
          !this.props.store.jira.activeBoardFetching) &&
        <React.Fragment>
          <Typography>Jira Task Picker</Typography>
          <StyledTaskContener id="issues">
            {this.searchResults.map(({key, priorityType, id, description, issueUrl, priorityUrl, summary, comments}, index) => {
              return (
                <ExpansionPanel expanded={this.state.expanded === `panel${index}`} onChange={() => {
                  this.selectIssue(index);
                  this.handleExpansionChange(`panel${index}`);
                }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <TitleCard>
                      <img alt="issueType" width={16} height={16} src={issueUrl}/>
                      <img alt="priority" width={16} height={16} src={priorityUrl}/>
                      {priorityType} | {key} - {summary}
                    </TitleCard>
                  </ExpansionPanelSummary>
                  <StyledExpansionPanelDetails>
                    <Grid container>
                      <Grid item xs={comments.length > 0 ? 8 : 12}>
                      </Grid>
                      <Grid item xs={comments.length > 0 ? 4 : 0}>
                        {comments.length > 0 &&
                        comments.map(({author:{name}, body}) => (
                          <StyledComment>
                            <div style={{color: "black"}}>
                              {name}
                            </div>
                            <Divider/>
                            <div style={{textAlign: "left", color: "black"}}>
                              {body}
                            </div>
                          </StyledComment>)
                        )}
                      </Grid>
                    </Grid>
                  </StyledExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </StyledTaskContener></React.Fragment>}
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Title
          </Typography>
          <StyledTextField
            multiline
            id="title"
            value={this.props.store.jira.title}
            onChange={this.handleChange}
            margin="normal"
          />
        </StyledTitleCard>
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Description
          </Typography>
          <StyledTextField
            multiline
            id="description"
            value={this.props.store.jira.description}
            onChange={this.handleChange}
            margin="normal"
          />
        </StyledTitleCard>
      </React.Fragment>
    )
  }
}

decorate(Issue, {
  issueFilter: observable,
  issueBoard: observable,
  fuse: computed,
  searchResults: computed
});

export {Issue}
export default inject("store")(withRouter(observer(Issue)));

