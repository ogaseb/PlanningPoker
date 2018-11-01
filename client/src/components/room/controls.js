import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Card";
import styled from "styled-components";
import {Button, Card} from "@material-ui/core";
import {decorate, observable} from "mobx";

const StyledButtonCard = styled(Button)`
  &&{
  width: 10%;
  height: 5vh;
  margin:5px;
  flex:1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 83.333333%;
  height: 10vh;
  flex-wrap: wrap;
`;

const Wrapper = styled(Card)`
  &&{
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90%;
  flex-wrap: wrap;
  margin-top:10px;
  margin-bottom: 10px;
  padding: 5px;
  justify-content: center;
  }
`;
const cards = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]

class Controls extends Component {


  handleReset = () => {
    this.props.store.resetCards()
    this.props.store.cardResults = []
  }

  handleCard = () => {
    this.props.store.sendCard(this.selectedCard)
    this.props.store.blockCard = true
  }

  chooseCard = (card) => {
    this.selectedCard = card
  }

  render() {
    return (
      <React.Fragment>
        <Wrapper> We're waiting for : {this.props.store.waiting} users </Wrapper>
        <Button disabled={this.props.store.blockCard} variant="contained" color="secondary"
                onClick={this.handleCard}>Send Card</Button>
        {this.props.store.admin && (
          <Button onClick={this.handleReset}>Next issue</Button>
        )}
        <ButtonWrapper>
          {cards.map((card, index) => {
            return (
              <StyledButtonCard variant="contained" color="primary" key={index} onClick={() => {
                this.chooseCard(card)
              }}>{card}</StyledButtonCard>
            )
          })}
        </ButtonWrapper>
      </React.Fragment>
    )
  }
}

decorate(Controls, {
  selectedCard: observable,
});


export default inject("store")(withRouter(observer(Controls)));

