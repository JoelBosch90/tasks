/**
 *  Helper function to set a property on storage if we can.
 *  @param    {string}  name
 *  @param    {any}     value
 */
const setLocalProp = (name, value) => void window.localStorage.setItem(name, JSON.stringify(value))

export default setLocalProp