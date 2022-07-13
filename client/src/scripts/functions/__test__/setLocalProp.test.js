// Import the function to test.
import setLocalProp from '../setLocalProp'

// Mock the local storage.
import mockLocalStorage from '../mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

describe("The set local prop function", () => {
  it("should be able to set a false boolean.", () => {
    const value = false
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set a true boolean.", () => {
    const value = true
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set a string.", () => {
    const value = 'Hello world'
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set an empty string.", () => {
    const value = ''
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set a number.", () => {
    const value = 42
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set zero.", () => {
    const value = 0
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set an array.", () => {
    const value = ['a', 'r', 'r', 'a', 'y']
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set an empty array.", () => {
    const value = []
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })

  it("should be able to set an object.", () => {
    const value = { a: 1, b: 2, c: 'string', d: true, e: ['a', 'r', 'r', 'a', 'y'] }
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })
  
  it("should be able to set an empty object.", () => {
    const value = {}
    const name = 'test'
    setLocalProp(name, value)
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  })
})