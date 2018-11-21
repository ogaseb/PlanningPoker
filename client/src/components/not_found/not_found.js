import React, {Component} from "react";
import {Grid, Card} from "@material-ui/core";
import styled from "styled-components";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";



const StyledGrid = styled(Grid)`
  &&{
  height: calc(100vh - 48px);
  }
`;

const StyledCard = styled(Card)`
  &&{
  height: calc(100vh - 64px);
  }
`;

class NotFound extends Component {
  constructor(window){
    super(window);
    window.__THIS_IS_404_PAGE__ = false
  }

  render() {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
         <Typography>
           Room doesn't exist
         </Typography>
        </StyledCard>
      </StyledGrid>
    );
  }
}
export {NotFound}
export default inject("store")(withRouter(observer(NotFound)));
