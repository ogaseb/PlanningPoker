import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import Tooltip from '@material-ui/core/Tooltip';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Zoom from '@material-ui/core/Zoom';
import ReactCardFlip from 'react-card-flip';
import {decorate, observable, reaction} from "mobx";
import CardTable from "./card_table_dnd"


const Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 50px auto 0;
  width: 90%;
  height: 89px;
  flex-wrap: wrap;
`;

const CardsWrapperWaiting = styled.div`
  &&{
  position: relative;
  display:flex;
  height:89px;
  width: 100%;
  flex-wrap: wrap;
  }
`;
const CardsWrapperResults = styled(CardsWrapperWaiting)`
  &&{
  bottom: 89px;
  }
`;

const StyledCard = styled(Card)`
  &&{
    width:57px;
    height:89px;
    font-size: 30px;
    line-height: 89px;
    background-color:${props => props.color || "#303F9F"};
    color:white;
  }
`;

const CardMargin = styled.div`
  &&{
    margin-right: 20px;
  }
`

class CardResults extends Component {
  constructor(props) {
    super(props)
    this.isFlipped = []
    reaction(
      () => this.props.store.roomStore.cardResults.length,
      () => {
        if (this.props.store.roomStore.cardResults.length > 0) {
          this.startFlipTimer()
        }
      }
    )
  }

  startFlipTimer = () => {
    const {store: {roomStore: {cardResults}}} = this.props
    cardResults.forEach((data, index) => {
      this.isFlipped[index] = false
      setTimeout(() => {
        this.isFlipped[index] = true
      }, 500 * (index + 1))
    })
  }

  render() {
    const {store: {roomStore: {waiting, cardResults, setSelectedCard, selectedCard}}} = this.props
    return (
      <React.Fragment>
        <Wrapper>
          <CardsWrapperWaiting>
            {waiting.map((result, index) => (
              <CardMargin>
                <StyledCard color={"#303F9F"}>
                </StyledCard>
              </CardMargin>
            ))}
            {selectedCard &&
            <CardMargin><StyledCard color={"#303F9F"}>{selectedCard}</StyledCard></CardMargin>}
          </CardsWrapperWaiting>
          <CardsWrapperResults>
            {cardResults.length > 0 && cardResults.map((result, index) => {
              return (
                <ReactCardFlip flipSpeedFrontToBack={0.5} isFlipped={this.isFlipped[index]}>
                  <CardMargin key="front">
                    <StyledCard color={"#303F9F"}>
                    </StyledCard>
                  </CardMargin>
                  <CardMargin key="back">
                    <Tooltip placement="top" TransitionComponent={Zoom} title={result.userName}>
                      <StyledCard color={result.color}>
                        {result.cardValue}
                      </StyledCard>
                    </Tooltip>
                  </CardMargin>
                </ReactCardFlip>
              )
            })
            }
          </CardsWrapperResults>
          <CardTable selectedCard={selectedCard} handleSelectedCard={(value) => {
            setSelectedCard(value)
          }}>
          </CardTable>
        </Wrapper>
      </React.Fragment>
    )
  }
}

decorate(CardResults, {
  isFlipped: observable
});

export {CardResults}
export default inject("store")(observer(CardResults));

