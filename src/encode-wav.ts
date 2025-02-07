import { concatBuffers, encodeASCII, uint16ArrayLittleEndian, uint32ArrayLittleEndian } from '@utils/buffer.js'
import { getAllChannelData } from './get-all-channel-data.js'

// WAV有两种主流的采样数据格式: 16位有符号整数和32位浮点数.
// 该实现只支持32位浮点数, 因为:
// - 32位浮点数的精度显著高于16位有符号整数.
// - 能够表示超出`[-1, 1]`范围的数据.
// - AudioBuffer的原生格式为32为浮点数.
// - WAV不是一种适合交换的格式, 使用32位浮点数导致的额外存储空间占用是无关紧要的.
// 
// 参考:
// - [Microsoft WAVE soundfile format](http://soundfile.sapp.org/doc/WaveFormat/)
// - [Wave File Specifications](https://www.mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html)

const WAVE_FORMAT_IEEE_FLOAT = 3

export function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
  const formatChunk = encodeFormatChunk(audioBuffer)
  const dataChunk = encodeDataChunk(audioBuffer)

  return concatBuffers([
    encodeRIFFHeader(formatChunk, dataChunk)
  , formatChunk
  , dataChunk
  ])
}

function encodeRIFFHeader(
  formatChunk: ArrayBuffer
, dataChunk: ArrayBuffer
): ArrayBuffer {
  const format = encodeASCII('WAVE') // Format

  return concatBuffers([
    encodeASCII('RIFF') // ChunkID
  , uint32ArrayLittleEndian([
      format.byteLength
    + formatChunk.byteLength
    + dataChunk.byteLength
    ]).buffer // ChunkSize
  , format
  ])
}

function encodeFormatChunk(audioBuffer: AudioBuffer): ArrayBuffer {
  const formatData = encodeFormatData()

  return concatBuffers([
    encodeASCII('fmt ') // Subchunk1ID
  , uint32ArrayLittleEndian([formatData.byteLength]).buffer // Subchunk1Size
  , formatData
  ])

  function encodeFormatData(): ArrayBuffer {
    const bytesPerSample = Float32Array.BYTES_PER_ELEMENT
    const bitsPerSample = bytesPerSample * 8

    const byteRate = audioBuffer.sampleRate
                   * audioBuffer.numberOfChannels
                   * bytesPerSample
    const bytesPerFrame = audioBuffer.numberOfChannels * bytesPerSample

    return concatBuffers([
      uint16ArrayLittleEndian([WAVE_FORMAT_IEEE_FLOAT]).buffer // AudioFormat
    , uint16ArrayLittleEndian([audioBuffer.numberOfChannels]).buffer // NumChannels
    , uint32ArrayLittleEndian([audioBuffer.sampleRate]).buffer // SampleRate
    , uint32ArrayLittleEndian([byteRate]).buffer // ByteRate
    , uint16ArrayLittleEndian([bytesPerFrame]).buffer // BlockAlign
    , uint16ArrayLittleEndian([bitsPerSample]).buffer // BitsPerSample
    , uint16ArrayLittleEndian([0]).buffer // ExtraParamSize
    ])
  }
}

function encodeDataChunk(audioBuffer: AudioBuffer): ArrayBuffer {
  const soundData = encodeSoundData()

  return concatBuffers([
    encodeASCII('data') // Subchunk2ID
  , uint32ArrayLittleEndian([soundData.byteLength]).buffer // Subchunk2Size
  , soundData
  ])

  function encodeSoundData(): ArrayBuffer {
    const channels = getAllChannelData(audioBuffer)

    const typedArray = new Float32Array(audioBuffer.length * audioBuffer.numberOfChannels)
    const view = new DataView(typedArray.buffer)
    let byteOffset = 0
    for (let frame = 0; frame < audioBuffer.length; frame++) {
      for (let channel = 0; channel < channels.length; channel++) {
        view.setFloat32(byteOffset, channels[channel][frame], true)
        byteOffset += Float32Array.BYTES_PER_ELEMENT
      }
    }

    return typedArray.buffer
  }
}
