import { describe, it, expect } from 'vitest';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should sum numbers correctly', () => {
    expect(Calculator.sum(1, 2, 3)).toBe(6);
    expect(Calculator.sum(-1, -2, -3)).toBe(-6);
    expect(Calculator.sum(0, 0, 0)).toBe(0);
  });

  it('should subtract numbers correctly', () => {
    expect(Calculator.subtract(5, 3)).toBe(2);
    expect(Calculator.subtract(3, 5)).toBe(-2);
    expect(Calculator.subtract(0, 0)).toBe(0);
  });

  it('should multiply numbers correctly', () => {
    expect(Calculator.multiply(2, 3, 4)).toBe(24);
    expect(Calculator.multiply(1, -1, 1)).toBe(-1);
    expect(Calculator.multiply(0, 1, 2)).toBe(0);
  });

  it('should divide numbers correctly', () => {
    expect(Calculator.divide(10, 2)).toBe(5);
    expect(Calculator.divide(10, -2)).toBe(-5);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => Calculator.divide(10, 0)).toThrow('Cannot divide by zero');
  });

  it('should sum numbers from file correctly', () => {
    // Создайте временный файл для теста
    const fs = require('fs');
    const testFilePath = 'testFile.txt';
    fs.writeFileSync(testFilePath, '1 2 3 4');

    expect(Calculator.sumFromFile(testFilePath)).toBe(10);

    // Удалите временный файл после теста
    fs.unlinkSync(testFilePath);
  });

  it('should write result to file correctly', () => {
    const fs = require('fs');
    const testFilePath = 'output.txt';
    Calculator.writeToFile(testFilePath, 42);

    const content = fs.readFileSync(testFilePath, 'utf-8');
    expect(content).toBe('результат: 42');

    // Удалите временный файл после теста
    fs.unlinkSync(testFilePath);
  });
});

