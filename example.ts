/**
 * Example TypeScript file showcasing key language features.
 */

// Interfaces and type aliases
interface Person {
  name: string;
  age: number;
  email?: string;
}

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

// Generics
function identity<T>(arg: T): T {
  return arg;
}

// Generic class with constraints
class Container<T extends { id: number }> {
  private items: Map<number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }
}

// Union types and type guards
type StringOrNumber = string | number;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: StringOrNumber): string {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Enums
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500,
}

// Classes with access modifiers and decorators pattern
class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  async get<T>(endpoint: string): Promise<Result<T>> {
    try {
      // Simulated fetch
      const data = { endpoint, baseUrl: this.baseUrl } as unknown as T;
      return { ok: true, value: data };
    } catch (error) {
      return { ok: false, error: error as Error };
    }
  }
}

// Utility types
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, "password">;
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;

// Mapped types
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>;

// Template literal types
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;

// Async/await with proper typing
async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", email: "alice@example.com", password: "***" },
        { id: 2, name: "Bob", email: "bob@example.com", password: "***" },
      ]);
    }, 100);
  });
}

// Discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Decorators (experimental)
function logged(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b;
  }
}

// Higher-order functions with proper typing
function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ExtractArray<T> = T extends (infer U)[] ? U : never;

// Main execution
async function main(): Promise<void> {
  // Demo the features
  const person: Person = { name: "Alice", age: 30 };
  console.log(`Hello, ${person.name}!`);

  const container = new Container<{ id: number; value: string }>();
  container.add({ id: 1, value: "first" });
  container.add({ id: 2, value: "second" });
  console.log("Container items:", container.getAll());

  console.log("Process string:", processValue("hello"));
  console.log("Process number:", processValue(42));

  const client = new ApiClient("https://api.example.com");
  const result = await client.get<{ data: string }>("/users");
  if (result.ok) {
    console.log("API result:", result.value);
  }

  const users = await fetchUsers();
  const publicUsers: PublicUser[] = users.map(({ password, ...rest }) => rest);
  console.log("Public users:", publicUsers);

  const circle: Circle = { kind: "circle", radius: 5 };
  const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
  console.log("Circle area:", calculateArea(circle));
  console.log("Rectangle area:", calculateArea(rectangle));

  const double = createMultiplier(2);
  console.log("Double 5:", double(5));

  const calc = new Calculator();
  console.log("Calculator add:", calc.add(2, 3));
}

main().catch(console.error);
