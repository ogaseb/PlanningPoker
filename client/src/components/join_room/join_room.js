import React, {Component} from "react";
import {Grid, Card, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";


const StyledGrid = styled(Grid)`
  height: calc(100vh - 48px);
`;

const StyledCard = styled(Card)`
  height: calc(100vh - 48px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 144px);
`;

const StyledCircularProgress = styled(CircularProgress)`
  &&{
  margin: 0 auto;
  }
`

const StyledSelect = styled(Select)`
  width:100%;
`


class JoinRoom extends Component {
  state = {
    userName: "",
    roomPassword: "",
    roomId: ""
  };

  componentDidMount() {
    if (localStorage.getItem("userName") !== null) {
      this.setState({userName:JSON.parse(localStorage.getItem("userName"))});
    }
  }

  handleChange = e => {
    if (e.target.id === "join-room-password") {
      this.setState({roomPassword: e.target.value});
    }
    if (e.target.id === "join-user-name") {
      this.setState({userName: e.target.value});
    }
  };

  handleSelect = e => {
    this.setState({roomId: e.target.value});
  };



  handleSubmit = () => {
    if (this.state.roomPassword !== "" && this.state.roomId !== "") {
      this.props.store.joinRoom(
        this.state.roomId,
        this.state.roomPassword,
        this.state.userName
      );
      const interval = setInterval(() => {
        if (this.props.store.user.connected) {
          this.props.history.push(`/room/${this.props.store.room.roomId}/${this.state.roomPassword}`)
          clearInterval(interval)
        }
      }, 100)
    }
  };

  handleDelete = () => {
    if (this.state.roomPassword !== "" && this.state.roomId !== "") {
      this.props.store.deleteRoom(
        this.state.roomId,
        this.state.roomPassword
      );
    }
  };

  handleChangeBoard = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  selectBoard = (e) => {
    this.props.store.jira.boardId = e.target.value
  }

  render() {
    const {store: {room: {rooms}}} = this.props
    return (
      <StyledGrid item xs={6}>
        <StyledCard>
          <Wrapper>
            <select size="10" onClick={this.handleSelect}>
              {rooms.length > 0 &&
              rooms.map((data, index) => {
                return (
                  <option key={index} value={data.roomId}>
                    Room Name: {data.roomName} - users: {data.user.length}
                  </option>
                );
              })}
            </select>
            <TextField
              id="join-user-name"
              label="User Name"
              value={this.state.userName}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="join-room-password"
              label="Room Password"
              value={this.state.roomPassword}
              onChange={this.handleChange}
              type="password"
            />
            <FormLabel> Jira Board </FormLabel>
            {this.props.store.jira.jiraBoardsFetching && <StyledCircularProgress/>}
            {this.props.store.jira.jiraBoards.values.length > 0 &&
            !this.props.store.jira.jiraBoardsFetching &&
            <StyledSelect
              inputProps={{
                name: 'board',
                id: 'board'
              }}
              value={this.state.board} onChange={(e) => {
              this.selectBoard(e);
              this.handleChangeBoard(e);
            }}>

              {this.props.store.jira.jiraBoards.values.map((data, index) => {
                return (
                  <MenuItem key={index} value={data.id}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </StyledSelect>}
            <Button onClick={this.handleSubmit}>Join room</Button>
            <Button onClick={this.handleDelete}>Delete room</Button>

          </Wrapper>
        </StyledCard>
      </StyledGrid>
    );
  }
}

// export default JoinRoom;
export default inject("store")(observer(JoinRoom));
