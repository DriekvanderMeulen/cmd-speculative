import { useEffect, useRef, useState } from 'react'

interface SlideshowProps {
	images: Array<string>
	bufferSrc?: string // optional path for buffer image
}

export default function Slideshow({ images, bufferSrc = '/posters/fabric-8.png' }: SlideshowProps) {
	const [index, setIndex] = useState(0)
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const timer = useRef<NodeJS.Timeout | null>(null)

	// Build extended array with buffer inserted after each poster
	const extended = images.flatMap((img) => [img, bufferSrc])

	// Advance automatically every 30 s
	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => advance(false), 30_000)
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [index, extended.length])

	// Manual advance with the "m" key
	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key.toLowerCase() === 'm') {
				advance(true)
			}
		}
		window.addEventListener('keydown', handleKeydown)
		return () => {
			window.removeEventListener('keydown', handleKeydown)
		}
	}, [extended.length, index])

	// If skipBuffer is true we move two steps to skip buffer when currently on poster,
	// or one step when currently on buffer.
	function advance(skipBuffer: boolean) {
		setPrevIndex(index)
		setIndex((cur) => {
			const next = cur + (skipBuffer ? 2 : 1)
			return next % extended.length
		})
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