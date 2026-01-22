// Example Go file demonstrating basic language features.
package main

import (
	"fmt"
	"strings"
	"sync"
)

// Person represents a person with basic information.
type Person struct {
	Name  string
	Age   int
	Email string
}

// NewPerson creates a new Person instance.
func NewPerson(name string, age int, email string) *Person {
	return &Person{
		Name:  name,
		Age:   age,
		Email: email,
	}
}

// Greet returns a greeting message.
func (p *Person) Greet() string {
	return fmt.Sprintf("Hello, my name is %s and I am %d years old.", p.Name, p.Age)
}

// String implements the Stringer interface.
func (p *Person) String() string {
	email := p.Email
	if email == "" {
		email = "N/A"
	}
	return fmt.Sprintf("Person(name: %s, age: %d, email: %s)", p.Name, p.Age, email)
}

// Greeter interface for types that can greet.
type Greeter interface {
	Greet() string
}

// Fibonacci generates the first n Fibonacci numbers.
func Fibonacci(n int) []int {
	if n <= 0 {
		return []int{}
	}
	if n == 1 {
		return []int{0}
	}

	sequence := make([]int, n)
	sequence[0] = 0
	sequence[1] = 1
	for i := 2; i < n; i++ {
		sequence[i] = sequence[i-1] + sequence[i-2]
	}
	return sequence
}

// ConcurrentCounter demonstrates goroutines and mutexes.
type ConcurrentCounter struct {
	mu    sync.Mutex
	count int
}

// Increment safely increments the counter.
func (c *ConcurrentCounter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count++
}

// Value returns the current count.
func (c *ConcurrentCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}

// processNumbers demonstrates channels and goroutines.
func processNumbers(numbers []int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range numbers {
			out <- n * n
		}
	}()
	return out
}

func main() {
	// Create a person
	person := NewPerson("Alice", 30, "alice@example.com")
	fmt.Println(person.Greet())
	fmt.Println(person)

	// Generate Fibonacci sequence
	fibNumbers := Fibonacci(10)
	fmt.Printf("First 10 Fibonacci numbers: %v\n", fibNumbers)

	// Slice manipulation
	numbers := []int{1, 2, 3, 4, 5}
	squares := make([]int, len(numbers))
	for i, n := range numbers {
		squares[i] = n * n
	}
	fmt.Printf("Squares of 1-5: %v\n", squares)

	// Map example
	fruits := map[string]int{
		"apple":  3,
		"banana": 5,
		"orange": 2,
	}
	for fruit, count := range fruits {
		fmt.Printf("We have %d %s(s)\n", count, fruit)
	}

	// Channel example
	squaresChan := processNumbers([]int{1, 2, 3, 4, 5})
	var results []string
	for sq := range squaresChan {
		results = append(results, fmt.Sprintf("%d", sq))
	}
	fmt.Printf("Squares via channel: %s\n", strings.Join(results, ", "))

	// Concurrent counter example
	counter := &ConcurrentCounter{}
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
	wg.Wait()
	fmt.Printf("Counter value after 100 increments: %d\n", counter.Value())

	// Error handling pattern
	result, err := divide(10, 2)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Printf("Division result: %.2f\n", result)
	}
}

// divide demonstrates error handling.
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("division by zero")
	}
	return a / b, nil
}
