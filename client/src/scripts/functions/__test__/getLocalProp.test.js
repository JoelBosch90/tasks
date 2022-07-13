// Import the function to test.
import getLocalProp from '../getLocalProp'

// Mock the local storage.
import mockLocalStorage from '../mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

describe("The set local prop function", () => {
  it("should be able to get a false boolean.", () => {
    const value = false
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse a true boolean.", () => {
    const value = true
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse a string.", () => {
    const value = 'Hello world'
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse an empty string.", () => {
    const value = ''
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse a number.", () => {
    const value = 42
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse zero.", () => {
    const value = 0
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse an array.", () => {
    const value = ['a', 'r', 'r', 'a', 'y']
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse an empty array.", () => {
    const value = []
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse an object.", () => {
    const value = { a: 1, b: 2, c: 'string', d: true, e: ['a', 'r', 'r', 'a', 'y'] }
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
  it("should be able to JSON parse an empty object.", () => {
    const value = {}
    const name = 'test'
    window.localStorage.setItem(name, JSON.stringify(value))
    expect(getLocalProp(name)).toEqual(value)
  })
})