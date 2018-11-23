import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button"
import {decorate, observable} from "mobx";
import DeleteIcon from "@material-ui/icons/Delete"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import {TextField} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid/Grid";

const RoomName = styled.div`
  && {
  margin: 0 auto;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
`;


const UserDiv = styled.div`
  height:50%;
  overflow-y:auto;
`;

const StyledButton = styled(Button)`
  &&{
  width:100%;
  }
`;

const StyledTextField = styled(TextField)`
  &&{
  width:100%;
  }
`;

const StyledExpansionPanel = styled(ExpansionPanel)`
  &&{
  width:100%;
  }
`;


class UserList extends Component {
  state = {
    anchorEl: null,
  };

  handleKick = (userId) => {
    if (userId) {
      this.props.store.kickUser(userId)
    }
  }
  handleAdmin = (userId) => {
    if (userId) {
      this.props.store.changeAdmin(userId)
    }
  }

  handleDelete = () => {
    if (this.roomPassword !== "" && this.props.store.room.roomId !== "") {
      this.props.store.deleteRoom(
        this.props.store.room.roomId,
        this.roomPassword
      );
    }
  };

  handleChange = e => {
    if (e.target.id === "room-password") {
      this.roomPassword = e.target.value
    }
  };


  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    return (
      <UserDiv>
        <RoomName variant="body1" color="inherit">
          {this.props.store.user.userName !== "" && <div> User Name: {this.props.store.user.userName}</div>}
          {this.props.store.room.roomName !== "" && <div> Room Name: {this.props.store.room.roomName}</div>}
        </RoomName>
        <Typography>users : {this.props.store.user.users.length}</Typography>
        <UserWrapper>
          {this.props.store.user.users.length > 0 &&
          this.props.store.user.users.map((data) => {
            return (
              <StyledExpansionPanel>
                <ExpansionPanelSummary expandIcon={this.props.store.user.admin && <ExpandMoreIcon/>}>
                  <Typography>
                    {data.userName}
                  </Typography>
                </ExpansionPanelSummary>
                {this.props.store.user.admin && <ExpansionPanelDetails>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button color="secondary" variant="contained" onClick={() => {
                        this.handleKick(data.userId)
                      }}>
                        kick
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button color="primary" variant="contained" onClick={() => {
                        this.handleAdmin(data.userId)
                      }}>
                        admin
                      </Button>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>}
              </StyledExpansionPanel>
            );
          })}
        </UserWrapper>
        {this.props.store.user.admin && (
          <Wrapper>
            <StyledTextField
              id="room-password"
              label="Room Password"
              value={this.roomPassword}
              onChange={this.handleChange}
              type="password"
              margin="normal"
            />
            <StyledButton color="secondary" variant="contained" onClick={this.handleDelete}>
              Delete room
              <DeleteIcon style={{marginLeft: "10px"}}/>
            </StyledButton>
          </Wrapper>

        )}
      </UserDiv>
    )
  }
}

decorate(UserList, {
  userId: observable,
  roomPassword: observable
});

export {UserList}
export default inject("store")(withRouter(observer(UserList)));

