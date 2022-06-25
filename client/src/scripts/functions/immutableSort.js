/**
 *  A function that sorts an array just like Array.sort() does, except it
 *  doesn't mutate the original array but returns a new array.

 *  @param    {Array}     array   The array to sort.
 *  @param    {Function}  method  A function that can compare two elements.
 *  @returns  {Array}
 */
const immutableSort = (array = [], method) => {

  // Clone the array.
  const sorted = [...array]

  // Return the sorted array.
  return sorted.sort(method)
}

export default immutableSort
