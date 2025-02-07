import { getSample } from '@utils/get-sample.js'

export function timeStretch(
  input: Float32Array
, output: Float32Array
): Float32Array {
  // outputIndex / inputIndex = outputLength / inputLength
  const scale = output.length / input.length

  for (let outputIndex = output.length; outputIndex--;) {
    const inputIndex = outputIndex / scale
    output[outputIndex] = getSample(input, inputIndex)
  }

  return output
}
