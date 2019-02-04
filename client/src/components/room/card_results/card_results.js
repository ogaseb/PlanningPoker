import React, {Component} from "react"
import {inject, observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Zoom from '@material-ui/core/Zoom';
import ReactCardFlip from 'react-card-flip';
import {decorate, observable, reaction} from "mobx";


const Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 10px auto 0;
  width: 90%;
  flex-wrap: wrap;
`;

const CardsWrapper = styled.div`
  &&{
  display:flex;
  width: 90%;
  margin: 20px auto 10px;
  flex-wrap: wrap;
  }
`;

const Wrap = styled.div`
  width: 100px;
  min-height: 20px;
  perspective: 1000px;
`

const StyledCard = styled(Card)`
  &&{
    width:57px;
    height:89px;
    font-size: 30px;
    line-height: 89px;
    margin: 5px;
    margin: 0 auto;
    background-color:${props => props.color || "#303F9F"};
    color:white;
  }
`;

const StyledResultCard = styled(Card)`
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
      }, 1000 * (index + 1))
    })
  }

  render() {
    const {store: {roomStore: {waiting, cardResults}}} = this.props
    return (
      <React.Fragment>
        <Wrapper>
          <CardsWrapper>
            {waiting.length > 0 && waiting.map((result, index) => (
              <Card key={index}>
                <StyledCard color={"#303F9F"}>
                </StyledCard>
              </Card>
            ))}
          </CardsWrapper>
          <CardsWrapper>
            {cardResults.length > 0 && cardResults.map((result, index) => {
              return (
                <ReactCardFlip isFlipped={this.isFlipped[index]}>
                  <StyledResultCard key="front">
                    <StyledCard color={"#303F9F"}>
                    </StyledCard>
                  </StyledResultCard>
                  <StyledResultCard key="back">
                    <Tooltip  placement="top" TransitionComponent={Zoom} title={result.userName}>
                      <StyledCard color={result.color}>
                        {result.cardValue}
                      </StyledCard>
                    </Tooltip>
                  </StyledResultCard>
                </ReactCardFlip>
              )
            })
            }
          </CardsWrapper>
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

