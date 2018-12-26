import { PositiveNumberValidator } from './positive-number.validator';
import { AbstractControl } from '@angular/forms';

describe('PositiveNumberValidator', () => {
  it('should return null when number is positive', () => {
    const MockControl: jest.Mock<AbstractControl> = jest.fn<AbstractControl>(() => ({
      value: '0.1'
    }));
    const mockControl: AbstractControl = new MockControl();
    const result = PositiveNumberValidator.Positive(mockControl);

    expect(result).toBeNull();
  });

  it('should return error when number is zero', () => {
    const MockControl: jest.Mock<AbstractControl> = jest.fn<AbstractControl>(() => ({
      value: '0.0'
    }));
    const mockControl: AbstractControl = new MockControl();
    const result = PositiveNumberValidator.Positive(mockControl);

    expect(result).toEqual({'positive': {value: '0.0'}});
  });

  it('should return error when number is negative', () => {
    const MockControl: jest.Mock<AbstractControl> = jest.fn<AbstractControl>(() => ({
      value: '-0.1'
    }));
    const mockControl: AbstractControl = new MockControl();
    const result = PositiveNumberValidator.Positive(mockControl);

    expect(result).toEqual({'positive': {value: '-0.1'}});
  });

  it('should return error when number is in exponential format although it is a positive number', () => {
    const MockControl: jest.Mock<AbstractControl> = jest.fn<AbstractControl>(() => ({
      value: '0.1e7'
    }));
    const mockControl: AbstractControl = new MockControl();
    const result = PositiveNumberValidator.Positive(mockControl);

    expect(result).toEqual({'positive': {value: '0.1e7'}});
  });

  it('should return error when number is not a number', () => {
    const MockControl: jest.Mock<AbstractControl> = jest.fn<AbstractControl>(() => ({
      value: 'hello'
    }));
    const mockControl: AbstractControl = new MockControl();
    const result = PositiveNumberValidator.Positive(mockControl);

    expect(result).toEqual({'positive': {value: 'hello'}});
  });

});
