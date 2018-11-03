import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import Card from '@material-ui/core/Card'
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

const Wrapper = styled(Card)`
  margin: 0 auto;
  width: 90%;
  margin-bottom:20px;
`;

class Editor extends Component {
  handleChange = (value) => {
      this.props.store.jira.description = value
      this.props.store.broadcastDescription()
  }

  render() {
    const {store:{jira:{description}}} = this.props
    return (
      <Wrapper>
        <ReactQuill
          value={description || ''}
          onChange={this.handleChange}/>
      </Wrapper>
    )
  }
}

export default inject("store")(withRouter(observer(Editor)));
