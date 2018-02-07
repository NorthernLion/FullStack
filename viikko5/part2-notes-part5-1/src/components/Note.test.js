import React from 'react'
import { shallow, mount } from 'enzyme'
import Note from './Note'
import Togglable from './Togglable'

describe.only('<Note />', () => {
  const note = {
    content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    important: true
  }
  it('renders content', () => {

    const noteComponent = shallow(<Note note={note} />)
    const contentDiv = noteComponent.find('.content')
    /*
    console.log(contentDiv.debug())
    console.log(noteComponent.debug())
    */
    expect(contentDiv.text()).toContain(note.content)
  })
  it('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn()

    const noteComponent = shallow(
      <Note
        note={note}
        toggleImportance={mockHandler}
      />
    )

    const button = noteComponent.find('button')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(1)
  })
})
