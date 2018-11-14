import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {decorate, observable} from "mobx";
import UserList from "./user_list/user_list";
import HistoryList from "./history_list/history_list";

class Lists extends Component {

  selectBoard = (e) => {
    this.props.store.jira.boardId = e.target.value
    this.props.store.selectBoard(e.target.value)
  }

  render() {
    return (
      <React.Fragment>
        <UserList/>
        <HistoryList/>
      </React.Fragment>
    )
  }
}

decorate(Lists, {
  userId: observable,
});
export {Lists}
export default inject("store")(withRouter(observer(Lists)));

