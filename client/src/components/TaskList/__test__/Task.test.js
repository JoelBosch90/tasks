// Import React dependencies.
import { useState } from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock the local storage.
import mockLocalStorage from '../../../scripts/functions/mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

// Import the component to test.
import Task from '../Task'

/**
 *  A custom functional component to help test the component.
 *  @param    {Object}
 *  @returns  {JSX.Element}
 */
const TestComponent = ({ id, title }) => {

  // By default, the component is not done.
  const done = false

  // Use the test hook, and get the name and value from the props.
  const [task, setTask] = useState({ id, title, done})

  /**
   *  Helper function to update a task both in this component's state and in 
   *  local storage to check in the tests.
   *  @param  {Object}  update 
   */
  const updateTask =  (update) => {
    setTask(state => {

      // Create the new state based on the old state.
      const updated = { ...state, ...update, id: state.id }

      // Also store the new state in local storage for easy checking in tests.
      window.localStorage.setItem(state.id, JSON.stringify(updated))

      // Update the internal task to render the Task component properly.
      return updated
    })
  }

  // Render the Task component.
  return <Task
    title={task.title}
    id={task.id}
    done={task.done}
    update={(updateId, update) => { if (updateId === task.id) updateTask(update) }}
    remove={() => void updateTask({ ...task, removed: true })}
  />
}

describe("The Task component", () => {
  it("should display the proper title.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // We need a title and an id for the test component.
    const title = `${seed}title`
    const id = Math.round(seed * 1000)

    // Render the test component.
    render(
      <TestComponent
        title={title}
        id={id}
      />
    )

    // Test that the title is displayed.
    expect(screen.queryByText(title)).not.toBeNull()
  })
  
  it("should be able to be marked and unmarked.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // We need a title and an id for the test component.
    const title = `${seed}title`
    const id = Math.round(seed * 1000)

    // Render the test component.
    render(
      <TestComponent
        title={title}
        id={id}
      />
    )

    // Get the checkbox that is used to mark the task as completed.
    const checkbox = screen.getByRole('checkbox', { name: 'Task completed' })

    // Make sure that the checkbox is there.
    expect(checkbox).toBeInTheDocument()

    // Test that the checkbox is not checked.
    expect(checkbox).not.toBeChecked()

    // Simulate a click on the checkbox.
    userEvent.click(checkbox)

    // Test that the checkbox is checked.
    expect(checkbox).toBeChecked()

    // Test that the task is marked as completed.
    expect(JSON.parse(window.localStorage.getItem(id)).done).toEqual(true)

    // Simulate another click on the checkbox.
    userEvent.click(checkbox)

    // Test that the checkbox is no longer checked.
    expect(checkbox).not.toBeChecked()

    // Test that the task is no longer marked as completed.
    expect(JSON.parse(window.localStorage.getItem(id)).done).toEqual(false)
  })

  it("should be able to be removed.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // We need a title and an id for the test component.
    const title = `${seed}title`
    const id = Math.round(seed * 1000)

    // Render the test component.
    render(
      <TestComponent
        title={title}
        id={id}
      />
    )

    // Find the remove button.
    const removeButton = screen.getByRole('button', { name: 'Remove' })

    // Make sure that the button is there.
    expect(removeButton).toBeInTheDocument()

    // Simulate a click on the button.
    userEvent.click(removeButton)

    // Test that the task is now marked as removed.
    expect(JSON.parse(window.localStorage.getItem(id)).removed).toEqual(true)
  })

  it("should be able to be update the title using the save button.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // We need a title and an id for the test component.
    const title = `${seed}title`
    const id = Math.round(seed * 1000)

    // Render the test component.
    render(
      <TestComponent
        title={title}
        id={id}
      />
    )

    // Find the edit button.
    const editButton = screen.getByRole('button', { name: 'Edit' })

    // Make sure that the edit button is there.
    expect(editButton).toBeInTheDocument()

    // Test that the initial title is displayed.
    expect(screen.queryByText(title)).not.toBeNull()

    // Simulate a click on the edit button.
    userEvent.click(editButton)

    // Find the edit input.
    const editInput = screen.getByRole('textbox', { name: 'Edit title' })

    // Make sure that the input is there and that it is visible.
    expect(editInput).toBeInTheDocument()
    expect(editInput).toBeVisible()

    // Test that the initial title is displayed.
    expect(editInput).toHaveValue(title)

    // Create a new title.
    const newTitle = `${seed}newTitle`

    // Enter the new title in the edit field.
    userEvent.clear(editInput)
    userEvent.type(editInput, newTitle)

    // Find the save button.
    const saveButton = screen.getByRole('button', { name: 'Save' })

    // Make sure that the save button is there.
    expect(saveButton).toBeInTheDocument()

    // Simulate a click on the save button.
    userEvent.click(saveButton)

    // Test that the new title is displayed.
    expect(screen.queryByText(newTitle)).not.toBeNull()

    // Test that the initial title is no longer displayed.
    expect(screen.queryByText(title)).toBeNull()

    // Test that the task is now updated.
    expect(JSON.parse(window.localStorage.getItem(id)).title).toEqual(newTitle)
  })

  it("should be able to be update the title using the enter key.", () => {

    // Generate a random seed to make sure that every test tests different
    // values.
    const seed = Math.random()

    // We need a title and an id for the test component.
    const title = `${seed}title`
    const id = Math.round(seed * 1000)

    // Render the test component.
    render(
      <TestComponent
        title={title}
        id={id}
      />
    )

    // Find the edit button.
    const editButton = screen.getByRole('button', { name: 'Edit' })

    // Make sure that the edit button is there.
    expect(editButton).toBeInTheDocument()

    // Test that the initial title is displayed.
    expect(screen.queryByText(title)).not.toBeNull()

    // Simulate a click on the edit button.
    userEvent.click(editButton)

    // Find the edit input.
    const editInput = screen.getByRole('textbox', { name: 'Edit title' })

    // Make sure that the input is there and that it is visible.
    expect(editInput).toBeInTheDocument()
    expect(editInput).toBeVisible()

    // Test that the initial title is displayed.
    expect(editInput).toHaveValue(title)

    // Create a new title.
    const newTitle = `${seed}newTitle`

    // Enter the new title in the edit field and press the enter key.
    userEvent.clear(editInput)
    userEvent.type(editInput, `${newTitle}{enter}`)

    // Test that the new title is displayed.
    expect(screen.queryByText(newTitle)).not.toBeNull()

    // Test that the initial title is no longer displayed.
    expect(screen.queryByText(title)).toBeNull()

    // Test that the task is now updated.
    expect(JSON.parse(window.localStorage.getItem(id)).title).toEqual(newTitle)
  })
})