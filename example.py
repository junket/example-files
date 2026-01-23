#!/usr/bin/env python3
"""Example Python file demonstrating basic language features."""

from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Person:
    """A simple Person class."""
    name: str
    age: int
    email: Optional[str] = None

    def greet(self) -> str:
        """Return a greeting message."""
        return f"Hello, my name is {self.name} and I am {self.age} years old."


def fibonacci(n: int) -> List[int]:
    """Generate the first n Fibonacci numbers."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence


def main() -> None:
    """Main entry point."""
    # Create a person
    person = Person(name="Alice", age=30, email="alice@example.com")
    print(person.greet())
    
    # Generate Fibonacci sequence
    fib_numbers = fibonacci(10)
    print(f"First 10 Fibonacci numbers: {fib_numbers}")
    
    # List comprehension example
    squares = [x**2 for x in range(1, 6)]
    print(f"Squares of 1-5: {squares}")
    
    # Dictionary example
    fruits = {"apple": 3, "banana": 5, "orange": 2}
    for fruit, count in fruits.items():
        print(f"We have {count} {fruit}(s)")


if __name__ == "__main__":
    main()
