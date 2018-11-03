import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import styled from "styled-components";
import Editor from '../editor/editor'

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

class Issue extends Component {


  handleChange = (e) =>{
    if (e.target.id === "title"){
      this.props.store.jira.title = e.target.value
      this.props.store.broadcastTitle()
    }

  }

  render() {

    return (
      <React.Fragment>
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Title
          </Typography>
          <StyledTextField
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
          <Editor />

        </StyledTitleCard>
      </React.Fragment>
    )
  }
}


export default inject("store")(withRouter(observer(Issue)));

