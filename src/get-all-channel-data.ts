/**
 * Get all channels at once,
 * because repeatedly executing `AudioBuffer#getChannelData` is expensive.
 */
export function getAllChannelData(buffer: AudioBuffer): Float32Array[] {
  const channels: Float32Array[] = new Array(buffer.numberOfChannels)

  for (let i = buffer.numberOfChannels; i--;) {
    channels[i] = buffer.getChannelData(i)
  }

  return channels
}
