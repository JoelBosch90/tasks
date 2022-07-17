// Import the function to test.
import immutableSort from '../immutableSort';

describe("The immutable sort function", () => {
  it("should be a function.", () => {
    expect(immutableSort).toBeInstanceOf(Function)
  })

  it("should return a sorted list.", () => {
    const array = ['b', 'c', 'a', 'e', 'd', 'y']
    const sorted = immutableSort(array)
    expect(sorted).toEqual(['a', 'b', 'c', 'd', 'e', 'y'])
  })

  it("should not sort objects.", () => {
    const object = { 1: 'b', 2: 'c', 3: 'a', 4: 'e', 5: 'd', 6: 'y'}
    const sorted = immutableSort(object)
    expect(sorted).toEqual({ 1: 'b', 2: 'c', 3: 'a', 4: 'e', 5: 'd', 6: 'y'})
  })

  it("should not sort maps.", () => {
    const object = new Map([[1, 'b'], [2, 'c'], [3, 'a'], [4, 'e'], [5, 'd'], [6, 'y']])
    const sorted = immutableSort(object)
    expect(sorted).toEqual(new Map([[1, 'b'], [2, 'c'], [3, 'a'], [4, 'e'], [5, 'd'], [6, 'y']]))
  })

  it("should not mutate the original list.", () => {
    const array = ['b', 'c', 'a', 'e', 'd', 'y']
    immutableSort(array)
    expect(array).toEqual(['b', 'c', 'a', 'e', 'd', 'y'])
  })
  
  it("should also sort with a custom sorting function.", () => {
    /**
     *  Function to sort object by their title property.
     *  @param  {Object}  itemA
     *    @property {String}  title  The title of the object.
     *  @param  {Object}  itemB
     *    @property {String}  title  The title of the object.
     *  @return {Number}
     */
    const sortByTitle = (taskA, taskB) => {
      if (taskA.title > taskB.title) return 1
      if (taskA.title < taskB.title) return -1
      return 0
    }
    const array = [{ title: 'b' }, { title: 'a' }, { title: 'y' }, { title: 'c' }]
    const sorted = immutableSort(array, sortByTitle)
    expect(sorted).toEqual([{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'y' }])
  })

  it("should default to regular sorting if passed an invalid method.", () => {
    const array = ['b', 'c', 'a', 'e', 'd', 'y']
    const sorted = immutableSort(array, 'invalid')
    expect(sorted).toEqual(['a', 'b', 'c', 'd', 'e', 'y'])
  })
})