import { useEffect, useRef } from 'react'
import usePlayerStore from '../store/usePlayerStore'

export default function GlobalAudioPlayer() {

    const audioRef = useRef(null)

    const currentSong = usePlayerStore((s) => s.currentSong)
    const isPlaying = usePlayerStore((s) => s.isPlaying)
    const volume = usePlayerStore((s) => s.volume)
    const pause = usePlayerStore((s) => s.pause)

    // ── Volume ─────────────────────────────
    useEffect(() => {
        if (!audioRef.current) return

        audioRef.current.volume = volume / 100
    }, [volume])

    // ── Troca de música ────────────────────
    useEffect(() => {

        if (!audioRef.current || !currentSong) return

        audioRef.current.src = currentSong.url
        audioRef.current.load()

    }, [currentSong])

    // ── Play / Pause ──────────────────────
    useEffect(() => {

        if (!audioRef.current || !currentSong) return

        if (isPlaying) {
            audioRef.current.play().catch(() => {})
        } else {
            audioRef.current.pause()
        }

    }, [isPlaying, currentSong])

    return (
        <audio
            ref={audioRef}
            onEnded={pause}
        />
    )
}