// Import React dependencies.
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Get necessary mocking functions.
import getMockStateSetter from '../../scripts/functions/mock/getMockStateSetter';

// Import the component to test.
import NewTask from '../NewTask'

describe("The NewTask component", () => {
  it("should create a new task when the create button is clicked.", () => {

    // Set a default value.
    const defaultValue = ''

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Construct a name for the new task.
    const newTaskName = `${Math.random()}title`

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, newTaskName)

    // Get the button that is used to create the new task.
    const button = screen.getByRole('button', { name: 'Create new task' })

    // Make sure that the button is there.
    expect(button).toBeInTheDocument()

    // Simulate a click on the create button.
    userEvent.click(button)

    // Test that the input has now been cleared.
    expect(input).not.toHaveValue(newTaskName)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(newTaskName))
  })
  
  it("should create a new task when the enter key is pressed.", () => {

    // Set a default value.
    const defaultValue = ''

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Construct a name for the new task.
    const newTaskName = `${Math.random()}title`

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `${newTaskName}{enter}`)

    // Test that the input has now been cleared.
    expect(input).not.toHaveValue(newTaskName)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(newTaskName))
  })
  
  it("should not include any leading or trailing spaces whne creating a new task.", () => {

    // Set a default value.
    const defaultValue = ''

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Construct a name for the new task.
    const newTaskName = ` ${Math.random()}title  `

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `${newTaskName}{enter}`)

    // Test that the input has now been cleared.
    expect(input).not.toHaveValue(newTaskName)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(newTaskName.trim()))
  })
  
  it("should not create a new task when a different key is pressed.", () => {

    // Set a default value.
    const defaultValue = ''

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Construct a name for the new task.
    const newTaskName = `${Math.random()}title`

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `${newTaskName}{shift}`)

    // Test that the input has now been cleared.
    expect(input).toHaveValue(newTaskName)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(defaultValue))
  })
  
  it("should not create a new task when there is no input.", () => {

    // Create a random seed so that we create differen test values every time.
    const seed = Math.random()

    // Set a default value.
    const defaultValue = `${seed}defaultValue`

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `{enter}`)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(defaultValue))
  })
  
  it("should not create a new task when the input is only spaces.", () => {

    // Create a random seed so that we create differen test values every time.
    const seed = Math.random()

    // Set a default value.
    const defaultValue = `${seed}defaultValue`

    // Create a mock function to create a new task.
    const setTask = getMockStateSetter(defaultValue)
    const createTask = newTitle => void setTask(() => newTitle)

    // Render the test component.
    render(<NewTask createTask={createTask} />)

    // Get the input field that is used to enter the new task.
    const input = screen.getByRole('textbox', { name: 'New task title' })

    // Make sure that the input is there.
    expect(input).toBeInTheDocument()

    // Enter the new task name in the input field.
    userEvent.type(input, `     {enter}`)

    // Check that the new task name was passed to the createTask function.
    createTask(state => expect(state).toEqual(defaultValue))
  })
})