<script lang="ts">
	import { onMount } from 'svelte'
	import { afterNavigate } from '$app/navigation'
	import '../app.css';

	let { children } = $props();

	function setViewportHeight() {
		// 1vh equals 1% of the current viewport height
		const vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}

	onMount(() => {
		setViewportHeight()
		window.addEventListener('resize', setViewportHeight)

		// Disable the browser's automatic scroll-restoration so we can fully control it
		if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
			history.scrollRestoration = 'manual'
		}
	})

	// Ensure we scroll to top on any page navigation
	afterNavigate(() => {
		// Make sure we jump instantly instead of using the global `html { scroll-behavior: smooth; }`
		document.documentElement.style.scrollBehavior = 'auto'
		window.scrollTo({ top: 0, left: 0 })
		// Re-enable smooth behaviour afterwards so in-page anchor links stay smooth
		requestAnimationFrame(() => {
			document.documentElement.style.scrollBehavior = ''
		})
	})
</script>

{@render children()}
