/**
 *  A function that mocks a useState setter function for testing purposes.
 *  
 *  @returns  {Function}
 */
const getMockStateSetter = (state = '') => {
  
  // Let the user provide a callback to update the state, and provide the state
  // as an argument for the function.
  return (callback) => { state = callback(state) }
}

export default getMockStateSetter
