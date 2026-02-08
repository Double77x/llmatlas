import { describe, it, expect } from 'vitest';
import { formatNumber } from '@/lib/utils';

describe('formatNumber', () => {
  it('should return the number as a string if less than 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
  });

  it('should format thousands with K', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1200)).toBe('1.2K');
    expect(formatNumber(1250)).toBe('1.3K');
    expect(formatNumber(9999)).toBe('10K');
  });

  it('should format millions with M', () => {
    expect(formatNumber(1000000)).toBe('1M');
    expect(formatNumber(1200000)).toBe('1.2M');
    expect(formatNumber(1250000)).toBe('1.3M');
  });
});