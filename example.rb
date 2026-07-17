#!/usr/bin/env ruby
# frozen_string_literal: true

# Example Ruby file demonstrating basic language features.

# A simple Person class
class Person
  attr_accessor :name, :age, :email

  def initialize(name:, age:, email: nil)
    @name = name
    @age = age
    @email = email
  end

  def greet
    "Hello, my name is #{name} and I am #{age} years old."
  end

  def to_s
    "Person(name: #{name}, age: #{age}, email: #{email || 'N/A'})"
  end
end

# Module with utility methods
module MathUtils
  def self.fibonacci(n)
    return [] if n <= 0
    return [0] if n == 1

    sequence = [0, 1]
    sequence << sequence[-1] + sequence[-2] while sequence.length < n
    sequence
  end

  def self.factorial(n)
    return 1 if n <= 1

    (1..n).reduce(:*)
  end
end

# Main execution
def main
  # Create a person
  person = Person.new(name: 'Alice', age: 30, email: 'alice@example.com')
  puts person.greet
  puts person

  # Generate Fibonacci sequence
  fib_numbers = MathUtils.fibonacci(10)
  puts "First 10 Fibonacci numbers: #{fib_numbers}"

  # Calculate factorial
  puts "Factorial of 5: #{MathUtils.factorial(5)}"

  # Array manipulation with blocks
  numbers = [1, 2, 3, 4, 5]
  squares = numbers.map { |x| x**2 }
  puts "Squares of 1-5: #{squares}"

  # Hash example
  fruits = { apple: 3, banana: 5, orange: 2 }
  fruits.each do |fruit, count|
    puts "We have #{count} #{fruit}(s)"
  end

  # Symbol and string example
  greetings = %i[hello hi hey]
  puts "Greetings: #{greetings.map(&:to_s).join(', ')}"
end

main if __FILE__ == $PROGRAM_NAME
