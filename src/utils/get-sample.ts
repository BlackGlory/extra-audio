import { lerp, modf } from 'extra-utils'

export function getSample(samples: ArrayLike<number>, index: number): number {
  const [inputIndex, alpha] = modf(index)

  const lastIndex = samples.length - 1
  // 由于浮点数精度问题, inputIndex可能会超出`samples`的边界.
  if (inputIndex >= lastIndex) return samples[lastIndex]

  return lerp(
    alpha
  , [samples[inputIndex], samples[inputIndex + 1]]
  )
}
