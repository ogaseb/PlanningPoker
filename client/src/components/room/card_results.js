import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import {Card} from "@material-ui/core";


const Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
    margin-top:10px;

  width: 90%;
  flex-wrap: wrap;
`;

const CardsWrapper = styled.div`
  &&{
  margin: 0 auto;
  width: 90%;
  margin-bottom:10px;
  display:flex;
  }
`;

const StyledCard = styled(Card)`
  &&{
    width:57px;
    height:89px;
    font-size: -webkit-xxx-large;
    line-height: 89px;
    margin: 5px;
    margin: 0 auto;
    background-color:${props => props.color || "#303F9F"};
    color:white;
  }
`;


class CardResults extends Component {

  render() {

    const {store: {room: {waiting, cardResults}}} = this.props
    return (
      <React.Fragment>
        <Wrapper>
          <CardsWrapper>
            {waiting.length > 0 && waiting.map((result, index) => (
              <Card key={index} style={{width: "100px", minHeight: "20px"}}>
                <Typography>
                </Typography>
                <StyledCard color={"#303F9F"}>
                </StyledCard>
              </Card>
            ))}

          </CardsWrapper>
          <CardsWrapper>
            {cardResults.length > 0 && cardResults.map((result, index) => (
              <Card key={index} style={{width: "100px", minHeight: "20px"}}>
                <Typography>
                  {result.userName}
                </Typography>
                <StyledCard color={result.color}>
                  {result.cardValue}
                </StyledCard>
              </Card>
            )) || <Typography style={{margin: "0 auto"}}> Waiting for response from all users </Typography>}
          </CardsWrapper>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default inject("store")(withRouter(observer(CardResults)));

