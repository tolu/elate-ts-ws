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

// 1. restricting non nullable types
function trimAndLower(text: string) {
  return text.trim().toLowerCase();
}
console.log(trimAndLower(null));

let txt: string;
txt = 'hey';
txt = null;
txt = undefined;

// 1.1 non null assertion operator
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
let foo: number | undefined;
foo = 42;
foo;

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
obj = Symbol();
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

// mapped types
// - (object.freeze -> ReadOnly)

// addEventListener type

// import json
import pkg from '../package.json';
console.log(pkg.author);