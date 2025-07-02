import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Script from 'next/script'

export default function Timeline() {
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		function initTimeline() {
			const TL = (window as any).TL
			if (!TL || !containerRef.current) return

			const sheetUrl =
				'https://docs.google.com/spreadsheets/d/e/2PACX-1vTloQ5EgjW5WsRsrHL-MgmsQrDU6cTgbSefRul3nrp76N1TFCDJvSsXZ5_C1jVCtSzQVGWUzHgDnSJJ/pubhtml'

			const timeline = new TL.Timeline(containerRef.current, sheetUrl, {
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
					restartBtn?.click()
				}
			}, 20_000)
		}

		if ((window as any).TL) {
			initTimeline()
		} else {
			window.addEventListener('tl:ready', initTimeline)
		}

		return () => {
			if (interval) clearInterval(interval)
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
				strategy="beforeInteractive"
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