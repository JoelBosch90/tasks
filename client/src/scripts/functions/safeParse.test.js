// Import the function to test.
import safeParse from './safeParse';

describe("The safe parse function.", () => {
  it("should be able to JSON parse a false boolean.", () => {
    const original = false
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse a true boolean.", () => {
    const original = true
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse a string.", () => {
    const original = 'Hello world'
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse an empty string.", () => {
    const original = ''
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse a number.", () => {
    const original = 42
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse zero.", () => {
    const original = 0
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse an array.", () => {
    const original = ['a', 'r', 'r', 'a', 'y']
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse an empty array.", () => {
    const original = []
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse an object.", () => {
    const original = { a: 1, b: 2, c: 'string', d: true, e: ['a', 'r', 'r', 'a', 'y'] }
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should be able to JSON parse an empty object.", () => {
    const original = {}
    const json = JSON.stringify(original)
    expect(safeParse(json)).toEqual(JSON.parse(json))
  })
  it("should not crash when given undefined.", () => {
    expect(safeParse('undefined')).toEqual(undefined)
  })
})