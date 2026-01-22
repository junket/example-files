#!/usr/bin/env python3
"""
Example Python file showcasing key language features.
"""

from dataclasses import dataclass
from typing import Generator, Optional
from functools import reduce
import asyncio


# Type hints and dataclasses
@dataclass
class Person:
    """A simple person class using dataclass decorator."""
    name: str
    age: int
    email: Optional[str] = None

    def greet(self) -> str:
        return f"Hello, my name is {self.name} and I'm {self.age} years old."


# List comprehensions and generators
def fibonacci(n: int) -> Generator[int, None, None]:
    """Generate Fibonacci sequence up to n numbers."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


# Decorators
def memoize(func):
    """A simple memoization decorator."""
    cache = {}

    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper


@memoize
def factorial(n: int) -> int:
    """Calculate factorial with memoization."""
    return 1 if n <= 1 else n * factorial(n - 1)


# Context managers
class Timer:
    """A context manager for timing code blocks."""
    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self

    def __exit__(self, *args):
        import time
        self.elapsed = time.perf_counter() - self.start


# Async/await
async def fetch_data(url: str) -> dict:
    """Simulate async data fetching."""
    await asyncio.sleep(0.1)  # Simulate network delay
    return {"url": url, "status": "success"}


async def main_async():
    """Run multiple async tasks concurrently."""
    urls = ["https://example.com/1", "https://example.com/2"]
    results = await asyncio.gather(*[fetch_data(url) for url in urls])
    return results


# Functional programming features
def process_numbers(numbers: list[int]) -> dict:
    """Demonstrate map, filter, reduce, and comprehensions."""
    squared = list(map(lambda x: x ** 2, numbers))
    evens = list(filter(lambda x: x % 2 == 0, numbers))
    total = reduce(lambda acc, x: acc + x, numbers, 0)
    doubled = [x * 2 for x in numbers]

    return {
        "squared": squared,
        "evens": evens,
        "total": total,
        "doubled": doubled,
    }


# Pattern matching (Python 3.10+)
def handle_command(command: str | tuple) -> str:
    """Demonstrate structural pattern matching."""
    match command:
        case "quit" | "exit":
            return "Goodbye!"
        case ("move", direction):
            return f"Moving {direction}"
        case ("attack", target, damage):
            return f"Attacking {target} for {damage} damage"
        case _:
            return "Unknown command"


if __name__ == "__main__":
    # Demo the features
    person = Person("Alice", 30, "alice@example.com")
    print(person.greet())

    fib_list = list(fibonacci(10))
    print(f"Fibonacci: {fib_list}")

    print(f"Factorial of 10: {factorial(10)}")

    with Timer() as t:
        result = process_numbers([1, 2, 3, 4, 5])
    print(f"Processed in {t.elapsed:.4f}s: {result}")

    print(handle_command(("move", "north")))

    # Run async code
    async_results = asyncio.run(main_async())
    print(f"Async results: {async_results}")
