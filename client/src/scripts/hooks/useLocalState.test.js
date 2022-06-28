// Import React dependencies.
import {render, act } from '@testing-library/react'

// Mock the local storage.
import mockLocalStorage from '../functions/mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

// Import the function to test.
import useLocalState from './useLocalState'

// Create a constant to use as the component ID.
const COMPONENTID = 'test-component'

/**
 *  A custom functional component to help test the hook.
 *  @param    {Object}
 *       @property  {String}    name              The name of the localStorage
 *                                                prop.
 *       @property  {String}    value             The name of the default value.
 *       @property  {String}    setValue          The value to set.
 *       @property  {Function}  setValueFunction  The function to set a new
 *                                                value. 
 *  @returns  {JSX.Element}
 */
const TestComponent = ({ name, value, setValue, setValueFunction }) => {

  // Use the test hook, and get the name and value from the props.
  const [state, setState] = useLocalState(name, value)

  // Pick the setter function from the props.
  if (setValue) setState(setValue)
  if (setValueFunction) setState(setValueFunction)

  // Render the component.
  return <p data-testid={COMPONENTID}>{state}</p>
}

describe("The use local state hook", () => {
  // it("should set the default value in the component.", () => {

  //   // Use random values for the name and value so that we can be sure that
  //   // they're set by this test case and not by another.
  //   const randomValue = Math.random().toString()
  //   const [name, value] = [`${randomValue}name`, `${randomValue}value`];

  //   // Render the component with the generated values.
  //   const { getByTestId } = render(<TestComponent name={name} value={value} />)

  //   // Test that the default value is used in the component render.
  //   expect(getByTestId(COMPONENTID)).toHaveTextContent(value)
  // })
  // it("should save a new value in localStorage.", () => {

  //   // Use random values for the name and value so that we can be sure that
  //   // they're set by this test case and not by another.
  //   const randomValue = Math.random().toString()
  //   const [name, defaultValue, newValue] = [`${randomValue}name`, `${randomValue}default`, `${randomValue}value`];

  //   // Render the component with the generated values.
  //   render(<TestComponent name={name} value={defaultValue} setValue={newValue} />)

  //   // Test that the value is set in localStorage.
  //   expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
  //   expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(newValue))
  // })
  // it("should pull from localStorage.", () => {
  //   const value = false
  //   const name = 'test'
  //   setLocalProp(name, value)
  //   expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
  //   expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(value))
  // })
  todo()
})