import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import JoinDialog from '../join_room/join_dialog_component'
import Issue from './issue/issue'
import CardResults from './card_results/card_results'
import Controls from './controls/controls'
import Lists from './lists/lists'
import { BrowserView, MobileView } from 'react-device-detect'
import { decorate, observable, when } from 'mobx'
import Redirect from 'react-router-dom/Redirect'
import routes from 'routes'
import ItemPreview from 'drag_layer'

const StyledGrid = styled(Grid)`
  && {
    height: calc(100vh - 48px);
    text-align: center;
    flex: 1;
  }
`

const StyledCard = styled(Card)`
  && {
    height: calc(100vh - 48px);
    overflow-y: auto;
    text-align: center;
    width: 100%;
  }
`

class Room extends Component {
  componentDidMount () {
    const {
      store: {
        userStore: { kicked, setKicked, setConnected }
      }
    } = this.props
    this.notFound = window.__ROOM_NOT_FOUND__
    window.onpopstate = this.onBackButtonEvent

    when(
      () => kicked,
      () => {
        this.props.history.push(routes.root())
        setKicked(false)
        setConnected(false)
      }
    )
  }

  onBackButtonEvent = e => {
    e.preventDefault()
    const {
      store: {
        userStore: { leaveRoom, loggedIn },
        socketStore: { openNotification }
      },
      history: { push }
    } = this.props
    leaveRoom()
    openNotification('You have left the Room', 'warning')
    if (loggedIn) {
      push(routes.rooms())
    } else {
      push(routes.root())
    }
  }

  render () {
    return (
      <>
        <ItemPreview />
        {this.notFound && <Redirect to='/error' />}
        <BrowserView
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <JoinDialog />
          <StyledGrid item md={10}>
            <StyledCard>
              <Issue />
              <CardResults />
              <Controls />
            </StyledCard>
          </StyledGrid>
          <StyledGrid item md={2}>
            <StyledCard>
              <Lists />
            </StyledCard>
          </StyledGrid>
        </BrowserView>
        <MobileView
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <JoinDialog />
          <StyledCard>
            <Issue />
            <CardResults />
            <Controls />
          </StyledCard>
          <StyledCard>
            <Lists />
          </StyledCard>
        </MobileView>
      </>
    )
  }
}

decorate(Room, {
  notFound: observable
})

export { Room }
export default inject('store')(withRouter(observer(Room)))
