// addNumbers.test.js
// Import the addNumbers function from the source file
const addNumbers = require('./addNumbers');

// Test cases using Jest
describe('addNumbers', () => {
    // Test case 1: Adding two positive numbers
    test('should return the sum of two positive numbers', () => {
        const result = addNumbers(5, 10);
        expect(result).toBe(15);
    });

    // Test case 2: Adding a positive and a negative number
    test('should return the sum of a positive and a negative number', () => {
        const result = addNumbers(5, -10);
        expect(result).toBe(-5);
    });

    // Test case 3: Adding two negative numbers
    test('should return the sum of two negative numbers', () => {
        const result = addNumbers(-5, -10);
        expect(result).toBe(-15);
    });

    // Additional test cases can be added as needed

      // Test case 1: Adding positive numbers
      test('adds 1 + 2 to equal 3', () => {
        expect(addNumbers(1, 2)).toBe(3);
    });

    // Test case 2: Adding negative numbers
    test('adds -1 + -2 to equal -3', () => {
        expect(addNumbers(-1, -2)).toBe(-3);
    });

    // Test case 3: Adding a number to zero
    test('adds 5 + 0 to equal 5', () => {
        expect(addNumbers(5, 0)).toBe(5);
    });

    // Test case 4: Adding zero to zero
    test('adds 0 + 0 to equal 0', () => {
        expect(addNumbers(0, 0)).toBe(0);
    });

    // Test case 5: Adding floating point numbers
    test('adds 1.5 + 2.3 to equal 3.8', () => {
        expect(addNumbers(1.5, 2.3)).toBeCloseTo(3.8);
    });
});
