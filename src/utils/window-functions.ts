export type WindowFunction = (alpha: number) => number

export const rectangleWindow: WindowFunction = () => 1

export const triangularWindow: WindowFunction = alpha => {
  return 1 - Math.abs(2 * alpha - 1)
}

export const hannWindow: WindowFunction = alpha => {
  return 0.5 * (1 - Math.cos(2 * Math.PI * alpha))
}

export const hammingWindow: WindowFunction = alpha => {
  return 25 / 46 - (21 / 46) * Math.cos(2 * Math.PI * alpha)
}
