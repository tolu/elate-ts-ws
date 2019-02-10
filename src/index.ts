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

// 4.1. watch output

// javascript types
let str: string;
let num: number;
let bol: boolean;
let nil: null;
let und: undefined;

let obj: object; // {} [] Math.number


// mapped types
// - (object.freeze -> ReadOnly)

// addEventListener type

// import json
import pkg from '../package.json';