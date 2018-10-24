import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Table from './Table'
import Button from '../Button/Button'

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
    ]
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table {...props}>Table</Table>, div)
  })
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props}><Button>Dismiss</Button></Table>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('shows two items in list', () => {
    const element = shallow(<Table {...props} />)
    expect(element.find('.table-row').length).toBe(2)
  })

  it('shows button is present', () => {
    const element = shallow(<Table {...props} />)
    expect(element.find(<Button />).length).toBe(0)
  })
})
