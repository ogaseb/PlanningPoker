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
    const {store: {jiraStore: {jiraLoggedIn, selectBoard}}} = this.props
    if (jiraLoggedIn) {
      selectBoard()
    }
  }

  handleChangeTitle = (e) => {
    const {store: {userStore: {admin}, jiraStore: {setTitle, broadcastTitle}}} = this.props
    if (admin) {
      this.issueFilter = e.target.value
      setTitle(e.target.value)
      broadcastTitle()
    }
  }

  handleChangeDescription = (e) => {
    const {store: {userStore: {admin}, jiraStore: {setDescription, broadcastDescription}}} = this.props
    if (admin) {
      setDescription(e.target.value)
      broadcastDescription()
    }
  }

  selectIssue = (selectedValue) => {
    const {store: {jiraStore: {setTitle, setDescription, broadcastTitle, broadcastDescription, setIssueId, setIssueKey}}} = this.props
    setTitle(selectedValue.issue.summary)
    broadcastTitle()
    setDescription(selectedValue.issue.description)
    broadcastDescription()
    setIssueId(selectedValue.issue.id)
    setIssueKey(selectedValue.issue.key)
  }

  get fuse() {
    const {store: {jiraStore: {activeBoard}}} = this.props
    return new Fuse(toJS(activeBoard.issues), {
      keys: ["key", "summary"],
      threshold: 0.6
    })
  }

  get searchResults() {
    return this.fuse.search(this.issueFilter)
  }

  get toSelect() {
    const {store: {jiraStore: {activeBoard}}} = this.props
    return toJS(activeBoard.issues).map((issue, index) => {
      return {
        value: index,
        label: `${issue.key} - ${issue.summary}`,
        issue
      }
    })
  }

  render() {
    const {store: {jiraStore: {activeBoard, activeBoardFetching, title, description}, userStore: {admin}}} = this.props
    console.log(activeBoard)
    return (
      <React.Fragment>
        {(activeBoard.length > 0 && admin) &&
        <React.Fragment>
          <Typography>Jira Task Picker</Typography>
          <StyledSelect
            options={this.toSelect}
            onChange={this.selectIssue}
            isDisabled={activeBoardFetching}
            isLoading={activeBoardFetching}
            defaultOptions={{value: "", label: "loading"}}
          />
        </React.Fragment>}
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Title
          </Typography>
          <StyledTextField
            multiline
            value={title}
            onChange={this.handleChangeTitle}
            margin="normal"
          />
        </StyledTitleCard>
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Description
          </Typography>
          <StyledTextField
            multiline
            value={description}
            onChange={this.handleChangeDescription}
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
export default inject("store")(observer(Issue));

