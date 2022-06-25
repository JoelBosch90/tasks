/**
 *  This function is simply JSON.parse, but it doesn't crash on undefined.
 *  @param    {any}   json  The potential JSON object.
 *  @returns  {any}
 */
const safeParse = json => json === 'undefined' ? undefined : JSON.parse(json)

export default safeParse