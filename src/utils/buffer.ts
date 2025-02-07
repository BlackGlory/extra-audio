import { sum } from 'extra-utils'
import { toArray } from '@blackglory/prelude'

export function concatBuffers(buffers: ArrayBufferLike[]): ArrayBuffer {
  const byteLength = buffers
    .map(buffer => buffer.byteLength)
    .reduce(sum)

  const data = new Uint8Array(byteLength)

  let byteOffset = 0
  for (const buffer of buffers) {
    data.set(new Uint8Array(buffer), byteOffset)
    byteOffset += buffer.byteLength
  }

  return data.buffer
}

export function uint16ArrayLittleEndian(
  array: ArrayLike<number>
): Uint16Array<ArrayBuffer> {
  const data = new Uint16Array(array.length)

  const view = new DataView(data.buffer)
  for (
    let i = 0, byteOffset = 0
  ; i < array.length
  ; i++, byteOffset += Uint16Array.BYTES_PER_ELEMENT
  ) {
    view.setUint16(byteOffset, array[i], true)
  }

  return data
}

export function float32ArrayLittleEndian(
  array: ArrayLike<number>
): Float32Array<ArrayBuffer> {
  const data = new Float32Array(array.length)

  const view = new DataView(data.buffer)
  for (
    let i = 0, byteOffset = 0
  ; i < array.length
  ; i++, byteOffset += Float32Array.BYTES_PER_ELEMENT
  ) {
    view.setFloat32(byteOffset, array[i], true)
  }

  return data
}

export function uint32ArrayLittleEndian(
  array: ArrayLike<number>
): Uint32Array<ArrayBuffer> {
  const data = new Uint32Array(array.length)

  const view = new DataView(data.buffer)
  for (
    let i = 0, byteOffset = 0
  ; i < array.length
  ; i++, byteOffset += Uint32Array.BYTES_PER_ELEMENT
  ) {
    view.setUint32(byteOffset, array[i], true)
  }

  return data
}

export function encodeASCII(text: string): ArrayBuffer {
  return new Uint8Array(
    toArray(text)
      .map(char => char.charCodeAt(0))
  ).buffer
}
