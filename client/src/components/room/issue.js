import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider/Divider";


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

class Issue extends Component {
  state = {
    userId: "",
    selectBoardId: "",
    board: "",
    expanded: null,
    issue: ""
  }

  handleChange = (e) => {
    if (e.target.id === "title") {
      if (this.props.store.user.admin) {
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

  selectIssue = (index, event) => {
    console.log(event)
    this.props.store.jira.title = this.props.store.jira.activeBoard.issues[index].fields.summary
    this.props.store.jira.description = this.props.store.jira.activeBoard.issues[index].fields.description
    this.props.store.jira.issueId = this.props.store.jira.activeBoard.issues[index].id
    this.props.store.broadcastTitle()
    this.props.store.broadcastDescription()
  }


  handleExpansionChange = (panel) => {
    this.setState({
      expanded: panel
    });

  };

  render() {

    return (
      <React.Fragment>
        <Typography>Jira Task Picker</Typography>
        {console.log(this.props.store.jira.activeBoard.issues)}
        {(this.props.store.jira.activeBoard.issues.length > 0 && this.props.store.user.admin) &&
        <StyledTaskContener>
          {this.props.store.jira.activeBoard.issues.map((data, index) => {
            return (
              <ExpansionPanel expanded={this.state.expanded === `panel${index}`} onChange={(event) => {
                this.selectIssue(index, event);
                this.handleExpansionChange(`panel${index}`);
              }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <div style={{padding: "10px", width: "90%", textAlign: "left"}}>
                    <img width={16} height={16} src={data.fields.issuetype.iconUrl}/>
                    <img width={16} height={16} src={data.fields.priority.iconUrl}/>
                    {data.fields.priority.name} | {data.key} - {data.fields.summary}
                  </div>
                  <Card style={{padding: "10px", marginLeft: "20px", position: "absolute", right: "60px"}}>Story
                    points: {data.fields.customfield_10022}</Card>
                </ExpansionPanelSummary>
                <StyledExpansionPanelDetails>
                  <Grid container>
                    <Grid item xs={data.fields.comment.comments.length > 0 ? 8 : 12}>

                    </Grid>
                    <Grid item xs={data.fields.comment.comments.length > 0 ? 4 : 0}>
                      {data.fields.comment.comments.length > 0 &&
                      data.fields.comment.comments.map((comment) => (
                        <StyledComment>
                          <div>
                            {comment.author.name}
                          </div>
                          <Divider/>
                          <div style={{textAlign: "left"}}>
                            {comment.body}
                          </div>
                        </StyledComment>)
                      )}
                    </Grid>
                  </Grid>
                </StyledExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </StyledTaskContener>}
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


export default inject("store")(withRouter(observer(Issue)));

