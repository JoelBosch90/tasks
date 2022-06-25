// Import the function to test.
import sortByCompleted from './sortByCompleted';

describe("The sort by completed function.", () => {
  it("should be able to sort a list of task objects by their completed property.", () => {
    const tasks = [{ id: 1, done: true }, { id: 2, done: false }, { id: 3, done: true }, { id: 4, done: false }]
    console.log(sortByCompleted)
    tasks.sort(sortByCompleted)
    expect(tasks).toEqual([{ id: 1, done: true }, { id: 3, done: true }, { id: 2, done: false }, { id: 4, done: false }])
  })
})