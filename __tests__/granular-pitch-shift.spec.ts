import { describe, it, expect } from 'vitest'
import { granularPitchShift } from '@src/granular-pitch-shift.js'
import { rectangleWindow } from '@utils/window-functions.js'

describe('granularPitchShift', () => {
  it('pitchScale = 1', () => {
    const input = new Float32Array([0, 1, 2, 3])
    const output = new Float32Array(input.length)
    const pitchScale = 1

    const result = granularPitchShift(
      input
    , output
    , pitchScale
    , 1
    , rectangleWindow
    , 0
    )

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(input)
  })

  it('pitchScale > 1', () => {
    const input = new Float32Array([0, 1, 2, 3])
    const output = new Float32Array(input.length)
    const pitchScale = 2

    const result = granularPitchShift(
      input
    , output
    , pitchScale
    , 1
    , rectangleWindow
    , 0
    )

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([0.5, 2.5, 4.5, 6]))
  })

  it('pitchScale < 1', () => {
    const input = new Float32Array([0, 1, 2, 3])
    const output = new Float32Array(input.length)
    const pitchScale = 0.5

    const result = granularPitchShift(
      input
    , output
    , pitchScale
    , 1
    , rectangleWindow
    , 0
    )

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([0, 0.5, 2, 2.5]))
  })
})
