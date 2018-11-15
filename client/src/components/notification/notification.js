import React, {Component} from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { inject, observer } from "mobx-react"
import styled from "styled-components"
import {decorate, observable} from "mobx";

const NotificationSnackbar = styled(Snackbar)`
  & > div {
    max-width: ${props => props.wide && "100% !important"};
    background-color: ${props => {
      if (props.variant === "error") {
        return "#D32F2F"
      }
      if (props.variant === "warning") {
        return "#FFA001"
      }
      if (props.variant === "info") {
        return "#1876D2"
      }
      if (props.variant === "success") {
        return "#43A047"
      }
    }};
  }
`

class Notification extends Component {

  closeNotification =() => {
    this.props.store.notificationMessage = null
  }

  render(){
    return (
      <NotificationSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        wide={300}
        open={!!this.props.store.notificationMessage}
        autoHideDuration={3000}
        onClose={this.closeNotification}
        variant={this.props.store.notificationVariant}
        message={this.props.store.notificationMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.closeNotification}
          >
            <CloseIcon name="close" />
          </IconButton>
        ]}
      />
    )
  }
}

decorate(Notification, {
  notificationMessage: observable,
  notificationVariant: observable
});

export {Notification}
export default inject("store")(observer(Notification))
