// Import React dependencies.
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock the local storage.
import mockLocalStorage from '../scripts/functions/mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

// Import the component to test.
import App from '../App'

describe("The NewTask component", () => {
  it("should display a new task.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Construct a name for the new task.
    const newTaskName = `${seed}title`

    // Render the test component.
    render(<App />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `${newTaskName}{enter}`)

    // Check that this task is now displayed.
    expect(screen.queryByText(newTaskName + 1)).not.toBeNull()
  })
  
  it("should store a new task in localStorage.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Construct a name for the new task.
    const newTaskName = `${seed}title`

    // Render the test component.
    render(<App />)

    // Check that there are no tasks stored to begin with.
    expect(JSON.parse(window.localStorage.getItem('tasks')).length).toBe(0)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `${newTaskName}{enter}`)

    // Confirm that there is one extra task in localStorage now.
    expect(JSON.parse(window.localStorage.getItem('tasks')).length).toBe(1)
  })

  it("should display tasks from localStorage.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Create some example tasks.
    const tasks = [
      { id: 1, title: `${seed}title1`, done: false },
      { id: 2, title: `${seed}title2`, done: false },
      { id: 3, title: `${seed}title3`, done: false },
      { id: 4, title: `${seed}title4`, done: false },
    ]

    // Set some tasks in localStorage.
    window.localStorage.setItem('tasks', JSON.stringify(tasks))

    // Render the test component.
    render(<App />)

    // Check that they're all displayed.
    for(const task of tasks) expect(screen.queryByText(task.title)).not.toBeNull()
  })

  it("should allow for removing a task.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Define how many tasks we'll test editing here.
    const tasksAmount = 4

    // Create some example tasks.
    const titles = Array.from({ length: tasksAmount }, (value, index) => `${seed}title${index}`)

    // Render the test component.
    render(<App />)
    
    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Add all the tasks.
    for(const title of titles) userEvent.type(input, `${title}{enter}`)

    // Check that they're all displayed.
    for(const title of titles) expect(screen.queryByText(title)).not.toBeNull()

    // Get the remove buttons for all tasks.
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' })

    // Loop the buttons to remove each task.
    removeButtons.forEach((removeButton, index) => {

      // Remove the task.
      userEvent.click(removeButton)

      // Wait for any animations to complete. This shouldn't take too long.
      setTimeout(() => {
  
        // Check that the task is no longer displayed.
        expect(screen.queryByText(titles[index])).toBeNull()
      }, 500)

      // Get access to the tasks in local storage.
      const tasks = JSON.parse(window.localStorage.getItem('tasks'))

      // Check that we have one less task in local storage.
      expect(tasks.length).toBe(tasksAmount - (index + 1))
    })
  })

  it("should allow for updating a task's title.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Define how many tasks we'll test editing here.
    const tasksAmount = 4

    // Create some example tasks.
    const titles = Array.from({ length: tasksAmount }, (value, index) => `${seed}title${index}`)

    // Render the test component.
    render(<App />)
    
    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Add all the tasks.
    for(const title of titles) userEvent.type(input, `${title}{enter}`)

    // Check that they're all displayed.
    for(const title of titles) expect(screen.queryByDisplayValue(title)).not.toBeNull()

    // Get the edit buttons for all tasks.
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })

    // Loop the buttons to edit each task.
    editButtons.forEach((editButton, index) => {

      // Get the corresponding title.
      const title = titles[index]

      // Click the edit button.
      userEvent.click(editButton)

      // Check that we can find an input field with the current title that
      // corresponds to this task prefilled.
      const input = screen.getByDisplayValue(title)

      // Create a title with which to update.
      const newTitle = `${seed}newtitle${index}`

      // Update the title.
      userEvent.clear(input)
      userEvent.type(input, `${newTitle}{enter}`)

      // We should no longer be able to find the previous title.
      expect(screen.queryByDisplayValue(title)).toBeNull()

      // We should be able to find the new title.
      expect(screen.queryByDisplayValue(newTitle)).not.toBeNull()

      // Get access to the tasks in local storage.
      const tasks = JSON.parse(window.localStorage.getItem('tasks'))

      // Check that the task is completed.
      expect(tasks[index].title).toBe(newTitle)
    })
  })

  it("should allow for updating a task's completed status.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // Define how many tasks we'll test editing here.
    const tasksAmount = 4

    // Create some example tasks.
    const titles = Array.from({ length: tasksAmount }, (value, index) => `${seed}title${index}`)

    // Render the test component.
    render(<App />)
    
    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Loop through all task titles.
    for(const title of titles) {
      
      // Add a task for each title.
      userEvent.type(input, `${title}{enter}`)

      // Check that the task is displayed.
      expect(screen.queryByDisplayValue(title)).not.toBeNull()
    }
    
    // Get the checkboxes for all tasks.
    const checkboxes = screen.getAllByRole('checkbox', { name: 'Task completed' })

    // Loop the checkboxes to complete each task.
    checkboxes.forEach((checkbox, index) => {

      // Click the edit button.
      userEvent.click(checkbox)

      // Get access to the tasks in local storage.
      const tasks = JSON.parse(window.localStorage.getItem('tasks'))

      // Check that the task is completed.
      expect(tasks[index].done).toBe(true)
    })
  })
})