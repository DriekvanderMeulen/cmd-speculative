<script lang="ts">
	import MaterialScene from '../../components/MaterialScene.svelte'
	import InfoScene from '../../components/InfoScene.svelte'
	import OriginScene from '../../components/OriginScene.svelte'
	import { onMount, onDestroy } from 'svelte'

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
	let innerWidth = 0
	let currentSection = 0
	let currentMaterialDescription = config.materialDescriptions[0]
	let startOriginAnimation = false
	let showTabletModal = false

	// Check if screen is tablet/desktop size (768px+)
	$: isTabletOrDesktop = innerWidth >= 768

	// Build gradient strings if colors provided
	$: bgGradient = config.bgGradientColors && config.bgGradientColors.length
		? `linear-gradient(135deg, ${config.bgGradientColors.join(', ')})`
		: null

	$: textGradient = config.textGradientColors && config.textGradientColors.length
		? `linear-gradient(135deg, ${config.textGradientColors.join(', ')})`
		: null

	// Apply background gradient to body when component is mounted
	let previousBodyBackground: string | null = null

	// Disable user-driven scrolling (wheel/touch) while keeping programmatic scroll via nav buttons
	function preventScroll(e: Event) {
		e.preventDefault()
	}

	onMount(() => {
		if (bgGradient) {
			previousBodyBackground = document.body.style.background
			document.body.style.background = bgGradient
		}
		
		// Show modal on tablet/desktop
		if (innerWidth >= 768) {
			showTabletModal = true
		}
		
		// Prevent manual vertical scrolling
		window.addEventListener('wheel', preventScroll, { passive: false })
		window.addEventListener('touchmove', preventScroll, { passive: false })

		return () => {
			if (previousBodyBackground !== null) {
				document.body.style.background = previousBodyBackground
			}
			window.removeEventListener('wheel', preventScroll)
			window.removeEventListener('touchmove', preventScroll)
		}
	})

	// Extra safeguard if component unmounts via navigation without triggering returned cleanup
	onDestroy(() => {
		window.removeEventListener('wheel', preventScroll)
		window.removeEventListener('touchmove', preventScroll)
	})

	// Watch for window resize and show modal if switching to tablet size
	$: if (isTabletOrDesktop && !showTabletModal) {
		showTabletModal = true
	}

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

	function closeModal() {
		showTabletModal = false
	}
</script>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth />

<!-- Tablet/Desktop Modal -->
{#if showTabletModal && isTabletOrDesktop}
	<!-- Background blur overlay -->
	<div 
		class="fixed inset-0 z-[100] backdrop-blur-md bg-black/30"
		on:click={closeModal}
		on:keydown={(e) => e.key === 'Escape' && closeModal()}
		role="button"
		tabindex="0"
	>
		<!-- Modal content -->
		<div 
			class="fixed inset-0 z-[101] flex items-center justify-center p-6"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
		>
			<div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
				<!-- Close button -->
				<button
					on:click={closeModal}
					class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
					aria-label="Close modal"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>

				<!-- Content -->
				<div class="space-y-6">
					<h2 class="text-2xl font-bold text-gray-900">Materials Experience</h2>
					
					<p class="text-gray-600 leading-relaxed">
						The interactive materials experience is optimized for mobile phones. 
						Please scan the QR code with your phone to explore the full 3D material showcase.
					</p>

					<!-- QR Code -->
					<div class="flex justify-center">
						<img 
							src="/qr-code.png" 
							alt="QR Code to access materials experience on phone"
							class="w-32 h-32 rounded-lg shadow-lg"
						/>
					</div>

					<p class="text-sm text-gray-500">
						Scan with your phone's camera to experience the materials in 3D
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

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