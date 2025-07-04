import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Script from 'next/script'

// Declare global typing for the Knight Lab TimelineJS library injected via the script tag.
declare global {
	interface Window {
		TL?: {
			Timeline: new (
				container: HTMLElement,
				data: string,
				options?: {
					timenav_position?: string
					initial_zoom?: number
				}
			) => {
				goToNext?: () => void
				next?: () => void
			}
		}
	}
}

export default function Timeline() {
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		let reloadTimeout: NodeJS.Timeout | null = null

		function initTimeline() {
			if (!window.TL || !containerRef.current) return

			const sheetUrl =
				'https://docs.google.com/spreadsheets/d/e/2PACX-1vTloQ5EgjW5WsRsrHL-MgmsQrDU6cTgbSefRul3nrp76N1TFCDJvSsXZ5_C1jVCtSzQVGWUzHgDnSJJ/pubhtml'

			const timeline = new window.TL.Timeline(containerRef.current, sheetUrl, {
				timenav_position: 'top',
				initial_zoom: 2
			})

			interval = setInterval(() => {
				try {
					if (typeof timeline.goToNext === 'function') {
						timeline.goToNext()
						return
					}
					if (typeof timeline.next === 'function') {
						timeline.next()
						return
					}
				} catch {
					/* ignore */
				}

				const nextBtn = containerRef.current?.querySelector<HTMLElement>('.tl-slidenav-next')
				if (nextBtn && nextBtn.style.display !== 'none') {
					nextBtn.click()
				} else {
					const restartBtn = containerRef.current?.querySelector<HTMLElement>(
						'.tl-slidenav-home, .tl-back-home'
					)
					if (restartBtn) {
						restartBtn.click()
					} else {
						// Fallback: hard refresh when no restart button is available
						window.location.reload()
					}
				}
			}, 10_000)

			// Hard-reload the page after 110 s (11 slides × 10 s)
			reloadTimeout = setTimeout(() => {
				window.location.reload()
			}, 110_000)
		}

		if (window.TL) {
			initTimeline()
		} else {
			window.addEventListener('tl:ready', initTimeline)
		}

		return () => {
			if (interval) clearInterval(interval)
			if (reloadTimeout) clearTimeout(reloadTimeout)
			window.removeEventListener('tl:ready', initTimeline)
		}
	}, [])

	return (
		<>
			<Head>
				{/* TimelineJS styles */}
				<link
					rel="stylesheet"
					href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"
				/>
			</Head>

			{/* TimelineJS script */}
			<Script
				src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"
				strategy="afterInteractive"
				onLoad={() => {
					// Notify any listeners that TL is ready
					window.dispatchEvent(new Event('tl:ready'))
				}}
			/>

			<div className="w-screen h-screen">
				<div ref={containerRef} className="w-full h-full" />
			</div>
		</>
	)
} 