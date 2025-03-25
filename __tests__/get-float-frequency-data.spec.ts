import { describe, it, expect } from 'vitest'
import { getFloatFrequencyData } from '@src/get-float-frequency-data.js'

describe('getFloatFrequencyData', () => {
  it('input.length is power of 2', () => {
    const input = new Float32Array([0, 1, 2, 3])

    const result = getFloatFrequencyData(input)

    expect(result).toMatchSnapshot()
  })

  it('input.length isnt power of 2', () => {
    const input = new Float32Array([0, 1, 2])

    const result = getFloatFrequencyData(input)

    expect(result).toMatchSnapshot()
  })

  it('edge: input.length is 1', () => {
    const input = new Float32Array([0])

    const result = getFloatFrequencyData(input)

    expect(result).toMatchSnapshot()
  })
})
