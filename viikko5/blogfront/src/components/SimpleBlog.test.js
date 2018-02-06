import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  const simpleBlog = {
    author: 'Terry',
    title: 'How to be president',
    url: 'google.com/KVG',
    likes: 20
  }

  it('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const authorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(authorDiv.text()).toContain(simpleBlog.author)
    expect(authorDiv.text()).toContain(simpleBlog.title)
    expect(likesDiv.text()).toContain(simpleBlog.likes)
  })
  it('handler is called twice when like button is clicked twice', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} onclick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  }) 
})
