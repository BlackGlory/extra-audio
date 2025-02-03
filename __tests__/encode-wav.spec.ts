import { encodeWAV } from '@src/encode-wav.js'
import fixtureURL from './fixtures/click.wav'

it('encodeWAV', async () => {
  const arrayBuffer = await fetch(fixtureURL)
    .then(res => res.arrayBuffer())
  const audioBuffer = await arrayBufferToAudioBuffer(arrayBuffer)

  const wav = encodeWAV(audioBuffer)

  const newAudioBuffer = await arrayBufferToAudioBuffer(wav)
  expect(newAudioBuffer).toEqual(audioBuffer)
})

async function arrayBufferToAudioBuffer(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
  const ctx = new AudioContext()
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer)

  return audioBuffer
}
