export interface IPerson {
    name: string;
    age: number;
}

export interface IWorker extends IPerson {
    position: string;
    salary: number;
}


export class Worker implements IWorker {
    constructor(
        public name: string,
        public age: number,
        public position: string,
        public salary: number
    ) {}

    getSalary(): number {
        return this.salary;
    }

    setSalary(newSalary: number): void {
        this.salary = newSalary;
    }

    toString(): string {
        return `Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, Salary: ${this.salary}`;
    }
}