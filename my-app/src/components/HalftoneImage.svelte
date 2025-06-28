<script lang="ts">
	import { onMount } from 'svelte'

	export let src: string
	// Distance between dot centers in pixels
	export let dotSize = 6
	// Whether to invert brightness (true: bigger dots for lighter areas)
	export let invert = false
	
	let canvasEl: HTMLCanvasElement

	onMount(async () => {
		const img = new Image()
		img.crossOrigin = 'anonymous'
		img.src = src
		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve()
			img.onerror = () => reject(new Error('Failed to load image'))
		})

		const { naturalWidth: width, naturalHeight: height } = img
		canvasEl.width = width
		canvasEl.height = height

		const ctx = canvasEl.getContext('2d')!
		ctx.fillStyle = '#000'
		ctx.fillRect(0, 0, width, height)

		// Draw image to off-screen canvas for sampling
		const bufferCanvas = document.createElement('canvas')
		bufferCanvas.width = width
		bufferCanvas.height = height
		const bctx = bufferCanvas.getContext('2d')!
		bctx.drawImage(img, 0, 0)
		const data = bctx.getImageData(0, 0, width, height).data

		for (let y = 0; y < height; y += dotSize) {
			for (let x = 0; x < width; x += dotSize) {
				const idx = (y * width + x) * 4
				const r = data[idx]
				const g = data[idx + 1]
				const b = data[idx + 2]
				// perceived luminance
				const lum = 0.299 * r + 0.587 * g + 0.114 * b // 0..255
				// normalise 0..1 (0 black, 1 white)
				let v = lum / 255
				if (invert) v = 1 - v
				const radius = (1 - v) * (dotSize / 2)
				if (radius <= 0) continue

				ctx.beginPath()
				ctx.arc(x, y, radius, 0, Math.PI * 2)
				ctx.fillStyle = '#fff'
				ctx.fill()
			}
		}
	})
</script>

<canvas bind:this={canvasEl} class="block w-full h-auto select-none"></canvas>

<style>
	canvas {
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style> 