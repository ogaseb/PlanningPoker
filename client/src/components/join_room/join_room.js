import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const StyledGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

const StyledCard = styled(Card)`
  height: calc(100vh - 64px);
`;

class JoinRoom extends Component {
  render() {
    return (
      <StyledGrid item xs={6}>
        <StyledCard>
          <select>
            {/*{console.log(this.props.store.rooms)}*/}
            {this.props.store.rooms.map((data, index) => {
              return <option key={index}>{data.roomName}</option>;
            })}
          </select>
        </StyledCard>
      </StyledGrid>
    );
  }
}

// export default JoinRoom;
export default inject("store")(observer(JoinRoom));
