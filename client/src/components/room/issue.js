import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ControlledEditor from '../../components/editor/ControlledEditor'

const StyledTextField = styled(TextField)`
  &&{
  width:90%;
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
      <React.Fragment>
        <div>
          <Typography variant="subtitle2">
            Title
          </Typography>
          <StyledTextField
            id="title"
            value={this.props.store.title}
            onChange={this.handleChange}
            margin="normal"
          />
        </div>
        <div>
          <Typography variant="subtitle2">
            Description
          </Typography>
          <ControlledEditor />
          {/*<StyledTextField*/}
            {/*id="description"*/}
            {/*multiline*/}
            {/*value={this.props.store.description}*/}
            {/*onChange={this.handleChange}*/}
            {/*margin="normal"*/}
            {/*variant="filled"*/}
          {/*/>*/}
        </div>
      </React.Fragment>
    )
  }
}


export default inject("store")(withRouter(observer(Issue)));

