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
  }
`;



class CardResults extends Component {
  handleChange = (e) =>{
    this.props.store.estimationScore = e.target.value
  }
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <WrapperWait> We're waiting for : {this.props.store.waiting} users </WrapperWait>
          <CardsWrapper>
          {this.props.store.cardResults.length > 0 && this.props.store.cardResults.map((result, index) => (
            <Card key={index} style={{width: "100px", minHeight: "20px"}}>
              <Typography>
                {result.userName}
              </Typography>
              <Typography>
                {result.cardValue}
              </Typography>

            </Card>
          )) || <Typography style={{margin: "0 auto"}}> Waiting for response from all users </Typography>}
          </CardsWrapper>
          <WrapperWaitInput> {this.props.store.cardResults.length > 0 && <StyledTextField
            id="estimation-score"
            label="Estimation score"
            value={this.props.store.estimationScore}
            onChange={this.handleChange}
            type="number"
          />} </WrapperWaitInput>

        </Wrapper>

      </React.Fragment>
    );
  }
}


export default inject("store")(withRouter(observer(CardResults)));

