import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import JoinDialogComponent from "./join_dialog/join_dialog"
import CreateDialogComponent from "./create_dialog/create_dialog"
import EstablishingConnection from "./establishing_connection/establishing_connection";
import LinkDialog from "./link_dialog/link_dialog";
import EditDialog from "./edit_dialog/edit_dialog";
import JiraDialog from "./jira_dialog/jira_dialog";

class DialogPopup extends Component {
  render() {
    const {
      joinDialog,
      createDialog,
      editDialog,
      linkDialog,
      jiraDialog,
      closeCreateDialog,
      closeLinkDialog,
      closeEditDialog,
      closeJiraDialog,
      establishingConnection,
      data
    } = this.props
    return (
      <>
        {joinDialog && (<JoinDialogComponent/>)}
        {createDialog && (<CreateDialogComponent open={createDialog} handleClose={closeCreateDialog}/>)}
        {establishingConnection && (<EstablishingConnection/>)}
        {linkDialog && (<LinkDialog open={linkDialog} data={data} handleClose={closeLinkDialog}/>)}
        {editDialog && (<EditDialog open={editDialog} data={data} handleClose={closeEditDialog}/>)}
        {jiraDialog && (<JiraDialog open={jiraDialog} data={data} handleClose={closeJiraDialog}/>)}
      </>
    )
  }
}

export {DialogPopup}
export default inject('store')(withRouter(observer(DialogPopup)))
