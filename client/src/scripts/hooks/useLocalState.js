// Import React dependencies.
import { useState } from 'react'

// Import functions.
import getLocalProp from '../functions/getLocalProp'
import setLocalProp from '../functions/setLocalProp'

/**
 *  Custom hook that acts juse like the useState hook, except it stores all
 *  changes to localStorage and fetches changes from localStorage on
 *  initialization.
 *  @param    {string}  name          Name of the state.
 *  @param    {any}     defaultValue  Default value for this state.
 *  @returns  {array}
 */
export default function useLocalState(name, defaultValue) {

  // If this state does not yet exist in localStorage, store the default value.
  if (getLocalProp(name) === undefined) setLocalProp(name, defaultValue)

  // First use the React hook to get the state variable and setter function.
  // We use the useState hook because we need it to trigger rerenders when the
  // state is updated.
  // @todo: is there a more efficient way to do this?
  const [state, setState] = useState(getLocalProp(name))

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