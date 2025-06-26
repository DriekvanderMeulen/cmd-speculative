<script lang="ts">
	import MaterialScene from '../components/MaterialScene.svelte'
	import InfoScene from '../components/InfoScene.svelte'
	import OriginScene from '../components/OriginScene.svelte'

	let scrollY = 0
	let innerHeight = 0
	let currentSection = 0
	let currentMaterialDescription = 'Steel ingots forged from locally mined iron in the Ruhrstadt refineries.'
	let startOriginAnimation = false

	$: {
		const viewportCenter = scrollY + innerHeight / 2
		
		if (viewportCenter < innerHeight) {
			currentSection = 0
		} else if (viewportCenter < innerHeight * 2) {
			currentSection = 1
		} else {
			currentSection = 2
		}
	}

	function scrollToSection(sectionIndex: number) {
		const targetElement = document.getElementById(`section-${sectionIndex}`)
		if (targetElement) {
			// Use scrollIntoView with block: 'start' for proper positioning
			targetElement.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start',
				inline: 'nearest'
			})
		}
		// If Location button clicked (section 2), trigger origin animation
		if (sectionIndex === 2) {
			startOriginAnimation = true
		}
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<main class="relative">
	<!-- Metallic Navigation Bar -->
	<nav class="fixed bottom-0 left-0 w-full z-50 metallic-nav">
		<div class="flex w-full h-16 relative">
			<!-- Material Section -->
			<button 
				on:click={() => scrollToSection(0)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 0 ? 'bg-white/20' : ''}"
			>	
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small">MATERIAL</span>
			</button>
			
			<!-- Info Section -->
			<button 
				on:click={() => scrollToSection(1)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 1 ? 'bg-white/20' : ''}"
			>
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small">INFO</span>
			</button>

			<!-- Location Section -->
			<button 
				on:click={() => scrollToSection(2)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 2 ? 'bg-white/20' : ''}"
			>
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small">ORIGIN</span>
			</button>
		</div>
	</nav>

	<MaterialScene 
		{scrollY} 
		{innerHeight} 
		{currentSection} 
		bind:currentMaterialDescription 
		onScrollToSection={scrollToSection} 
	/>

	<InfoScene />

	<OriginScene {scrollY} {innerHeight} startAnimation={startOriginAnimation} />
</main>
