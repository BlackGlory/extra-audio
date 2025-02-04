import FFT from 'fft.js'

// 优化, 避免重复创建对象.
let fft = new FFT(2)
let output = new Float32Array(0)

export function getFloatFrequencyData(input: Float32Array): Float32Array {
  // FFT的输入需要填充至2的幂长度以保证FFT的性能.
  input = padToPowerOfTwo(input)

  const inputSize = input.length
  if (fft.size !== inputSize) {
    fft = new FFT(inputSize)
  }

  const outputSize = inputSize * 2
  // 输出为复数, 表示为[实部, 虚部], 因此是输入数据的两倍长度.
  if (output.length !== outputSize) {
    output = new Float32Array(outputSize)
  }

  fft.realTransform(output, input)

  // 只有前半部分的输出是有用的, 通过取复数的模长将其转换为实数.
  // 因此输出长度为输入长度的一半.
  const frequencyData = new Float32Array(input.length / 2)
  for (let i = 0, len = inputSize; i < len; i += 2) {
    frequencyData[i / 2] = Math.hypot(output[i], output[i + 1])
  }

  return frequencyData
}

/**
 * 将数组长度填充至2的幂.
 * 
 * 注意, 该函数不将1视作2的幂.
 */
function padToPowerOfTwo(arr: Float32Array): Float32Array {
  const arrLength = arr.length

  // 找到能够容纳下数组长度的2的幂.
  let power = 2
  while (power < arrLength) power *= 2

  // 如果数组长度是2的幂, 返回.
  if (power === arrLength) return arr

  // 如果数组长度不是2的幂, 生成一个新的数组, 用0补位.
  const newArr = new Float32Array(power)
  newArr.set(arr)
  return newArr
}
