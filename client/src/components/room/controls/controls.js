import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonDnd from "./controlsbutton_dnd"

const ButtonWrapper = styled.div`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 10vh;
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
    sendCard()
    setBlockCard(true)
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
        <ButtonWrapper>
          {cards.map((card, index) => {
            return (
                <ButtonDnd key={index} value={card}/>
            )
          })}
        </ButtonWrapper>
      </>
    )
  }
}

export {Controls}
export default inject("store")(observer(Controls));

