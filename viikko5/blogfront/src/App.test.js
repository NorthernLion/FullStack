import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

const user = {
  username: "tester",
  token: "112",
  name: "pelle peloton",
  adult: true
}

describe (<App />, () => {
  let app
  beforeEach(() => {
    app = mount(<App />)
  })

  it('no blogs are rendered when user is not logged in', () => {
    app.update()
    const blogComponent = app.find(Blog)
    console.log(blogComponent.debug())
    expect(blogComponent.length).toEqual(0)
  })
  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />)
      
    })
    it('all blogs are rendered', () => {    
      app.update()
      const blogComponent = app.find(Blog)
      console.log(blogComponent.debug())
      expect(blogComponent.length).toEqual(3)
    })
  })
})
