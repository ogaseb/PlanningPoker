import React, {Component} from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import {inject, observer} from "mobx-react"
import styled from "styled-components"
import {decorate, observable} from "mobx";

const NotificationSnackbar = styled(Snackbar)`
  & > div {
    max-width: ${(props) => props.wide && "100% !important"};
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

  closeNotification = () => {
    const {store: {socketStore: {closeNotification}}} = this.props
    closeNotification()
  }

  render() {
    const {store: {socketStore: {notificationMessage, notificationVariant}}} = this.props

    return (
      <NotificationSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        wide={300}
        open={!!notificationMessage}
        autoHideDuration={3000}
        onClose={this.closeNotification}
        variant={notificationVariant}
        message={notificationMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.closeNotification}
          >
            <CloseIcon name="close"/>
          </IconButton>
        ]}
      />
    )
  }
}

export {Notification}
export default inject("store")(observer(Notification))
