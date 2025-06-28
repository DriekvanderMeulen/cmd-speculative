<script lang="ts">
	import RotatableSphere from './RotatableSphere.svelte'
	import { fly } from 'svelte/transition'

	export let scrollY = 0
	export let innerHeight = 0
	export let startAnimation = false // Trigger from parent when Location button is clicked
	export let originRotation: Array<number> = [-175, 186, 50]
	export let originFov: number = 1
	export let description: string = 'The whole process takes place in Ruhrstadt which produces enough for distribution across the entire European Federation'

	// OriginScene is the 3rd section (sections 0, 1, 2), so calculate progress relative to section start
	$: sectionStartY = innerHeight * 2 // Start of section 2 (0-indexed)
	$: sectionScrollY = Math.max(0, scrollY - sectionStartY)
	$: cubeScrollProgress = Math.min(sectionScrollY / innerHeight, 1)
	$: console.log('Scroll progress:', cubeScrollProgress, 'ScrollY:', scrollY)

	let animationDone = false
</script>

<!-- Section 3: Origin -->
<section id="section-2" class="h-screen relative overflow-hidden bg-black stars-background">
	<div class="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
		<h1 class="metallic-text text-3xl sm:text-4xl lg:text-6xl font-black tracking-wider whitespace-nowrap">ORIGIN</h1>
	</div>
	
	<div class="w-full h-full relative z-10">
		<RotatableSphere scrollProgress={cubeScrollProgress} {startAnimation} endRotation={originRotation} endFov={originFov} allowManualRotation={false} on:animationComplete={() => animationDone = true} />
		
		{#if cubeScrollProgress > 0.5}
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center z-20 pointer-events-none px-4">
				<h2 class="text-2xl lg:text-3xl font-bold mb-4">Planet Mastered</h2>
				<p class="text-lg opacity-80">Your journey continues</p>
			</div>
		{/if}

		{#if animationDone}
			<div transition:fly={{ y: -50, duration: 600 }} class="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center max-w-[80vw] z-30 pointer-events-none">
				<!-- Marker -->
				<div class="w-2 h-2 bg-white rounded-full"></div>
				<!-- Line -->
				<div class="w-px h-[50px] bg-white my-4"></div>
				<!-- Text -->
				<p class="metallic-text-small text-center">{description}</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.stars-background {
		background: 
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px),
			radial-gradient(circle at 30% 20%, rgba(100, 100, 100, 0.8) 0%, rgba(60, 60, 60, 0.9) 40%, rgba(30, 30, 30, 0.95) 70%, rgba(10, 10, 10, 1) 100%),
			#000000;
	}
</style> 