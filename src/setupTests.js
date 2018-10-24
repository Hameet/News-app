import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })

global.toJson = toJson
