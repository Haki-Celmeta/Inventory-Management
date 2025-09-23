
/**
 * Capitalizes the first character of a string, it leaves the rest as it is.
 * @param {string} s - String to capitalize
 * @returns {string} String with first character uppercase
 */
export const upperFirst = (s) => {
    return `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`
}

/**
 * Capitalizes the first letter of each word in a string, it leaves the rest of words as it are.
 * @param {string} s - String to capitalize
 * @returns {string} String with each word capitalized
 */
export const capitalizeEachWord = (s) => {
    if(!s) return ''
    return s
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Returns CSS variable for extra light color variant.
 * @param {string} c - Color name (defaults to 'green' if invalid)
 * @returns {string} CSS variable string
 */
export const extraLightColor = (c) => {
    if(typeof c !== 'string') return 'var(--extra-light-green)'
    if(!c) return 'var(--extra-light-green)'
    return `var(--extra-light-${c})`
}

/**
 * Returns CSS variable for light color variant.
 * @param {string} c - Color name (defaults to 'green' if invalid)
 * @returns {string} CSS variable string
 */
export const lightColor = (c) => {
    if(typeof c !== 'string') return 'var(--light-green)'
    if(!c) return `var(--light-green)`;
    return `var(--light-${c})`
}

/**
 * Returns CSS variable for medium color variant.
 * @param {string} c - Color name (defaults to 'green' if invalid)
 * @returns {string} CSS variable string
 */
export const mediumColor = (c) => {
    if(typeof c !== 'string') return 'var(--medium-green)'
    if(!c) return `var(--medium-green)`
    return `var(--medium-${c})`
}

/**
 * Returns CSS variable for dark color variant.
 * @param {string} c - Color name (defaults to 'green' if invalid)
 * @returns {string} CSS variable string
 */
export const darkColor = (c) => {
    if(typeof c !== 'string') return 'var(--dark-green)'
    if(!c) return `var(--dark-green)`
    return `var(--dark-${c})`
}

/**
 * Given an array it converts the element in object field with empty array as value
 * @param {array} arr - Array to convert
 * @returns {Object} The converted object
 */
export const convertArrayToObject = (arr) => {
    const obj = {}

    for(let i = 0; i < arr.length; i++) {
        obj[arr[i]] = []
    }

    return obj
}

/**
 * Converts object keys to elements in an array
 * @param {Object} obj - The object to be converted
 * @returns {Array} The converted array
 */
export const convertObjectToArray = (obj) => {
    const arr = []

    for(let key in obj) {
        arr.push(key)
    }

    return arr
}