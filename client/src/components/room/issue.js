import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import styled from "styled-components";
import ControlledEditor from '../../components/editor/ControlledEditor'

const StyledTextField = styled(TextField)`
  &&{
  width:90%;
  }
`

const StyledCard = styled(Card)`
  &&{
  margin: 0 auto;
  width:95%;
  }
`

const StyledTitleCard = styled(Card)`
  &&{
  margin: 0 auto;
    margin-top:20px;

  width:90%;
  margin-bottom: 15px;
  }
`

class Issue extends Component {


  handleChange = (e) =>{
    if (e.target.id === "title"){
      this.props.store.title = e.target.value
      this.props.store.broadcastTitle()
    }
    if (e.target.id === "description"){
      // this.props.store.description = e.target.value
      // this.props.store.broadcastDescription()
    }
  }

  render() {

    return (
      <StyledCard>
        <StyledTitleCard>
          <Typography variant="subtitle2">
            Title
          </Typography>
          <StyledTextField
            id="title"
            value={this.props.store.title}
            onChange={this.handleChange}
            margin="normal"
          />
        </StyledTitleCard>
        <div>
          <Typography variant="subtitle2">
            Description
          </Typography>
          <ControlledEditor />

        </div>
      </StyledCard>
    )
  }
}


export default inject("store")(withRouter(observer(Issue)));

