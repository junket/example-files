// Example Go file showcasing key language features.
package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// Struct with tags
type Person struct {
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Email string `json:"email,omitempty"`
}

// Method on struct
func (p Person) Greet() string {
	return fmt.Sprintf("Hello, my name is %s and I'm %d years old.", p.Name, p.Age)
}

// Interface definition
type Greeter interface {
	Greet() string
}

// Demonstrate interface satisfaction
func SayHello(g Greeter) {
	fmt.Println(g.Greet())
}

// Generics (Go 1.18+)
type Number interface {
	int | int64 | float64
}

func Sum[T Number](numbers []T) T {
	var total T
	for _, n := range numbers {
		total += n
	}
	return total
}

// Generic container
type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(item T) {
	s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	item := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return item, true
}

// Error handling
var ErrDivisionByZero = errors.New("division by zero")

func SafeDivide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, ErrDivisionByZero
	}
	return a / b, nil
}

// Channels and goroutines
func fibonacci(n int, ch chan<- int) {
	a, b := 0, 1
	for i := 0; i < n; i++ {
		ch <- a
		a, b = b, a+b
	}
	close(ch)
}

// Worker pool pattern
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range jobs {
		results <- job * 2
	}
}

// Context for cancellation
func longRunningTask(ctx context.Context) error {
	select {
	case <-time.After(100 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

// Defer, panic, and recover
func safeOperation() (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered from panic: %v", r)
		}
	}()

	// Simulated operation that might panic
	return nil
}

// Closures
func createCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

// Variadic functions
func processItems(prefix string, items ...string) []string {
	result := make([]string, len(items))
	for i, item := range items {
		result[i] = prefix + item
	}
	return result
}

// Maps and slices operations
func processNumbers(numbers []int) map[string][]int {
	result := make(map[string][]int)

	// Filter evens
	var evens []int
	for _, n := range numbers {
		if n%2 == 0 {
			evens = append(evens, n)
		}
	}
	result["evens"] = evens

	// Map to squared
	squared := make([]int, len(numbers))
	for i, n := range numbers {
		squared[i] = n * n
	}
	result["squared"] = squared

	// Doubled
	doubled := make([]int, len(numbers))
	for i, n := range numbers {
		doubled[i] = n * 2
	}
	result["doubled"] = doubled

	return result
}

// Type switch
func describe(i interface{}) string {
	switch v := i.(type) {
	case int:
		return fmt.Sprintf("integer: %d", v)
	case string:
		return fmt.Sprintf("string: %s", v)
	case bool:
		return fmt.Sprintf("boolean: %t", v)
	default:
		return fmt.Sprintf("unknown type: %T", v)
	}
}

func main() {
	// Struct and methods
	person := Person{Name: "Alice", Age: 30, Email: "alice@example.com"}
	fmt.Println(person.Greet())
	SayHello(person)

	// Generics
	ints := []int{1, 2, 3, 4, 5}
	fmt.Printf("Sum of ints: %d\n", Sum(ints))

	floats := []float64{1.5, 2.5, 3.5}
	fmt.Printf("Sum of floats: %.1f\n", Sum(floats))

	// Generic stack
	stack := &Stack[string]{}
	stack.Push("first")
	stack.Push("second")
	if item, ok := stack.Pop(); ok {
		fmt.Printf("Popped: %s\n", item)
	}

	// Error handling
	result, err := SafeDivide(10, 2)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Printf("10 / 2 = %.1f\n", result)
	}

	// Channels and goroutines
	ch := make(chan int, 10)
	go fibonacci(10, ch)
	var fibList []int
	for n := range ch {
		fibList = append(fibList, n)
	}
	fmt.Printf("Fibonacci: %v\n", fibList)

	// Worker pool
	jobs := make(chan int, 5)
	results := make(chan int, 5)
	var wg sync.WaitGroup

	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	go func() {
		wg.Wait()
		close(results)
	}()

	var workerResults []int
	for r := range results {
		workerResults = append(workerResults, r)
	}
	fmt.Printf("Worker results: %v\n", workerResults)

	// Context
	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()
	if err := longRunningTask(ctx); err != nil {
		fmt.Printf("Task error: %v\n", err)
	} else {
		fmt.Println("Task completed successfully")
	}

	// Closures
	counter := createCounter()
	fmt.Printf("Counter: %d, %d, %d\n", counter(), counter(), counter())

	// Variadic functions
	items := processItems("item_", "a", "b", "c")
	fmt.Printf("Items: %v\n", items)

	// Maps and slices
	processed := processNumbers([]int{1, 2, 3, 4, 5})
	fmt.Printf("Processed: %v\n", processed)

	// Type switch
	fmt.Println(describe(42))
	fmt.Println(describe("hello"))
	fmt.Println(describe(true))
}
