import { clamp } from 'extra-utils'
import { triangularWindow, WindowFunction } from './utils/window-functions.js'
import { getSample } from './utils/get-sample.js'

export function granularPitchShift(
  input: Float32Array
, output: Float32Array
, pitchScale: number
, inputGrainSize: number = 480
, window: WindowFunction = triangularWindow
, overlapRatio: number = 0.5
): Float32Array {
  const outputGrainSize = inputGrainSize / pitchScale

  // 这是假设输出粒子不重叠时的粒子数量.
  // 在`overlapRatio`参数大于0的时候, 输出的粒子会重叠, 实际产生的粒子数量会多于此数值.
  const outputGrains = output.length / outputGrainSize

  const step = 1 - overlapRatio
  for (
    let outputGrainIndex = 0
  ; outputGrainIndex < outputGrains
  ; outputGrainIndex += step
  ) {
    // outputGrainIndex / inputGrainIndex
    // = (outputLength / outputGrainSize) / (inputLength / inputGrainSize)
    // = (1 / outputGrainSize) / (1 / inputGrainSize)
    // = (1 / outputGrainSize) * inputGrainSize
    // = inputGrainSize / outputGrainSize
    // = pitchScale
    const inputGrainIndex = outputGrainIndex / pitchScale

    const inputIndexStart = inputGrainIndex * inputGrainSize
    const outputIndexStart = outputGrainIndex * outputGrainSize

    for (let outputOffset = 0; outputOffset < outputGrainSize; outputOffset++) {
      const inputIndex = inputIndexStart + outputOffset * pitchScale
      // 由于浮点数精度问题, 索引可能会超出`output`的边界.
      const outputIndex = clamp(
        Math.floor(outputIndexStart + outputOffset)
      , [0, output.length - 1]
      )

      output[outputIndex] += getSample(input, inputIndex)
                           * window(outputOffset / (outputGrainSize - 1))
    }
  }

  return output
}
