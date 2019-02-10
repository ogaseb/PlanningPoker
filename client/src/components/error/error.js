import React, { Component } from 'react'
import { Grid, Card } from '@material-ui/core'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { AlertCircleOutline } from 'mdi-material-ui'
import { decorate, observable } from 'mobx'
import Button from '@material-ui/core/Button'

const StyledGrid = styled(Grid)`
  && {
    height: calc(100vh - 48px);
  }
`

const StyledCard = styled(Card)`
  && {
    height: calc(100vh - 64px);
  }
`

const ErrorWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  text-align: center;
  display: block;
  flex-direction: column;
  width: 640px;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 240px);
  font-size: 50px;
`

class Error extends Component {
  constructor (props) {
    super(props)
    this.errorInfo = "Something went wrong i don't really know what happened"
    if (window.__ROOM_NOT_FOUND__) {
      this.errorInfo = 'I just cant find room you trying to join'
      window.__ROOM_NOT_FOUND__ = false
    }
  }

  goBack = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <StyledGrid item xs={12}>
        <StyledCard>
          <ErrorWrapper>
            <AlertCircleOutline
              color='error'
              style={{ width: '128px', height: 'auto' }}
            />
            <Typography variant={'display2'} style={{ marginBottom: '40px' }}>
              {this.errorInfo}
            </Typography>
            <Typography variant={'display2'}>¯\_(ツ)_/¯</Typography>
            <Button color='primary' variant='contained' onClick={this.goBack}>
              Take me back
            </Button>
          </ErrorWrapper>
        </StyledCard>
      </StyledGrid>
    )
  }
}

decorate(Error, {
  errorInfo: observable
})

export { Error }
export default inject('store')(withRouter(observer(Error)))
