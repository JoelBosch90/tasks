/**
 *  A function that mocks a useState setter function for testing purposes.
 *  @param    {any}     value  The value to set.
 *  @returns  {Function}
 */
export default function(state = '') {
  
  // Let the user provide a callback to update the state, and provide the state
  // as an argument for the function.
  return (callback) => { state = callback(state) }
}
