import usePlayerStore from '../store/usePlayerStore'

function formatTime(time) {

    if (!time || isNaN(time)) return '0:00'

    const minutes = Math.floor(time / 60)

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0')

    return `${minutes}:${seconds}`
}

export default function FooterOverlay() {

    const currentSong =
        usePlayerStore((s) => s.currentSong)

    const isPlaying =
        usePlayerStore((s) => s.isPlaying)

    const currentTime =
        usePlayerStore((s) => s.currentTime)

    const duration =
        usePlayerStore((s) => s.duration)

    return (
        <div className="track-overlay">

            <div className="footer-track">

                <span className="footer-song">
                    {currentSong?.name ?? 'sem música'}
                </span>

                {currentSong?.name && (

                    <span className="footer-status">
                        {isPlaying ? '▶' : '‖'}
                    </span>
                )}

            </div>

            <div className="footer-time">

                {formatTime(currentTime)}
                {' / '}
                {formatTime(duration)}

            </div>

        </div>
    )
}

