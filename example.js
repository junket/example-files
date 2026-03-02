#!/usr/bin/env node
/**
 * Example JavaScript file demonstrating basic language features.
 */

/**
 * A simple Person class.
 */
class Person {
  constructor(name, age, email = null) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  /**
   * Return a greeting message.
   */
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  toString() {
    return `Person(name: ${this.name}, age: ${this.age}, email: ${this.email || 'N/A'})`;
  }
}

/**
 * Generate the first n Fibonacci numbers.
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {number[]} Array of Fibonacci numbers.
 */
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];
  while (sequence.length < n) {
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  }
  return sequence;
}

/**
 * Calculate the factorial of a number.
 * @param {number} n - The number to calculate factorial for.
 * @returns {number} The factorial result.
 */
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Async function demonstrating Promises.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise<string>} A promise that resolves after the delay.
 */
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Waited ${ms}ms`), ms);
  });
}

/**
 * Main entry point.
 */
async function main() {
  // Create a person
  const person = new Person('Alice', 30, 'alice@example.com');
  console.log(person.greet());
  console.log(person.toString());

  // Generate Fibonacci sequence
  const fibNumbers = fibonacci(10);
  console.log(`First 10 Fibonacci numbers: ${fibNumbers.join(', ')}`);

  // Calculate factorial
  console.log(`Factorial of 5: ${factorial(5)}`);

  // Array manipulation with arrow functions
  const numbers = [1, 2, 3, 4, 5];
  const squares = numbers.map((x) => x ** 2);
  console.log(`Squares of 1-5: ${squares.join(', ')}`);

  // Filter and reduce examples
  const evenSquares = squares.filter((x) => x % 2 === 0);
  console.log(`Even squares: ${evenSquares.join(', ')}`);

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  console.log(`Sum of 1-5: ${sum}`);

  // Object example
  const fruits = { apple: 3, banana: 5, orange: 2 };
  for (const [fruit, count] of Object.entries(fruits)) {
    console.log(`We have ${count} ${fruit}(s)`);
  }

  // Destructuring example
  const { apple, banana } = fruits;
  console.log(`Apples: ${apple}, Bananas: ${banana}`);

  // Spread operator example
  const moreFruits = { ...fruits, grape: 4 };
  console.log(`All fruits: ${JSON.stringify(moreFruits)}`);

  // Async/await example
  const result = await delay(10);
  console.log(result);
}

// Run main function
main().catch(console.error);
