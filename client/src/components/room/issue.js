import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";

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

const StyledSelect = styled(Select)`
  width:100%;
`

class Issue extends Component {
  state = {
    userId: "",
    selectBoardId: "",
    board: "",
    issue: ""
  }

  handleChange = (e) =>{
    if (e.target.id === "title"){
      this.props.store.jira.title = e.target.value
      this.props.store.broadcastTitle()
    }
    if (e.target.id === "description"){
      this.props.store.jira.description = e.target.value
      this.props.store.broadcastDescription()
    }
  }

  selectIssue = (e) => {
    const fields = e.target.value.split("_")
    this.props.store.jira.title = fields[0]
    this.props.store.jira.description = fields[1]
    this.props.store.jira.issueId = fields[2]
    this.props.store.broadcastTitle()
    this.props.store.broadcastDescription()
  }

  handleChangeIssue = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {

    return (
      <React.Fragment>
        <StyledTitleCard>
          <Typography>Jira Task Picker</Typography>
          {console.log(this.props.store.jira.activeBoard.issues)}
          {(this.props.store.jira.activeBoard.issues.length > 0 && this.props.store.user.admin) &&
          <StyledSelect
            inputProps={{
              name: 'issue',
              id: 'issue'
            }}
            value={this.state.issue}
            onChange={(e) => {
              this.selectIssue(e);
              this.handleChangeIssue(e);
            }}>
            {this.props.store.jira.activeBoard.issues.map((data, index) => {
              return (
                <MenuItem key={index} value={`${data.fields.summary}_${data.fields.description}_${data.id}`}>
                  {data.key} - {data.fields.summary}
                </MenuItem>
              );
            })}
          </StyledSelect>}
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

