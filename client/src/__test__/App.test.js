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
    expect(screen.queryByText(newTaskName)).not.toBeNull()
  })
  
  it("should store a new task in localStorage.", () => {})
  it("should display tasks from localStorage.", () => {})
  it("should allow for removing a task.", () => {})
  it("should allow for updating a task's title.", () => {})
  it("should allow for updating a task's completed status.", () => {})
})