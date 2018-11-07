import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import {Card, TextField} from "@material-ui/core";


const Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
    margin-top:10px;

  width: 90%;
  flex-wrap: wrap;
`;

const WrapperWait = styled(Card)`
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

const StyledTextField = styled(TextField)`
  margin: 0 auto;
  position: relative;
  bottom:0px;
`;

const WrapperWaitInput = styled(Card)`
  &&{
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  }
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
  handleChange = (e) => {
    this.props.store.jira.estimationScore = e.target.value
  }

  render() {

    const {store: {room: {waiting, cardResults}, jira: {estimationScore}}} = this.props
    return (
      <React.Fragment>
        <Wrapper>
          <WrapperWait> We're waiting for : {waiting} users </WrapperWait>
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

