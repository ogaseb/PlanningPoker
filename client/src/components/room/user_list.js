import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import {Button, Card} from "@material-ui/core";


const Select = styled.select`
  width:100%;
`

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

class UserList extends Component {
  state = {
    userId: ""
  }

  handleSelect = e => {
    this.setState({userId: e.target.value});
  };

  handleKick = () => {
    if (this.state.userId !== "") {
      this.props.store.kickUser(this.state.userId)
    }
  }
  handleAdmin = () => {
    if (this.state.userId !== "") {
      this.props.store.changeAdmin(this.state.userId)
    }
  }

  render() {

    return (
      <React.Fragment>
        <RoomName variant="body1" color="inherit">
          {this.props.store.userName !== "" && <div> User Name: {this.props.store.userName}</div> }
          {this.props.store.roomName !== "" && <div> Room Name: {this.props.store.roomName}</div> }
        </RoomName>
        <Typography>users : {this.props.store.users.length}</Typography>
        <Select size={this.props.store.users.length} onClick={this.handleSelect}>
          {this.props.store.users.length > 0 &&
          this.props.store.users.map((data, index) => {
            return (
              <option key={index} value={data.userId}>
                {data.userName}
              </option>
            );
          })}
        </Select>
        {this.props.store.admin && (
          <Wrapper>
            <Button onClick={this.handleKick}>Kick User</Button>
            <Button onClick={this.handleAdmin}>Give admin </Button>
          </Wrapper>
        )}

      </React.Fragment>
    )
  }
}


export default inject("store")(withRouter(observer(UserList)));

