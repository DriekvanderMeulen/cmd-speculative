<script lang="ts">
	import { onMount } from 'svelte'
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
	})
</script>

{@render children()}
