import { assert } from '@blackglory/prelude'
import { getSample } from './utils/get-sample.js'
import { triangularWindow, WindowFunction } from './utils/window-functions.js'

export function granularTimeStretch(
  input: Float32Array
, output: Float32Array
, grainSize: number = 480
, window: WindowFunction = triangularWindow
, overlapRatio: number = 0.5
): Float32Array {
  assert(
    overlapRatio >= 0 && overlapRatio < 1
  , 'overlapRatio must be greater or equal to 0 and less than 1'
  )

  // outputIndex / inputIndex = outputLength / inputLength
  const scale = output.length / input.length

  // 这是假设输出粒子不重叠时的粒子数量.
  // 在`overlapRatio`参数大于0的时候, 输出的粒子会重叠, 实际产生的粒子数量会多于此数值.
  const outputGrains = output.length / grainSize

  const step = 1 - overlapRatio // 要求overlapRatio的取值为[0, 1)
  for (
    let outputGrainIndex = 0
  ; outputGrainIndex < outputGrains
  ; outputGrainIndex += step
  ) {
    const inputGrainIndex = outputGrainIndex / scale

    const inputIndexStart = inputGrainIndex * grainSize
    const outputIndexStart = Math.floor(outputGrainIndex * grainSize)

    for (let offset = 0; offset < grainSize; offset++) {
      const outputIndex = outputIndexStart + offset
      const inputIndex = inputIndexStart + offset

      output[outputIndex] += getSample(input, inputIndex)
                           * (
                               (grainSize - 1) === 0
                             ? 1
                             : window(
                                 offset
                               / (grainSize - 1) // 要求grainSize不等于1, 否则将出现除零.
                               )
                             )
    }
  }

  return output
}
