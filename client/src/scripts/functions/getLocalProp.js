// Import functions.
import safeParse from './safeParse'

/**
 *  Keep a memoized version of the local storage so that we don't have to keep
 *  calling the browser API until we see a hard page reload.
 *  @var      {Object}
 */
const memoizedStorage = {}

/**
 *  Helper function to get a property from storage if we can.
 *  @param    {string}  name
 *  @returns  {any}
 */
const getLocalProp = (name) => {

  // Try to get the prop from the memoized storage first.
  if (memoizedStorage.hasOwnProperty(name)) return safeParse(memoizedStorage[name])

  // Try to get the prop from the local storage second.
  if (window.localStorage.getItem(name) !== null) return safeParse(window.localStorage.getItem(name))

  // Default to undefined.
  return undefined
}

export default getLocalProp