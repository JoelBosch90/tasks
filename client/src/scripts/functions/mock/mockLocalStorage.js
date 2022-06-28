/**
 *  Create a mock version of the localStorage so that we can verify it's usage
 *  in these tests. This can be useful for testing because Jest does not run in
 *  the browser and thus does not have access to Web API's like localStorage.
 * 
 *  It implements the Storage interface:
 *    https://developer.mozilla.org/en-US/docs/Web/API/Storage
 * 
 *  Note that the behaviour of localStorage is undefined for keys that are not
 *  strings. For that reason, this mock implementation might behave differently 
 *  than the real localStorage for non-string keys.
 * 
 *  To completely mock localStorage, you can add the following code snippet
 *  after importing this class.
 *    ```
 *    Object.defineProperty(window, 'localStorage', {
 *      value: new mockLocalStorage()
 *    })
 *    ```
 */
class mockLocalStorage {

  // We can use a Map to store the data. This lets us set key/value combinations
  // and also keeps a reliable order. We store this as a private property.
  #map = new Map()

  // Wee have to keep this up to date with the map size.
  length = 0;

  /**
   *  Method to get a key at a certain index.
   *  @param    {Number}  index   The index of the key to get.
   *  @returns  {String|null}
   */
  key(index) {

    // Convert the map's keys to an array so that we can access them by index.
    const array = Array.from(this.#map.keys())

    // If we have the key, we return it as a string.
    if (index in array) return String(array[index])

    // Otherwise, we return null to indicate that we don't have the key to
    // comply with the interface.
    return null
  }

  /**
   *  Method to get an item for a specific key.
   *  @param    {String}  keyName   The name of the key to get the value for.
   *  @returns  {String|null}
   */
  getItem(keyName) {

    // Get the value for this key.
    const value = this.#map.get(keyName)

    // The Map will return undefined if the key is not set. To comply with the
    // interface, we return null instead. If we do have a key, we should return
    // it as a string.
    return value ? String(value) : null
  }

  /**
   *  Method to set a value for a specific key.
   *  @param    {String}  keyName   The name of the key to get the value for.
   *  @param    {String}  keyValue  The value to set.
   *  @returns  {undefined}
   */
  setItem(keyName, keyValue) {

    // Set the item on the map.
    this.#map.set(keyName, keyValue)

    // Keep the length up to date.
    this.length = this.#map.size

    // Return undefined to comply with the interface.
    return undefined
  }

  /**
   *  Method to remove a specific key/value pair.
   *  @param    {String}  keyName   The name of the key to remove.
   *  @returns  {undefined}
   */
  removeItem(keyName) {

    // Remove the item from the map.
    this.#map.delete(keyName)
    
    // Keep the length up to date.
    this.length = this.#map.size

    // Return undefined to comply with the interface.
    return undefined
  }

  /**
   *  Method to remove all key/value pairs.
   *  @returns  {undefined}
   */
  clear() {

    // Remove all items from the map.
    this.#map.clear()
    
    // Keep the length up to date.
    this.length = this.#map.size

    // Return undefined to comply with the interface.
    return undefined
  }

  /**
   *  Check if a value was set for a specific key. This method is not in the
   *  Storage interface, but it does work surprisingly well on localStorage, so
   *  we should also mock it here.
   *  @param    {String}    prop    The name of the property to check.
   *  @returns  {Boolean}
   */
  hasOwnProperty(prop) {

    // Check if this key is set on the prop. 
    return this.#map.has(prop)
  }
}

export default mockLocalStorage