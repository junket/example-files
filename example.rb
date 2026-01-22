#!/usr/bin/env ruby
# frozen_string_literal: true

# Example Ruby file showcasing key language features.

# Classes with attr_accessor and initialize
class Person
  attr_accessor :name, :age
  attr_reader :email

  def initialize(name, age, email = nil)
    @name = name
    @age = age
    @email = email
  end

  def greet
    "Hello, my name is #{name} and I'm #{age} years old."
  end

  def to_s
    "Person(name: #{name}, age: #{age}, email: #{email || 'N/A'})"
  end
end

# Modules and mixins
module Greetable
  def say_hello
    "Hello from #{self.class}!"
  end

  def say_goodbye
    "Goodbye from #{self.class}!"
  end
end

class Robot
  include Greetable

  attr_reader :model

  def initialize(model)
    @model = model
  end
end

# Blocks, Procs, and Lambdas
def with_timing
  start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  result = yield
  elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
  { result: result, elapsed: elapsed }
end

# Enumerable methods and blocks
def process_numbers(numbers)
  {
    squared: numbers.map { |n| n**2 },
    evens: numbers.select(&:even?),
    total: numbers.reduce(0, :+),
    doubled: numbers.map { |n| n * 2 }
  }
end

# Symbols and hashes
def create_config(**options)
  defaults = {
    host: 'localhost',
    port: 8080,
    debug: false
  }
  defaults.merge(options)
end

# Method chaining and fluent interface
class QueryBuilder
  def initialize
    @conditions = []
    @order = nil
    @limit = nil
  end

  def where(condition)
    @conditions << condition
    self
  end

  def order_by(field)
    @order = field
    self
  end

  def limit(n)
    @limit = n
    self
  end

  def to_query
    query = "SELECT * FROM table"
    query += " WHERE #{@conditions.join(' AND ')}" unless @conditions.empty?
    query += " ORDER BY #{@order}" if @order
    query += " LIMIT #{@limit}" if @limit
    query
  end
end

# Pattern matching (Ruby 3.0+)
def handle_response(response)
  case response
  in { status: 200, body: body }
    "Success: #{body}"
  in { status: 404 }
    "Not found"
  in { status: status } if status >= 500
    "Server error: #{status}"
  else
    "Unknown response"
  end
end

# Struct for simple data structures
Point = Struct.new(:x, :y) do
  def distance_to(other)
    Math.sqrt((x - other.x)**2 + (y - other.y)**2)
  end
end

# Fibonacci using lazy enumeration
fibonacci = Enumerator.new do |yielder|
  a, b = 0, 1
  loop do
    yielder << a
    a, b = b, a + b
  end
end

# Exception handling
def safe_divide(a, b)
  raise ArgumentError, 'Cannot divide by zero' if b.zero?

  a.to_f / b
rescue ArgumentError => e
  puts "Error: #{e.message}"
  nil
end

# Main execution
if __FILE__ == $PROGRAM_NAME
  # Demo the features
  person = Person.new('Alice', 30, 'alice@example.com')
  puts person.greet
  puts person

  robot = Robot.new('R2-D2')
  puts robot.say_hello

  timing = with_timing { sleep(0.01); 42 }
  puts "Result: #{timing[:result]}, Elapsed: #{timing[:elapsed].round(4)}s"

  numbers = [1, 2, 3, 4, 5]
  puts "Processed: #{process_numbers(numbers)}"

  config = create_config(port: 3000, debug: true)
  puts "Config: #{config}"

  query = QueryBuilder.new
                      .where('age > 18')
                      .where('active = true')
                      .order_by('name')
                      .limit(10)
                      .to_query
  puts "Query: #{query}"

  puts handle_response({ status: 200, body: 'OK' })

  p1 = Point.new(0, 0)
  p2 = Point.new(3, 4)
  puts "Distance: #{p1.distance_to(p2)}"

  fib_list = fibonacci.take(10).to_a
  puts "Fibonacci: #{fib_list}"

  safe_divide(10, 0)
  puts "Safe divide result: #{safe_divide(10, 2)}"
end
