import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000
})
