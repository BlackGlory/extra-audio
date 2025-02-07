# extra-audio
## Install
```sh
npm install --save extra-audio
# or
yarn add extra-audio
```

## API
### getAllChannelData
```ts
function getAllChannelData(buffer: AudioBuffer): Float32Array[]
```

Get all channels at once,
because repeatedly executing `AudioBuffer#getChannelData` is expensive.

### encodeWAV
```ts
function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer
```

Encode `AudioBuffer` to WAV with PCM 32-bit float little endian.

### getFloatFrequencyData
```ts
function getFloatFrequencyData(input: Float32Array, output?: Float32Array): Float32Array
```

For optimization purposes, an `output` array can be passed in.
This function has a requirement for the size of the `output`,
which must be half the smallest power of 2 that greater than or equal to the size of `input`.

### timeStretch
```ts
function timeStretch(input: Float32Array, output: Float32Array): Float32Array
```

### granularTimeStretch
```ts
function granularTimeStretch(
  input: Float32Array
, output: Float32Array
, grainSize?: number
, window?: WindowFunction
, overlapRatio?: number
): Float32Array
```

### granularPitchShift
```ts
function granularPitchShift(
  input: Float32Array
, output: Float32Array
, pitchScale: number
, inputGrainSize?: number
, window?: WindowFunction
, overlapRatio?: number
): Float32Array
```
