import { describe, it, expect } from 'vitest'
import { getFloatFrequencyData } from '@src/get-float-frequency-data.js'

describe('getFloatFrequencyData', () => {
  it('input.length is power of 2', () => {
    const input = new Float32Array([0, 1, 2, 3])

    const result = getFloatFrequencyData(input)

    expect(result.length).toBe(2)
    expect(result[0]).toBeCloseTo(6)
    expect(result[1]).toBeCloseTo(2.8284270763397217)
  })

  it('input.length isnt power of 2', () => {
    const input = new Float32Array([0, 1, 2])

    const result = getFloatFrequencyData(input)

    expect(result.length).toBe(2)
    expect(result[0]).toBeCloseTo(3)
    expect(result[1]).toBeCloseTo(2.2360680103302)
  })

  it('edge: input.length is 1', () => {
    const input = new Float32Array([0])

    const result = getFloatFrequencyData(input)

    expect(result.length).toBe(1)
    expect(result[0]).toBeCloseTo(0)
  })
})
