// Import React dependencies.
import { useEffect } from 'react'
import { render } from '@testing-library/react'

// Mock the local storage.
import mockLocalStorage from '../../functions/mock/mockLocalStorage'
Object.defineProperty(window, 'localStorage', { value: new mockLocalStorage() })

// Import the function to test.
import useLocalState from '../useLocalState'

// Create a constant to use as the component ID.
const COMPONENTID = 'test-component'

/**
 *  A custom functional component to help test the hook.
 *  @param    {Object}
 *    @property  {String}    name             The name of the localStorage prop.
 *    @property  {String}    defaultValue     The name of the default value.
 *    @property  {String}    setValue         The value to set.
 *    @property  {Function}  setValueFunction The function to set a new  value. 
 *  @returns  {JSX.Element}
 */
const TestComponent = ({ name, defaultValue, setValue, setValueFunction }) => {

  // Use the test hook, and get the name and value from the props.
  const [state, setState] = useLocalState(name, defaultValue)

  // Pick the setter function from the props. We use useEffect to make sure that
  // we don't render this unnecessarily.
  useEffect(() => { if (setValue) setState(setValue) }, [setValue])
  useEffect(() => { if (setValueFunction) setState(setValueFunction)}, [setValueFunction])

  // Render the component.
  return <p data-testid={COMPONENTID}>{state}</p>
}

describe("The use local state hook", () => {
  it("should set the default value in the component.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Use random values for the name and value so that we can be sure that
    // they're set by this test case and not by another.
    const randomValue = Math.random()
    const [name, defaultValue] = [`${randomValue}name`, `${randomValue}value`]

    // Render the component with the generated values.
    const { getByTestId } = render(<TestComponent name={name} defaultValue={defaultValue} />)

    // Test that the default value is used in the component render.
    expect(getByTestId(COMPONENTID)).toHaveTextContent(defaultValue)
  })

  it("should save a the default value in localStorage.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Use random values for the name and value so that we can be sure that
    // they're set by this test case and not by another.
    const randomValue = Math.random()
    const [name, defaultValue] = [`${randomValue}name`, `${randomValue}default`, `${randomValue}value`]

    // Render the component with the generated values.
    render(<TestComponent name={name} defaultValue={defaultValue} />)

    // Test that the value is set in localStorage.
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(defaultValue))
  })

  it("should save a new value to localStorage by passing that value.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Use random values for the name and value so that we can be sure that
    // they're set by this test case and not by another.
    const randomValue = Math.random()
    const [name, defaultValue, newValue] = [`${randomValue}name`, `${randomValue}default`, `${randomValue}value`]

    // Render the component with the generated values.
    render(<TestComponent name={name} defaultValue={defaultValue} setValue={newValue} />)

    // Test that the value is set in localStorage.
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(newValue))
  })

  it("should save a new value to localStorage by passing a callback.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Use random values for the name and value so that we can be sure that
    // they're set by this test case and not by another.
    const randomValue = Math.random()
    const [name, defaultValue, newValue] = [`${randomValue}name`, `${randomValue}default`, `${randomValue}value`]

    /**
     *  Define a callback that will check that it is passed the correct state
     *  and then updates the value.
     *  @param {*} state 
     *  @returns 
     */
    const updatingCallback = state => {

      // Check that we now find the default value installed as we haven't
      // overwritten it yet.
      expect(state).toEqual(defaultValue)

      // Now overwrite the default value.
      return newValue
    }

    // Render the component with the generated values.
    const { getByTestId } = render(<TestComponent name={name} defaultValue={defaultValue} setValueFunction={updatingCallback} />)

    // Test that the new value we set with the callback is used in the component
    // render.
    expect(getByTestId(COMPONENTID)).toHaveTextContent(newValue)

    // Test that the value is set in localStorage.
    expect(window.localStorage.hasOwnProperty(name)).toEqual(true)
    expect(window.localStorage.getItem(name)).toEqual(JSON.stringify(newValue))
  })
  
  it("should pull from localStorage.", () => {

    // Make sure that we start with a clear local storage.
    window.localStorage.clear()

    // Use random values for the name and value so that we can be sure that
    // they're set by this test case and not by another.
    const randomValue = Math.random()
    const [name, defaultValue, newValue] = [`${randomValue}name`, `${randomValue}default`, `${randomValue}value`]

    // Set the new value in localStorage.
    window.localStorage.setItem(name, JSON.stringify(newValue))

    // Render the component with the generated values, but don't pass the new
    // value.
    const { getByTestId } = render(<TestComponent name={name} defaultValue={defaultValue} />)

    // Test that the value from localStorage is used in the component render.
    expect(getByTestId(COMPONENTID)).toHaveTextContent(newValue)
  })
})