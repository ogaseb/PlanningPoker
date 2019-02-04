import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {decorate, observable} from "mobx";

const StyledButtonCard = styled(Button)`
  &&{
  height: 10vh;
  margin:1px;
  flex:1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 10vh;
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

const cards = ["☕", 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100]

class Controls extends Component {
  constructor(props) {
    super(props)
    this.selectedCard = ""
  }

  handleReset = () => {
    this.props.store.roomStore.resetCards()
  }

  handleCard = () => {
    const {store: {roomStore: {sendCard, setBlockCard}}} = this.props
    sendCard(this.selectedCard)
    setBlockCard(true)
    this.selectedCard = ""
  }

  chooseCard = (card) => {
    this.selectedCard = card
  }

  render() {
    const {store: {roomStore: {blockCard, blockReset, cardsAreTheSame}, userStore: {admin}, jiraStore: {jiraLoggedIn}}} = this.props
    return (
      <>
        <Button
          disabled={blockCard}
          variant="contained"
          color="secondary"
          onClick={this.handleCard}>
          Send Card
        </Button>
        {admin && (
          <>
            <Button
              disabled={blockReset}
              onClick={this.handleReset}>Reset cards</Button>
            {jiraLoggedIn && <Button
              disabled={!cardsAreTheSame}
              onClick={this.handleEstimation}>Set estimation point</Button>
            }
          </>
        )}
        {this.selectedCard && <YourCard>{this.selectedCard}</YourCard>}
        <ButtonWrapper>
          {cards.map((card, index) => {
            return (
              <StyledButtonCard variant="contained" color="primary" key={index} onClick={(e) => {
                this.chooseCard(card, e);
              }}>{card}</StyledButtonCard>
            )
          })}
        </ButtonWrapper>
      </>
    )
  }
}

decorate(Controls, {
  selectedCard: observable,
});

export {Controls}
export default inject("store")(observer(Controls));

