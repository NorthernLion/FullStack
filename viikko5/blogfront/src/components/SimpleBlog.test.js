import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const simpleBlog = {
      author: 'Terry',
      title: 'How to be president',
      url: 'google.com/KVG',
      likes: 20
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const authorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(authorDiv.text()).toContain(simpleBlog.author)
    expect(authorDiv.text()).toContain(simpleBlog.title)
    expect(likesDiv.text()).toContain(simpleBlog.likes)
  })
})
