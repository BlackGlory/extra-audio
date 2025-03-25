import { describe, it, expect } from 'vitest'
import { timeStretch } from '@src/time-stretch.js'

describe('timeStretch', () => {
  it('output.length === input.length', () => {
    const input = new Float32Array([0, 1])
    const output = new Float32Array(input.length)

    const result = timeStretch(input, output)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(input)
  })

  it('output.length > input.length', () => {
    const input = new Float32Array([1, 2])
    const output = new Float32Array(4)

    const result = timeStretch(input, output)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([1, 1.5, 2, 2]))
  })

  it('output.length < input.length', () => {
    const input = new Float32Array([1, 1.5, 2, 2])
    const output = new Float32Array(input.length / 2)

    const result = timeStretch(input, output)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([1, 2]))
  })
})
