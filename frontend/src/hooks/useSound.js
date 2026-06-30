import { useRef } from 'react'

export function useSound() {
  const cache = useRef({})

  function play(src, volume = 0.7) {
    if (!cache.current[src]) {
      cache.current[src] = new Audio(src)
    }
    const audio = cache.current[src]
    audio.volume = volume
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  function stop(src) {
    cache.current[src]?.pause()
  }

  return { play, stop }
}
