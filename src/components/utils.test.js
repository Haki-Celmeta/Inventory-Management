import '@testing-library/jest-dom';
import {
    upperFirst,
    capitalizeEachWord,
    mediumColor,
    lightColor,
    extraLightColor,
    darkColor
} from "./utils.js";

// Tests for upperFirst function
describe('upperFirst', () => {
    it('should capitalize first letter in a word', () => {
        expect(upperFirst('word')).toBe('Word');
    })

    it('should capitalize first letter in a sentence', () => {
        expect(upperFirst('this is a big statement')).toBe('This is a big statement');
    })

    it('should capitalize first letter and it does not change others', () => {
        expect(upperFirst('tHis is a BIg Statement')).toBe('THis is a BIg Statement');
    })

    it('should handle empty string', () => {
        expect(upperFirst('')).toBe('')
    })

    it('should handle strings starting with special characters', () => {
        expect(upperFirst('-hello')).toBe('-hello')
    })

    it('should handle single uppercase character', () => {
        expect(upperFirst('A')).toBe('A')
    })

    it('should handle strings starting with numbers', () => {
        expect(upperFirst('123hello')).toBe('123hello')
    })
})

// Test for capitalizeEachWord function
describe('capitalizeEachWord', () => {
    it('should capitalize each word in a sentence', () => {
        expect(capitalizeEachWord('hello world test')).toBe('Hello World Test')
    })

    it('should handle single word', () => {
        expect(capitalizeEachWord('hello')).toBe('Hello')
    })

    it('should convert all uppercase to proper case', () => {
        expect(capitalizeEachWord('HELLO WORLD TEST')).toBe('Hello World Test')
    })

    it('should handle mixed case strings', () => {
        expect(capitalizeEachWord('hELLo WoRLd tESt')).toBe('Hello World Test')
    })

    it('should return empty string for null input', () => {
        expect(capitalizeEachWord(null)).toBe('')
    })

    it('should return empty string for undefined input', () => {
        expect(capitalizeEachWord(undefined)).toBe('')
    })

    it('should return empty string for empty string input', () => {
        expect(capitalizeEachWord('')).toBe('')
    })

    it('should handle multiple spaces between words', () => {
        expect(capitalizeEachWord('hello    world    test')).toBe('Hello    World    Test')
    })

    it('should handle leading spaces', () => {
        expect(capitalizeEachWord('  hello world')).toBe('  Hello World')
    })

    it('should handle single character words', () => {
        expect(capitalizeEachWord('a b c d')).toBe('A B C D')
    })

    it('should handle words starting with numbers', () => {
        expect(capitalizeEachWord('123hello 456world')).toBe('123hello 456world')
    })

    it('should handle special characters in words', () => {
        expect(capitalizeEachWord('hello-world test_case')).toBe('Hello-world Test_case')
    })
})

// Tests for extraLightColor function
describe('extraLightColor', () => {
    it('should return green color', () => {
        expect(extraLightColor('green')).toBe('var(--extra-light-green)')
    })

    it('should return green red', () => {
        expect(extraLightColor('red')).toBe('var(--extra-light-red)')
    })

    it('should return multiple word', () => {
        expect(extraLightColor('redBlueGreen')).toBe('var(--extra-light-redBlueGreen)')
    })

    it('should handle undefined and null', () => {
        expect(extraLightColor(null)).toBe('var(--extra-light-green)')
        expect(extraLightColor(undefined)).toBe('var(--extra-light-green)')
    })

    it('should handle empty string', () => {
        expect(extraLightColor('')).toBe('var(--extra-light-green)')
    })

    it('should handle boolean and numbers', () => {
        expect(extraLightColor(123)).toBe('var(--extra-light-green)')
        expect(extraLightColor(false)).toBe('var(--extra-light-green)')
        expect(extraLightColor(true)).toBe('var(--extra-light-green)')
    })
})

// Tests for lightColor function
describe('lightColor', () => {
    it('should return green color', () => {
        expect(lightColor('green')).toBe('var(--light-green)')
    })

    it('should return green red', () => {
        expect(lightColor('red')).toBe('var(--light-red)')
    })

    it('should return multiple word', () => {
        expect(lightColor('redBlueGreen')).toBe('var(--light-redBlueGreen)')
    })

    it('should handle undefined and null', () => {
        expect(lightColor(null)).toBe('var(--light-green)')
        expect(lightColor(undefined)).toBe('var(--light-green)')
    })

    it('should handle empty string', () => {
        expect(lightColor('')).toBe('var(--light-green)')
    })

    it('should handle boolean and numbers', () => {
        expect(mediumColor(123)).toBe('var(--medium-green)')
        expect(mediumColor(false)).toBe('var(--medium-green)')
        expect(mediumColor(true)).toBe('var(--medium-green)')
    })
})

// Tests for mediumColor function
describe('mediumColor', () => {
    it('should return green color', () => {
        expect(mediumColor('green')).toBe('var(--medium-green)')
    })

    it('should return green red', () => {
        expect(mediumColor('red')).toBe('var(--medium-red)')
    })

    it('should return multiple word', () => {
        expect(mediumColor('redBlueGreen')).toBe('var(--medium-redBlueGreen)')
    })

    it('should handle undefined and null', () => {
        expect(mediumColor(null)).toBe('var(--medium-green)')
        expect(mediumColor(undefined)).toBe('var(--medium-green)')
    })

    it('should handle empty string', () => {
        expect(mediumColor('')).toBe('var(--medium-green)')
    })

    it('should handle boolean and numbers', () => {
        expect(mediumColor(123)).toBe('var(--medium-green)')
        expect(mediumColor(false)).toBe('var(--medium-green)')
        expect(mediumColor(true)).toBe('var(--medium-green)')
    })
})

// Tests for darkColor function
describe('darkColor', () => {
    it('should return green color', () => {
        expect(darkColor('green')).toBe('var(--dark-green)')
    })

    it('should return green red', () => {
        expect(darkColor('red')).toBe('var(--dark-red)')
    })

    it('should return multiple word', () => {
        expect(darkColor('redBlueGreen')).toBe('var(--dark-redBlueGreen)')
    })

    it('should handle undefined and null', () => {
        expect(darkColor(null)).toBe('var(--dark-green)')
        expect(darkColor(undefined)).toBe('var(--dark-green)')
    })

    it('should handle empty string', () => {
        expect(darkColor('')).toBe('var(--dark-green)')
    })

    it('should handle boolean and numbers', () => {
        expect(darkColor(123)).toBe('var(--dark-green)')
        expect(darkColor(false)).toBe('var(--dark-green)')
        expect(darkColor(true)).toBe('var(--dark-green)')
    })
})