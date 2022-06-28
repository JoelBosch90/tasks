// Import the function to test.
import mockLocalStorage from './mockLocalStorage'

describe("The mock local storage class", () => {
  it("be able to set and get multiple items.", () => {
    const [key1, value1, key2, value2] = ['key1', 'value1', 'key2', 'value2']
    const storage = new mockLocalStorage()

    // The length should be zero.
    expect(storage.length).toEqual(0)

    // Setting should return undefined.
    expect(storage.setItem(key1, value1)).toBe(undefined)
    expect(storage.setItem(key2, value2)).toBe(undefined)

    // Getting should return the same values.
    expect(storage.getItem(key1)).toEqual(value1)
    expect(storage.getItem(key2)).toEqual(value2)

    // An unknown key should return null.
    expect(storage.getItem('key3')).toEqual(null)

    // We should be able to get the keys in the same order.
    expect(storage.key(0)).toEqual(key1)
    expect(storage.key(1)).toEqual(key2)

    // If the key does not exist, we should get null.
    expect(storage.key(2)).toBe(null)

    // The length should now be 2.
    expect(storage.length).toEqual(2)

    // Removing an item should return undefined.
    expect(storage.removeItem(key2)).toBe(undefined)

    // We should no longer be able to get the removed key.
    expect(storage.getItem(key2)).toBe(null)

    // We should still be able to get the remaining key.
    expect(storage.getItem(key1)).toEqual(value1)

    // The length should now be 1.
    expect(storage.length).toEqual(1)

    // Add a few more items.
    expect(storage.setItem('key4', 'value4')).toEqual(undefined)
    expect(storage.setItem('key5', 'value5')).toEqual(undefined)

    // The length should now be 3.
    expect(storage.length).toEqual(3)

    // Clearing the storage should return undefined.
    expect(storage.clear()).toBe(undefined)

    // The length should now be 0.
    expect(storage.length).toEqual(0)
  })
})