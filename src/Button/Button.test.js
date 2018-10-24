import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Button from './Button'

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>Button</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('has a valid snapshot', () => {
    const component = renderer.create(<Button>Button</Button>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
