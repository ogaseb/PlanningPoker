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
  width: 90%;
  flex-wrap: wrap;
`;


const CardResults = ({store: {cardResults}}) => {

  return (
    <Wrapper>
      {cardResults.map((result, index) => (
        <Card key={index} style={{width: "100px", minHeight: "20px"}}>
          <Typography>
            {result.userName}
          </Typography>
          <Typography>
            {result.cardValue}
          </Typography>
        </Card>
      )) || <Typography> Waiting for response from all </Typography>}
    </Wrapper>
  )
}


export default inject("store")(withRouter(observer(CardResults)));

