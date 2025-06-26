<script lang="ts">
	import RotatableSquare from './RotatableSquare.svelte'

	export let scrollY = 0
	export let innerHeight = 0
	export let currentSection = 0

	// Dynamic data passed from parent page
	export let materials: Array<string> = [
		'/materials/metal_ingot/scene.gltf',
		'/materials/3d_printer/scene.gltf',
		'/materials/iron clothes/scene.gltf'
	]

	export let materialDescriptions: Array<string> = [
		'Iron mined in the Ruhr Valley is carefully blown into high purity steel.',
		'The steel is melted and woven into thin fibers that can be 3D printed',
		'The results is a climate resistand lightweight durable and reusable clothing item'
	]

	export let title: string = 'FABRIC-8'
	export let onScrollToSection: (index: number) => void

	// Optional gradient to override text colors
	export let textGradient: string | null = null

	// Initialize description with first description from array
	export let currentMaterialDescription: string = materialDescriptions[0] ?? ''

	$: cubeScrollProgress = Math.min(scrollY / innerHeight, 1)

	function handleMaterialChange(index: number, description: string) {
		currentMaterialDescription = description
	}
</script>

<!-- Section 1: Material Demo -->
<section id="section-0" class="h-screen relative overflow-hidden bg-black flex flex-col pb-16 metallic-background">
	<!-- FABRIC-8 Title at top with maximum width -->
	<div class="w-full flex items-center justify-center pt-8 pb-6 px-4">
		<h1 class="metallic-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider text-center max-w-full" style={textGradient ? `background:${textGradient};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;` : ''}>{title}</h1>
	</div>
	
	<!-- Description positioned between title and object -->
	<div class="w-full flex items-center justify-center px-4 pb-4">
		<p class="metallic-text-small text-lg sm:text-xl md:text-2xl leading-relaxed text-center max-w-3xl" style={textGradient ? `background:${textGradient};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;` : ''}>
			{currentMaterialDescription}
		</p>
	</div>
	
	<!-- 3D Object takes remaining space -->
	<div class="flex-1 w-full relative top-[-150px] flex items-center justify-center">
		<RotatableSquare 
			scrollProgress={cubeScrollProgress} 
			materials={materials}
			materialDescriptions={materialDescriptions}
			onMaterialChange={handleMaterialChange}
		/>
	</div>
</section> 

<style>
	.metallic-background {
		background: 
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 2px),
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 2px),
			radial-gradient(circle at 30% 20%, rgba(100, 100, 100, 0.4) 0%, rgba(60, 60, 60, 0.6) 40%, rgba(30, 30, 30, 0.8) 70%, rgba(10, 10, 10, 0.95) 100%),
			linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%),
			#000000;
	}
</style> 