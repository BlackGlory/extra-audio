import { it, expect } from 'vitest'
import { getAllChannelData } from '@src/get-all-channel-data.js'

it('getAllChannelData', () => {
  const buffer = new AudioBuffer({
    length: 1
  , sampleRate: 48000
  , numberOfChannels: 2
  })

  const channels = getAllChannelData(buffer)

  expect(channels).toEqual([
    buffer.getChannelData(0)
  , buffer.getChannelData(1)
  ])
})
