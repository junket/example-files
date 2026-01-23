/**
 * Example TypeScript file demonstrating basic language features.
 */

// Interface definition
interface Person {
  name: string;
  age: number;
  email?: string;
}

// Class implementation
class PersonImpl implements Person {
  constructor(
    public name: string,
    public age: number,
    public email?: string
  ) {}

  greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  toString(): string {
    return `Person(name: ${this.name}, age: ${this.age}, email: ${this.email ?? "N/A"})`;
  }
}

// Generic function
function identity<T>(value: T): T {
  return value;
}

// Async function example
async function fetchData(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 100);
  });
}

// Utility functions
function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence: number[] = [0, 1];
  while (sequence.length < n) {
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  }
  return sequence;
}

// Type alias and union types
type Result<T> = { success: true; data: T } | { success: false; error: string };

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}

// Enum example
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// Main execution
async function main(): Promise<void> {
  // Create a person
  const person = new PersonImpl("Alice", 30, "alice@example.com");
  console.log(person.greet());
  console.log(person.toString());

  // Generate Fibonacci sequence
  const fibNumbers = fibonacci(10);
  console.log(`First 10 Fibonacci numbers: ${fibNumbers.join(", ")}`);

  // Array methods with arrow functions
  const numbers = [1, 2, 3, 4, 5];
  const squares = numbers.map((x) => x ** 2);
  console.log(`Squares of 1-5: ${squares.join(", ")}`);

  // Object destructuring
  const { name, age } = person;
  console.log(`Destructured: ${name}, ${age}`);

  // Using Result type
  const result = divide(10, 2);
  if (result.success) {
    console.log(`Division result: ${result.data}`);
  }

  // Async/await
  const data = await fetchData("https://example.com/api");
  console.log(data);

  // Enum usage
  const favoriteColor: Color = Color.Blue;
  console.log(`Favorite color: ${favoriteColor}`);
}

main().catch(console.error);
