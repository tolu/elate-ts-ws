// 0. intro
/*
  Superset of JS
  Type Checker and Compiler (e.g. Flow + Babel)
  Structural typing system (duck typing)
  Tools
  - tsconfig.json / tsc
  Types / Definition files
  - consuming and exporting
*/











































// 1. Restricting non nullable types
function trimAndLower(text: string) {
  return text.trim().toLowerCase();
}
console.log(trimAndLower(null));

let txt: string;
txt = 'hey';
txt = null;
txt = undefined;

// 1.0 change tsconfig (strict = true)
// 1.1 non null assertion operator (!)
const container = document.getElementById('flow')!;




























// 2. Control flow based analysis
function trimAndLowerGood(text: string | null | undefined) {
  text;
  if (typeof text === 'string') {
    text;
    return text.trim().toLowerCase();
  }
  text;
  return text;
}
// 2.1 Using ternary operator
// 2.2 Assigning changes type inference
let num: number | undefined;
num = 42;
num;







































// 3. Type guards
const numbers = [0, 1, 2, [3, 4], 5, [6, 7], 8, 9];
function flatten(array: (number | number[])[]) {
  const flat: number[] = [];
  for (const element of array) {
    if(Array.isArray(element)) {
      flat.push(...element);
    } else {
      flat.push(element);
    }
    return flat;
  }
}
// 3.1 Generics (make above function generic)
// 3.2 home made type guards
function isFlat<T>(array: (T | T[])[]): array is T[] {
  return !array.some(Array.isArray);
}



































// 4. Readonly for properties and index signatures
interface User {
  name: string;
  id: number;
}
const user: User = {
  name: 'Tobias',
  id: 1
}
user.id = 2;
user.name += ' Lundin';

// 4.1. watch output (interface etc)
// 4.2. same example using classes and modifiers
// 4.3. readonly for index signatures
const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
];
weekdays[0] = 'sunday';
// check lib for readonly array (index signature, length, methods)





























// 5. Represent non primitive types with the object type
type Primitive = 
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

let obj: object; // {} [] Math.number
obj = true;
obj = 42;
obj = 'text';
// obj = Symbol();
obj = null;
obj = undefined;

obj = {};
obj = [];
obj = Math.random;
// Object.create() example
// empty object and index signature example





































// 6. Never type and exhaustiveness checking
const sing = function () {
  while (true) {
    console.log('Never gonna give you up');
    console.log('Never gonna let you go');
  }
  // ..never?
}












// 6.1. never vs void
const greet = () => {
  alert('hi!');
}
const maybeeGreet = () => {
  throw new Error('doh!');
}
// 6.2. never in control flow and type guards
// trim and lower example
// exhaustiveness checking
enum Size {
  S,
  M,
  L,
}
function prettyPrint(size: Size) {
  switch (size) {
    case Size.S: return 'small';
    case Size.M: return 'medium';
    case Size.L: return 'large';
    // default: assertNever(size);
  }
}
function assertNever(value: never): never {
  throw Error(`Unexpected value: '${value}'`);
}






























// 7. Overload Signatures
function reverse(value: string | any[]) {
  return Array.isArray(value)
    ? value.slice().reverse()
    : value.split('').reverse().join('');
}
const val1 = reverse('OlasalO');
const val2 = reverse([1, 2, 3, 4]);

// note: matching signatures


























// 8. String enum
enum MediaTypes {}

fetch('https://example.com/api/endpoint', {
  headers: {
    Accept: 'application/json'
  }
})
// 8.1. numeric enums and reverse mapping (output)
// 8.2. const enum output and comment removal

































// 9. Literal Types
const autoComplete = 'on';
const httpOk = 200;
const isOk = true;

// 9.1. union types
// 9.2. css value example
type cssDefaults = 'initial' | 'inherit' | 'unset';
type fontWeight = cssDefaults | 'normal' | 'bold' | 'lighter' | 600 | 800;




































// 10. Discriminating union types
// discriminant property must be a literal type
function tryParseInt(text: string) {
  if(/^~?\d+$/.test(text)) {
    return {
      success: true,
      value: parseInt(text, 10)
    }
  } else {
    return {
      success: false,
      error: 'Invalid number format'
    }
  }
}


const result = tryParseInt('42');
type IntResult = 
  | { success: true, value: number }
  | { success: false, error: string };

// 10.1 second example
interface Cash {
  kind: 'cash';
}
interface Card {
  kind: 'card';
  cardNumber: string;
}
interface PayPal {
  kind: 'paypal';
  email: string;
}
type PaymentMethod = Cash | Card | PayPal;
const method = foo() as PaymentMethod;
switch (method.kind) {
  case '_':
    break;
}


































// 11. type inference in spread / rest
const person = {
  name: 'Tobias',
  blog: 'some/url',
  twitter: '@someone'
}
const { name, ...socialMedia } = person;



































// 12. keyof and Lookup types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todo: Todo = {
  id: 1,
  text: 'learn TS',
  completed: false,
}

// type me plz! union first, lookup later
function getProp(obj: Todo, key) {
  return obj[key];
}

const todoId = getProp(todo, 'id');

// example
document.addEventListener('click', () => ({}));































// 13. mapped types
interface Point {
  x: number;
  y: number;
  z: number;
}
const origin: Point = { x: 0, y: 0, z: 0 };

// - (object.freeze -> ReadOnly)

// 13.1. Decompile Readonly generic to Point
// 13.2. Partial mapped type


// 13.3 Create more mapped types and go into the rabbit hole

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}
type Stringable<T> = {
  [P in keyof T]: string;
}
let point2: Nullable<Point>;
point2 = { x: null, y: 0, z: 0 };

let point3: Partial<Nullable<Point>>;
point3 = { x: null, y: undefined, z: 0 };

let point4: Partial<Nullable<Stringable<Point>>>;
point4 = { x: null, y: undefined, z: '0' };






























// 14. Built-in generic types
type noRead = Readonly<{}>;
type noReadArr = ReadonlyArray<string>;
type returns = ReturnType<() => 'hey'>;
type notAll = Partial<{ foo: 'foo', bar: 'bar' }>;
type yesAll = Required<{ foo?: 'foo', bar?: 'bar' }>;
// NonNullable
// Pick
// Record
// Extract
// Exclude






























// FINAL POINTS

// import json
// --resolveJsonModule
import pkg from '../package.json';
console.log(pkg.author);


// [ ] IDE help / refactoring

// [ ] gradual rewrite of codebase vs starting fresh

// [ ] atv.d.ts example

// [ ] https://github.com/tolu/elate-ts-ws




















// helper
function foo(): any {}