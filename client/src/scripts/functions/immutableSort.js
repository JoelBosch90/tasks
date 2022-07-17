/**
 *  A function that sorts an array just like Array.sort() does, except it
 *  doesn't mutate the original array but returns a new array.

 *  @param    {Array}     array   The array to sort.
 *  @param    {Function}  method  A function that can compare two elements.
 *  @returns  {Array}
 */
export default function(array, method) {

  // If we have something other than an array, simply return the original value.
  if (!Array.isArray(array)) return array

  // If we seem to have a valid sorting method, try to use that function to sort
  // the array.
  if (method instanceof Function) return [...array].sort(method)

  // Otherwise, we default to regular sorting.
  return [...array].sort()
}
