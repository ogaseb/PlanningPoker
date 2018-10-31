import React, {Component} from "react";
import {Grid, Card, Button, Typography} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {decorate, observable} from "mobx";
import JoinDialog from '../join_room/join_dialog'


const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 64px);
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 64px);
  }
`;

const StyledButtonCard = styled(Button)`
  &&{
  width: 10%;
  height: 75px;
  margin:5px;
  flex:1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  min-width:100%;
  position:relative;
  bottom:0;
  flex-wrap: wrap;
`;

const Select = styled.select`
  width:100%;
`

const cards = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]

class Room extends Component {

  state = {
    userId: ""
  }

  onBackButtonEvent = (e) => {
    e.preventDefault()
      this.props.store.kickUser(this.props.store.userId)
      this.props.history.push(`/`)
      this.props.store.rooms = []
      this.props.store.users = []
      this.props.store.admin = false
      this.props.store.userName = ""
      this.props.store.userId = ""
      this.props.store.roomName = ""
      this.props.store.roomId = ""
  }

  componentDidMount(){
    this.props.store.fetchUsers()
    window.onpopstate = this.onBackButtonEvent

    setInterval(()=>{
      if (this.props.store.kicked){
        this.props.history.push(`/`)
        this.props.store.kicked = false
      }
      if (!this.props.store.connected){
        // this.props.history.push(`/`)
        this.props.store.openJoinDialog = true
      }
    },250)
  }

  chooseCard = (card) => {
    this.selectedCard = card
  }

  handleCard = () => {
    this.props.store.sendCard(this.selectedCard)
    this.props.store.blockCard = true
  }

  handleSelect = e => {
    this.setState({ userId: e.target.value });
  };

  handleKick = () => {
    if (this.state.userId !== ""){
      this.props.store.kickUser(this.state.userId)
    }
  }
  handleAdmin = () => {
    if (this.state.userId !== ""){
      this.props.store.changeAdmin(this.state.userId)
    }
  }
  handleReset = () => {
    this.props.store.resetCards()
    this.props.store.cardResults = []
  }



  render() {

    return (
      <React.Fragment>
        <JoinDialog />
        <StyledGrid item xs={this.props.store.admin ? 10 : 12}>
          <StyledCard>

            <Wrapper>
              {this.props.store.cardResults.map((result, index) => (
                <Card key={index} style={{width: "100px", height: "100px"}}>
                  <Typography>
                    {result.userName}
                  </Typography>
                  <Typography>
                    {result.cardValue}
                  </Typography>
                </Card>
              )) || <Typography> Waiting for response from all </Typography>}
            </Wrapper>
            <Typography> We're waiting for : {this.props.store.waiting} users </Typography>
            <Button disabled={this.props.store.blockCard} variant="contained" color="secondary" onClick={this.handleCard}>Send Card</Button>
            {this.props.store.admin && (
              <Button onClick={this.handleReset}>Next issue</Button>
            )}
            <Wrapper>
              {cards.map((card, index) => {
                return (
                  <StyledButtonCard variant="contained" color="primary" key={index} onClick={() => {
                    this.chooseCard(card)
                  }} >{card}</StyledButtonCard>
                )
              })}
            </Wrapper>
          </StyledCard>
        </StyledGrid>
        {this.props.store.admin && (
          <StyledGrid item xs={2}>
            <StyledCard>
              <Wrapper>

              </Wrapper>
              <Typography> User List : {this.props.store.users.length} users </Typography>
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
              <Button onClick={this.handleKick}>Kick User</Button>
              <Button onClick={this.handleAdmin}>Give admin </Button>

            </StyledCard>
          </StyledGrid>
        )}
      </React.Fragment>
    );
  }
}

decorate(Room, {
  selectedCard: observable,

});

export default inject("store")(withRouter(observer(Room)));
