// Import the function to test.
import createTask from './createTask';

// Get necessary mocking functions.
import getMockStateSetter from './getMockStateSetter';

describe("The create task function", () => {
  it("should be able to add an initial first task.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, title)
    setTask(tasks => expect(tasks.length).toBe(1))
  })

  it("should give the first task the proper title.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, title)
    setTask(tasks => expect(tasks[0].title).toBe(title))
  })

  it("should give the first task the proper id.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, title)
    setTask(tasks => expect(tasks[0].id).toBe(1))
  })

  it("should be able to add a second task.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, `${title}1`)
    createTask(setTask, `${title}2`)
    setTask(tasks => expect(tasks.length).toBe(2))
  })

  it("should give the second task the proper title.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, `${title}1`)
    createTask(setTask, `${title}2`)
    setTask(tasks => expect(tasks[1].title).toBe(`${title}2`))
  })

  it("should give the second task the proper id.", () => {
    const setTask = getMockStateSetter([])
    const title = 'title'
    createTask(setTask, `${title}1`)
    createTask(setTask, `${title}2`)
    setTask(tasks => expect(tasks[1].id).toBe(2))
  })
})