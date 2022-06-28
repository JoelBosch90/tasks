// Import the function to test.
import updateTask from './updateTask';

// Get necessary mocking functions.
import getMockStateSetter from '../mock/getMockStateSetter';

describe("The remove task function", () => {
  it("should be able to update a task's title when there is only one.", () => {
    const id = 1
    const title = 'title'
    const setTask = getMockStateSetter([{ id, title }])
    updateTask(setTask, id, { title: `new${title}`})
    setTask(tasks => expect(tasks[0].title).toBe(`new${title}`))
  })

  it("should be able to update a task's title when there are multiple.", () => {
    const title = 'title'
    const setTask = getMockStateSetter([{ id: 1, title: `${title}1` }, { id: 2, title: `${title}2` }, { id: 3, title: `${title}3` }, { id: 4, title: `${title}4` }])
    updateTask(setTask, 2, { title: `new${title}`})
    setTask(tasks => expect(tasks[1].title).toBe(`new${title}`))
  })

  it("should not be able to update a task's id.", () => {
    const setTask = getMockStateSetter([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
    updateTask(setTask, 2, { id: 3 })
    setTask(tasks => expect(tasks[1].id).toBe(2))
  })
})