/**
 *  Helper function to set a property on storage if we can.
 *  @param    {string}  name
 *  @param    {any}     value
 */
export default function(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value)) 
}
