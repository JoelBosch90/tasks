// Import the function to test.
import getMockStateSetter from '../getMockStateSetter'

describe("The mock state setter function", () => {
  it("should be a function.", () => {
    expect(getMockStateSetter).toBeInstanceOf(Function)
  })

  it("should set an empty string if not passed a default value.", () => {
    const setter = getMockStateSetter()
    setter(state => expect(state).toEqual(''))
  })

  it("should initially take a default string value.", () => {
    const defaultValue = 'DefaultValue'
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should initially take a default array value.", () => {
    const defaultValue = []
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should initially take a default filled array value.", () => {
    const defaultValue = [1, 2, 3, 4, '5']
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should initially take a default object value.", () => {
    const defaultValue = {}
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should initially take a default filled object value.", () => {
    const defaultValue = { a: 1, b: 2, c: 3, d: 4, e: '5' }
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should initially take a default Number value.", () => {
    const defaultValue = 0
    const setter = getMockStateSetter(defaultValue)
    setter(state => expect(state).toEqual(defaultValue))
  })

  it("should update it's internal state.", () => {
    const defaultValue = 'DefaultValue'
    const update = 'Change'
    const setter = getMockStateSetter(defaultValue)
    setter(state => `${state}${update}`)
    setter(state => expect(state).toEqual(`${defaultValue}${update}`))
  })

  it("should update state to undefined if nothing is returned.", () => {
    const setter = getMockStateSetter('')
    setter(state => {})
    setter(state => expect(state).toEqual(undefined))
  })
})