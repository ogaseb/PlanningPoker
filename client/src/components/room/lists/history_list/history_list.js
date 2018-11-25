import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider/Divider";
import Card from "@material-ui/core/Card";

const JiraDiv = styled.div`
  height:50%;
  overflow-y:auto;
`;

class HistoryList extends Component {
  render() {
    return (
        <JiraDiv>
          {this.props.store.room.cardHistory.length > 0 && <Typography>Jira Cards History</Typography>}
          {this.props.store.room.cardHistory.length > 0 && this.props.store.room.cardHistory.map((data, index) => {
            return (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  {`deal ${index}`}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: "flex", flexWrap:"wrap"}}>
                  {data.map((data) => (
                    <Card style={{display: "flex", flexDirection: "column", textAlign: "center", margin: "5px"}}>
                      <div style={{color: "black"}}>
                        {data.userName}
                      </div>
                      <Divider/>
                      <div style={{textAlign: "center", color: "black"}}>
                        {data.cardValue}
                      </div>
                    </Card>)
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </JiraDiv>
    )
  }
}

export {HistoryList}
export default inject("store")(withRouter(observer(HistoryList)));

