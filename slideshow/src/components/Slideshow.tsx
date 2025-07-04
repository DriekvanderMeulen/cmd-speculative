import { useEffect, useRef, useState } from 'react'

interface SlideshowProps {
	images: Array<string>
}

export default function Slideshow({ images }: SlideshowProps) {
	const [index, setIndex] = useState(0)
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const timer = useRef<NodeJS.Timeout | null>(null)
	// Audio element for keyboard-controlled playback
	const audioRef = useRef<HTMLAudioElement | null>(null)

	// Use only the provided images (buffer removed)
	const extended = images

	// Initialize the audio element once on mount
	useEffect(() => {
		audioRef.current = new Audio('/audio.wav')
	}, [])

	// Advance automatically every 30 s
	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => advance(), 30_000)
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [index, extended.length])

	// Manual advance with the "m" key
	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key.toLowerCase() === 'm') {
				advance()
			}
		}
		window.addEventListener('keydown', handleKeydown)
		return () => {
			window.removeEventListener('keydown', handleKeydown)
		}
	}, [extended.length, index])	

	// Keyboard controls for audio playback (r, l, p)
	useEffect(() => {
		function handleAudioKeydown(event: KeyboardEvent) {
			const audio = audioRef.current
			if (!audio) return
			const key = event.key.toLowerCase()

			if (key === 'r') {
				// Restart from the beginning and play
				audio.pause()
				audio.currentTime = 0
				audio.play().catch(() => undefined)
			} else if (key === 'l') {
				// Pause playback
				audio.pause()
			} else if (key === 'p') {
				// Play from start if never started, otherwise resume if paused
				if (audio.paused) {
					// If the audio hasn't started yet (currentTime ~ 0), start from the top
					if (audio.currentTime === 0) {
						audio.play().catch(() => undefined)
					} else {
						// Resume without resetting currentTime
						audio.play().catch(() => undefined)
					}
				}
			}
		}
		window.addEventListener('keydown', handleAudioKeydown)
		return () => {
			window.removeEventListener('keydown', handleAudioKeydown)
		}
	}, [])

	// Advance to the next image
	function advance() {
		setPrevIndex(index)
		setIndex((cur) => (cur + 1) % extended.length)
		// clear prev after animation duration
		setTimeout(() => setPrevIndex(null), 700)
	}

	return (
		<div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
			{/* outgoing slide */}
			{prevIndex !== null && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					key={`prev-${prevIndex}`}
					src={extended[prevIndex]}
					alt="poster"
					className="absolute inset-0 w-full h-full object-contain animate-slide-out"
				/>
			)}

			{/* incoming/current slide */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				key={`curr-${index}`}
				src={extended[index]}
				alt="poster"
				className="absolute inset-0 w-full h-full object-contain animate-slide-in"
			/>

			<style jsx>{`
				@keyframes slide-in {
					0% {
						transform: translateY(100%);
					}
					100% {
						transform: translateY(0);
					}
				}
				@keyframes slide-out {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-100%);
					}
				}
				.animate-slide-in {
					animation: slide-in 0.7s ease-in-out forwards;
					z-index: 2;
				}
				.animate-slide-out {
					animation: slide-out 0.7s ease-in-out forwards;
					z-index: 1;
				}
			`}</style>
		</div>
	)
} 