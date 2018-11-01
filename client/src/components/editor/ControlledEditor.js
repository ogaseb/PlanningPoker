import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';

import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

class ControlledEditor extends Component {
  handleChange = (value) =>{
    this.props.store.description = value
    this.props.store.broadcastDescription()
  }

  render() {
    return (
      <ReactQuill value={this.props.store.description}
                  onChange={this.handleChange} />
    )
  }
}

export default inject("store")(withRouter(observer(ControlledEditor)));
