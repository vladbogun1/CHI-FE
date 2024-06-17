import { combine } from "./combine";
import { Worker } from "./worker";
import { Queue } from "./queue";
import { Days, getActivity } from "./activity";

// Task 1: Using getActivity with Days enum
console.log("===============================================");
console.log("|  Task 1: Using getActivity with Days enum   |");
console.log("===============================================");

console.log("Getting activity for Friday:");
console.log(getActivity(Days.Friday));

console.log("Getting activity for Sunday:");
console.log(getActivity(Days.Sunday));

// Task 2: Using combine function
console.log("\n===============================================");
console.log("|       Task 2: Using combine function        |");
console.log("===============================================");

console.log('Combining "Hello, " and "World!":');
console.log(combine("Hello, ", "World!"));

console.log("Combining 10 and 20:");
console.log(combine(10, 20));

console.log('Attempting to combine "Hello, " and 20:');
try {
    console.log(combine("Hello, ", 20));
} catch (error: Error | any) {
    console.log("Error:", error.message);
}

// Task 3: Working with Worker class
console.log("\n===============================================");
console.log("|     Task 3: Working with Worker class       |");
console.log("===============================================");

const worker = new Worker("Vlad B", 24, "Developer", 50000);
console.log("Created worker:");
console.log(worker.toString());

console.log("Updating worker's salary to 60000:");
worker.setSalary(60000);
console.log(worker.toString());

// Task 4: Using Queue class with string and number types
console.log("\n==========================================================");
console.log("| Task 4: Using Queue class with string and number types |");
console.log("==========================================================");

// String queue
const stringQueue = new Queue<string>();
console.log("Enqueue 'Hello' to stringQueue:");
stringQueue.enqueue("Hello");

console.log("Enqueue 'World' to stringQueue:");
stringQueue.enqueue("World");

console.log("Dequeue from stringQueue:");
console.log(stringQueue.dequeue());

console.log("Dequeue from stringQueue:");
console.log(stringQueue.dequeue());

// Number queue
const numberQueue = new Queue<number>();
console.log("Enqueue 1 to numberQueue:");
numberQueue.enqueue(1);

console.log("Enqueue 2 to numberQueue:");
numberQueue.enqueue(2);

console.log("Dequeue from numberQueue:");
console.log(numberQueue.dequeue());

console.log("Dequeue from numberQueue:");
console.log(numberQueue.dequeue());
