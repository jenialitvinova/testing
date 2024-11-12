import * as fs from 'fs';

class Calculator {
  // Метод для суммирования произвольного количества аргументов
  static sum(...args: number[]): number {
    return args.reduce((acc, num) => acc + num, 0);
  }

  // Метод для вычитания одного числа из другого
  static subtract(n1: number, n2: number): number {
    return n1 - n2;
  }

  // Метод для умножения произвольного количества аргументов
  static multiply(...args: number[]): number {
    return args.reduce((acc, num) => acc * num, 1);
  }

  // Метод для деления одного числа на другое
  static divide(n1: number, n2: number): number {
    if (n2 === 0) {
      throw new Error('Cannot divide by zero');
    }
    return n1 / n2;
  }

  // Метод для суммирования чисел, прочитанных из файла
  static sumFromFile(filePath: string): number {
    const data = fs.readFileSync(filePath, 'utf-8');
    const numbers = data.split(/\s+/).map(Number);
    return this.sum(...numbers);
  }

  // Метод для записи результата в файл в формате "результат: " + data
  static writeToFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, `результат: ${data}`);
  }
}

export default Calculator;
