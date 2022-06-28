// Import the function to test.
import removeTask from './removeTask';

// Get necessary mocking functions.
import getMockStateSetter from '../mock/getMockStateSetter';

describe("The remove task function", () => {
  it("should be able to remove the last task.", () => {
    const setTask = getMockStateSetter([{ id: 1, title: 'title1' }])
    removeTask(setTask, 1)
    setTask(tasks => expect(tasks.length).toBe(0))
  })

  it("should be able to remove no task when there are none.", () => {
    const setTask = getMockStateSetter([])
    removeTask(setTask, 1)
    setTask(tasks => expect(tasks.length).toBe(0))
  })

  it("should be able to remove no task when the task is not there.", () => {
    const setTask = getMockStateSetter([{ id: 1, title: 'title1' }])
    removeTask(setTask, 2)
    setTask(tasks => expect(tasks.length).toBe(1))
  })

  it("should be able to remove right right tasks when there are other tasks.", () => {
    const setTask = getMockStateSetter([{ id: 1, title: 'title1' }, { id: 2, title: 'title1' }, { id: 3, title: 'title1' }])
    removeTask(setTask, 2)
    setTask(tasks => expect(tasks.length).toBe(2))
  })
})