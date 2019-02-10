import React from 'react'
import AppStore from './app_store'

describe('AppStore', () => {
  it('creates itself without errors', () => {
    const appStore = AppStore.create({
      userStore: { userName: 'test' }
    })

    expect(appStore.userStore.userName).toBe('test')
  })
})
