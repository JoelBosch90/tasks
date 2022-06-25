import { useState } from 'react'

// Import functions.
import getLocalProp from '../getLocalProp'
import setLocalProp from '../setLocalProp'

/**
 *  Custom hook that acts juse like the useState hook, except it stores all
 *  changes to localStorage and fetches changes from localStorage on
 *  initialization.
 *  @param    {string}  name          Name of the state.
 *  @param    {any}     defaultValue  Default value for this state.
 *  @returns  {array}
 */
export default function useLocalState(name, defaultValue) {

  // Get the initial value from local storage if we can. Otherwise we can use
  // the given default.
  const initial = getLocalProp(name) || defaultValue

  // First use the React hook to get the state variable and setter function.
  const [state, setState] = useState(initial)

  // Use our saveLocalState function to make sure we always save state locally.
  return [state, update => {

    // First set the state using the setter function.
    setState(oldState => {
      
      // Note that the setState hook that we're mimicking accepts either a
      // callback function or the value of the new state. We want to construct
      // the new state from either.
      const newState = typeof update === 'function' ? update(oldState) : update

      // Next, store the new state.
      setLocalProp(name, newState)

      // Then return it to the setState hook.
      return newState
    })
  }]
}