import React from 'react'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    author: 'Terry',
    title: 'How to be president',
    url: 'google.com/KVG',
    likes: 20,
    user: {
      _id: '5a71ef66dc3e8f204bda2599',
      username: 'jaspeli',
      name: 'JP Hyva'
    }
  }

  const blogComponent = shallow(<Blog blog={blog} />)
  const authorAndTitlegDiv = blogComponent.find('.authorAndTitle')

  it('default is that only author and title are displayed', () => {
    const togglableContent = blogComponent.find('.togglableContent')
    expect(authorAndTitlegDiv.text()).toContain(blog.author && blog.title)
    expect(togglableContent.getElement().props.style).toEqual({ display: 'none' })
  })
  it('after click other fields are displayed as well', () => {
    authorAndTitlegDiv.simulate('click')
    const togglableContent = blogComponent.find('.togglableContent')
    expect(togglableContent.getElement().props.style).toEqual({ display: '' })
  })
})
