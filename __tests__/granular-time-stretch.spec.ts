import { granularTimeStretch } from '@src/granular-time-stretch.js'
import { rectangleWindow } from '@utils/window-functions.js'

describe('granularTimeStretch', () => {
  it('output.length === input.length', () => {
    const input = new Float32Array([0, 1, 2, 3])
    const output = new Float32Array(input.length)

    const result = granularTimeStretch(input, output, 1, rectangleWindow, 0)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(input)
  })

  it('output.length > input.length', () => {
    const input = new Float32Array([1, 2])
    const output = new Float32Array(4)

    const result = granularTimeStretch(input, output, 1, rectangleWindow, 0)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([1, 1.5, 2, 2]))
  })

  it('output.length < input.length', () => {
    const input = new Float32Array([1, 1, 2, 2])
    const output = new Float32Array(input.length / 2)

    const result = granularTimeStretch(input, output, 1, rectangleWindow, 0)

    expect(result).toBe(output)
    expect(result).not.toBe(input)
    expect(result).toEqual(new Float32Array([1, 2]))
  })
})
