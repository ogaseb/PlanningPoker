import React from 'react'
import { CardResults } from './card_results'
import { shallow } from 'enzyme'

describe('CardResults', () => {
  it('renders without errors', () => {
    const store = {
      roomStore: { waiting: [], cardResults: [] }
    }

    const component = shallow(<CardResults store={store} />)
    expect(component).toMatchSnapshot()
  })
})
