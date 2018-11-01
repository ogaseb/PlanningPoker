import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

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
   position:absolute;
   bottom:100px;
`;

const YourCard = styled(Card)`
  margin: 0 auto;
  margin-top:10px;
  width: 100px;
  height: 100px;
  font-size:50px;
  line-height: 100px;
  text-align: center;
`;


const cards = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]

class Controls extends Component {
  constructor(){
    super()
    this.selectedCard = ""
  }

  handleReset = () => {
    this.props.store.resetCards()
    this.props.store.cardResults = []
  }

  handleCard = () => {
    this.props.store.sendCard(this.selectedCard)
    this.props.store.blockCard = true
    this.selectedCard = ""
  }

  chooseCard = (card) => {
    this.selectedCard = card

  }

  render() {
    return (
      <React.Fragment>
        <Button disabled={this.props.store.blockCard} variant="contained" color="secondary"
                onClick={this.handleCard}>Send Card</Button>
        {this.props.store.admin && (
          <Button onClick={this.handleReset}>Next issue</Button>
        )}
        {this.selectedCard !== "" && <YourCard> {this.selectedCard}</YourCard>}
        <ButtonWrapper>
          {cards.map((card, index) => {
            return (
              <StyledButtonCard variant="contained" color="primary" key={index} onClick={() => {
                this.chooseCard(card, index);
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

