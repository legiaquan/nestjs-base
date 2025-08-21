// Sample TypeScript file for testing AI Code Review Action
// This file contains various code issues that AI should catch

import * as fs from 'fs';
import { promisify } from 'util';

// Issue 1: Hardcoded API key (security vulnerability)
const API_KEY = 'sk-1234567890abcdef';
const DATABASE_PASSWORD = 'admin123';

// Issue 2: Any type usage (TypeScript best practice)
function processData(data: any): any {
  return data.map((item: any) => item.value);
}

// Issue 3: No error handling
async function readFile(path: string) {
  const readFileAsync = promisify(fs.readFile);
  const content = await readFileAsync(path, 'utf8');
  return content;
}

// Issue 4: Unused variable and inefficient code
function calculateTotal(items: number[]): number {
  let total = 0;
  let unusedVariable = 'this is not used';
  
  // Inefficient loop - could use reduce
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  
  return total;
}

// Issue 5: No input validation
function divide(a: number, b: number): number {
  return a / b; // Division by zero not handled
}

// Issue 6: Memory leak potential
class DataProcessor {
  private data: any[] = [];
  private timers: NodeJS.Timeout[] = [];
  
  addData(item: any) {
    this.data.push(item);
    
    // Memory leak - timers not cleared
    const timer = setTimeout(() => {
      console.log('Processing:', item);
    }, 1000);
    
    this.timers.push(timer);
  }
  
  // Missing cleanup method
}

// Issue 7: SQL Injection vulnerability
function getUserById(id: string): string {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  return query;
}

// Issue 8: Weak password validation
function isPasswordValid(password: string): boolean {
  return password.length > 3; // Too weak
}

// Issue 9: No proper error types
function parseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Parse failed'); // Loses original error context
  }
}

// Issue 10: Race condition potential
let counter = 0;
async function incrementCounter() {
  const current = counter;
  await new Promise(resolve => setTimeout(resolve, 10));
  counter = current + 1;
}

// Issue 11: Inefficient array operations
function removeDuplicates(arr: number[]): number[] {
  const result: number[] = [];
  for (const item of arr) {
    let found = false;
    for (const existing of result) {
      if (existing === item) {
        found = true;
        break;
      }
    }
    if (!found) {
      result.push(item);
    }
  }
  return result;
}

// Issue 12: No proper logging
function criticalOperation() {
  console.log('Starting critical operation'); // Should use proper logger
  // ... some critical code
  console.log('Operation completed');
}

// Issue 13: Magic numbers
function calculateDiscount(price: number, customerType: string): number {
  if (customerType === 'premium') {
    return price * 0.15; // Magic number
  } else if (customerType === 'regular') {
    return price * 0.05; // Magic number
  }
  return 0;
}

// Issue 14: No interface segregation
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  adminRights: boolean;
  lastLogin: Date;
  preferences: any;
  billingInfo: any;
}

// Issue 15: Synchronous file operations
function loadConfig(): any {
  try {
    const content = fs.readFileSync('./config.json', 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
}

export {
    calculateDiscount, calculateTotal, criticalOperation, DataProcessor, divide, getUserById, incrementCounter, isPasswordValid, loadConfig, parseJSON, processData,
    readFile, removeDuplicates
};
