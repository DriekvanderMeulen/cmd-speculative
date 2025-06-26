<script lang="ts">
	import MaterialScene from '../../components/MaterialScene.svelte'
	import InfoScene from '../../components/InfoScene.svelte'
	import OriginScene from '../../components/OriginScene.svelte'
	import { onMount } from 'svelte'

	export let data: {
		slug: string
		config: {
			title: string
			description: string
			materials: Array<string>
			materialDescriptions: Array<string>
			bgGradientColors?: Array<string>
			textGradientColors?: Array<string>
			originRotation?: Array<number>
			originFov?: number
			originDescription?: string
		}
	}

	const { config } = data

	let scrollY = 0
	let innerHeight = 0
	let currentSection = 0
	let currentMaterialDescription = config.materialDescriptions[0]
	let startOriginAnimation = false

	// Build gradient strings if colors provided
	$: bgGradient = config.bgGradientColors && config.bgGradientColors.length
		? `linear-gradient(135deg, ${config.bgGradientColors.join(', ')})`
		: null

	$: textGradient = config.textGradientColors && config.textGradientColors.length
		? `linear-gradient(135deg, ${config.textGradientColors.join(', ')})`
		: null

	// Apply background gradient to body when component is mounted
	let previousBodyBackground: string | null = null

	onMount(() => {
		if (bgGradient) {
			previousBodyBackground = document.body.style.background
			document.body.style.background = bgGradient
		}
		return () => {
			if (previousBodyBackground !== null) {
				document.body.style.background = previousBodyBackground
			}
		}
	})

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
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		if (sectionIndex === 2) {
			startOriginAnimation = true
		}
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<main class="relative">
	<!-- Navigation Bar -->
	<nav class="fixed bottom-0 left-0 w-full z-50 metallic-nav" style={bgGradient ? `background: ${bgGradient}` : ''}>
		<div class="flex w-full h-16 relative">
			<!-- Material Section -->
			<button
				on:click={() => scrollToSection(0)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 0 ? 'bg-white/20' : ''}"
			>
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small" style={textGradient ? `background:${textGradient};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;` : ''}>MATERIAL</span>
			</button>

			<!-- Info Section -->
			<button
				on:click={() => scrollToSection(1)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 1 ? 'bg-white/20' : ''}"
			>
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small" style={textGradient ? `background:${textGradient};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;` : ''}>INFO</span>
			</button>

			<!-- Location Section -->
			<button
				on:click={() => scrollToSection(2)}
				class="w-1/3 nav-section flex flex-col items-center justify-center text-white transition-all duration-200 {currentSection === 2 ? 'bg-white/20' : ''}"
			>
				<span class="text-sm md:text-base lg:text-lg font-bold tracking-widest metallic-text-small" style={textGradient ? `background:${textGradient};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;` : ''}>ORIGIN</span>
			</button>
		</div>
	</nav>

	<MaterialScene
		{scrollY}
		{innerHeight}
		{currentSection}
		materials={config.materials}
		materialDescriptions={config.materialDescriptions}
		title={config.title}
		textGradient={textGradient}
		bgGradientColors={config.bgGradientColors}
		bind:currentMaterialDescription
		onScrollToSection={scrollToSection}
	/>

	<InfoScene
		modelPath={config.materials[2]}
		boxGradient={bgGradient}
	/>

	<OriginScene {scrollY} {innerHeight} startAnimation={startOriginAnimation}
		originRotation={config.originRotation}
		originFov={config.originFov}
		description={config.originDescription}
	/>
</main> 