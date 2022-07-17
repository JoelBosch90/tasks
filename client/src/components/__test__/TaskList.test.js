// Import React dependencies.
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Get necessary mocking functions.
import getMockStateSetter from '../../scripts/functions/mock/getMockStateSetter';
import updateTask from '../../scripts/functions/tasks/updateTask'
import removeTask from '../../scripts/functions/tasks/removeTask'

// Import the component to test.
import TaskList from '../TaskList'

describe("The TaskList component", () => {
  it("should work when there are no tasks.", () => {

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter([])
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        update={update}
        remove={remove}
      />
    )
    
    // Make sure that the tasks are not shown by querying for checkboxes.
    expect(() => screen.getByRole('checkbox', { name: 'Task completed' })).toThrow()
    
    // Make sure that the tasks are not shown by querying for remove buttons.
    expect(() => screen.getByRole('button', { name: 'Remove' })).toThrow()
  })

  it("should display all task titles.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()
  })

  it("should allow the user to remove one tasks.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find remove buttons.
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' })

    // Get a random index of a task to remove.
    const taskIndex = Math.floor(seed * tasks.length);

    // Simulate a click on the third button.
    userEvent.click(removeButtons[taskIndex])

    // Wait for any animations to complete. This shouldn't take too long.
    setTimeout(() => {

      // Test that the task is no longer displayed.
      expect(screen.queryByText(tasks[taskIndex].title)).toBeNull()
    }, 500)

    // Check that the task was also removed in the state.
    setTasks(updated => expect(updated.length).toBe(tasks.length - 1))
  })

  it("should allow the user to remove all tasks.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find remove buttons.
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' })

    // Simulate clicks on all of the remove buttons.
    for (const removeButton of removeButtons) userEvent.click(removeButton)

    // Wait for any animations to complete. This shouldn't take too long.
    setTimeout(() => {

      // Test that the tasks are no longer displayed.
      for (const task of tasks) expect(screen.queryByText(task.title)).toBeNull()
    }, 500)

    // Check that the tasks were also removed in the state.
    setTasks(updated => expect(updated.length).toBe(0))
  })

  it("should allow the user to check and uncheck one task.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find all checkboxes.
    const checkboxes = screen.getAllByRole('checkbox', { name: 'Task completed' })

    // Get a random index of a task to check/uncheck.
    const taskIndex = Math.floor(seed * tasks.length);

    // Simulate a click on one checkbox.
    userEvent.click(checkboxes[taskIndex])

    // Check that this task is now marked as completed.
    setTasks(updated => {
      expect(updated[taskIndex].done).toBe(true)

      // Make sure we don't change the list of tasks.
      return updated
    })

    // Wait for any animations to complete. This shouldn't take too long.
    setTimeout(() => {

      // Simulate a click on the same checkbox again.
      userEvent.click(checkboxes[taskIndex])

      // Check that this task is now marked as uncompleted again.
      setTasks(updated => {
        expect(updated[taskIndex].done).toBe(false)
      })
    }, 500)
  })

  it("should allow the user to check and uncheck all tasks.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find all checkboxes.
    const checkboxes = screen.getAllByRole('checkbox', { name: 'Task completed' })

    // Simulate clicks on all of the checkboxes.
    for (const checkbox of checkboxes) userEvent.click(checkbox)

    // Check that all tasks are marked as completed.
    setTasks(updated => {
      for (const task of updated) expect(task.done).toBe(true)

      // Make sure we don't change the list of tasks.
      return updated
    })

    // Wait for any animations to complete. This shouldn't take too long.
    setTimeout(() => {

      // Simulate clicks on all of the checkboxes again.
      for (const checkbox of checkboxes) userEvent.click(checkbox)

      // Check that all tasks are marked as uncompleted again.
      setTasks(updated => {
        for (const task of updated) expect(task.done).toBe(false)
      })
    }, 500)
  })
  
  it("should allow the user to edit the title for one task.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find the edit buttons.
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })

    // We'll add a short string to each task's title.
    const titleUpdate = 'extra'

    // Get a random index of a task to change the title for.
    const taskIndex = Math.floor(seed * tasks.length);

    // Get the edit button for this task.
    const editButton = editButtons[taskIndex]

    // Get the corresponding task.
    const task = tasks[taskIndex]

    // Simulate a click on the edit button.
    userEvent.click(editButton)

    // Check that we can find an input field with the current title that
    // corresponds to this task prefilled.
    const input = screen.getByDisplayValue(task.title)

    // Update the title.
    userEvent.type(input, `${titleUpdate}{enter}`)
    
    // Wait for any animations to complete. This shouldn't take too long.
    setTimeout(() => {

      // The input field should now be gone.
      expect(input).not.toBeVisible()

      // We should now see the new title.
      expect(screen.queryByText(`${task.title}${titleUpdate}`)).not.toBeNull()
    }, 500)
    
    // Check that the status of all tasks has updated.
    setTasks(updated => {
      expect(updated[taskIndex].title).toContain(titleUpdate)
    })
  })
  
  it("should allow the user to edit the title for all tasks.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create a list of tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Create mock functions to update and remove tasks.
    const setTasks = getMockStateSetter(tasks)
    const update = (id, update) => void updateTask(setTasks, id, update)
    const remove = (id) => void removeTask(setTasks, id)
    
    // Render the test component.
    render(
      <TaskList
        tasks={tasks}
        update={update}
        remove={remove}
      />
    )

    // Test that all tasks have their titles displayed.
    for (const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()

    // Find the edit buttons.
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })

    // We'll add a short string to each task's title.
    const titleUpdate = 'extra'

    // Loop through all edit buttons.
    editButtons.forEach((editButton, index) => {

      // Get the corresponding task.
      const task = tasks[index]

      // Simulate a click on the edit button.
      userEvent.click(editButton)

      // Check that we can find an input field with the current title that
      // corresponds to this task prefilled.
      const input = screen.getByDisplayValue(task.title)

      // Update the title.
      userEvent.type(input, `${titleUpdate}{enter}`)
      
      // Wait for any animations to complete. This shouldn't take too long.
      setTimeout(() => {

        // The input field should now be gone.
        expect(input).not.toBeVisible()

        // We should now see the new title.
        expect(screen.queryByText(`${task.title}${titleUpdate}`)).not.toBeNull()
      }, 500)
    })
    
    // Check that the status of all tasks has updated.
    setTasks(updated => {
      for (const task of updated) expect(task.title).toContain(titleUpdate)
    })
  })
})
