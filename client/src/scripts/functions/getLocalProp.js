// Import functions.
import safeParse from './safeParse'

/**
 *  Helper function to get a property from storage if we can.
 *  @param    {string}  name
 *  @returns  {any}
 */
export default function(name) {

  // Try to get the prop from the local storage.
  if (window.localStorage.getItem(name) !== null) return safeParse(window.localStorage.getItem(name))

  // Default to undefined.
  return undefined
}
