import React, {Component} from "react"
import TextField from "@material-ui/core/TextField"
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import Fuse from "fuse.js"
import {decorate, computed, observable, toJS} from "mobx";
import Select from "react-select"


const StyledTextField = styled(TextField)`
  &&{
  width:90%;
  }
`;

const StyledTitleCard = styled(Card)`
  &&{
  margin: 0 auto;
  margin-top:20px;
  width:100%;
  margin-bottom: 15px;
  }
`;

const StyledSelect = styled(Select)`
  text-align:left;
`;

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

  selectIssue = (selectedValue) => {
    this.props.store.jira.title = selectedValue.issue.summary
    this.props.store.broadcastTitle()

    this.props.store.jira.description = selectedValue.issue.description
    this.props.store.broadcastDescription()

    this.props.store.jira.issueId = selectedValue.issue.id
  }


  handleExpansionChange = (panel) => {
    this.setState({
      expanded: panel
    });

  };

  get fuse() {
    return new Fuse(toJS(this.props.store.jira.activeBoard.issues), {
      keys: ["key", "summary"],
      threshold: 0.6
    })
  }

  get searchResults() {
    return this.fuse.search(this.issueFilter)
  }

  get toSelect() {
    return toJS(this.props.store.jira.activeBoard.issues).map((issue, index) => {
      return {
        value: index,
        label: `${issue.key} - ${issue.summary}`,
        issue
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {(this.props.store.jira.activeBoard.issues.length > 0 && this.props.store.user.admin) &&
        <React.Fragment>
          <Typography>Jira Task Picker</Typography>
          <StyledSelect
            options={this.toSelect}
            onChange={this.selectIssue}
            isDisabled={this.props.store.jira.activeBoardFetching}
            isLoading={this.props.store.jira.activeBoardFetching}
            defaultOptions={{value:"", label:"loading"}}
          />
        </React.Fragment>}
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

