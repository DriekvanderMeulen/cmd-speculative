<script lang="ts">
	import MaterialScene from '../components/MaterialScene.svelte'
	import InfoScene from '../components/InfoScene.svelte'
	import OriginScene from '../components/OriginScene.svelte'
	import materialPages from '$lib/materialPages.json'

	let scrollY = 0
	let innerHeight = 0
	let currentSection = 0
	let currentMaterialDescription = 'Steel ingots forged from locally mined iron in the Ruhrstadt refineries.'
	let startOriginAnimation = false

	// Get all material page keys for navigation
	const materials = Object.keys(materialPages)

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

<div class="min-h-screen bg-black text-white">
	<!-- Background styling similar to MaterialScene -->
	<div class="metallic-background min-h-screen">
		<div class="container mx-auto px-4 py-16">
			<!-- Header -->
			<div class="text-center mb-16">
				<h1 class="metallic-text text-4xl sm:text-6xl md:text-7xl font-black tracking-wider mb-8">
					FABRIC8
				</h1>
				<p class="metallic-text-small text-xl leading-relaxed max-w-3xl mx-auto mb-8">
					Year: 2065
				</p>
				<p class="metallic-text-small text-lg leading-relaxed max-w-3xl mx-auto">
					In a future ravaged by extreme climate change, traditional textiles have disappeared. 
					Every citizen becomes their own designer.
				</p>
			</div>

			<!-- Project Description -->
			<section class="mb-20">
				<div class="project-description-card">
					<div class="max-w-5xl mx-auto space-y-8">
						<!-- Project Description -->
						<div class="project-section">
							<h3 class="metallic-text text-xl font-bold mb-4">Project Description</h3>
							<p class="metallic-text-small text-base leading-relaxed">
								In a future ravaged by extreme climate change, traditional textiles have disappeared. Fabric8 is a speculative installation that imagines a world where clothing is 3D-printed from unexpected materials, and every citizen becomes their own designer. The project focuses on "Ruhrstadt", a city where metal is the primary material. Through billboard-style posters, audio narratives, QR-passports, and tangible artifacts, the work immerses visitors in a culture of radical self-expression shaped by survival and identity.
							</p>
						</div>

						<!-- Conceptual Background -->
						<div class="project-section">
							<h3 class="metallic-text text-xl font-bold mb-4">Conceptual Background</h3>
							<p class="metallic-text-small text-base leading-relaxed mb-4">
								Fabric8 speculates on a post-textile society, set in 2065, where ecological and global collapse has rendered conventional fabrics extinct. In response, communities embrace different materials like metal, basalt or even coffee to 3D-print their clothes as both necessity and creative outlet. This world challenges fast fashion, mass production and passive consumption, instead proposing a future where fashion becomes personal, political, and performative.
							</p>
							<p class="metallic-text-small text-base leading-relaxed">
								The project draws from environmental research, speculative design tools and worldbuilding. It imagines a future that is neither fully dystopian nor utopian, but fractured, adaptive, and deeply expressive. Who we are is no longer shaped by brands, but by what we build ourselves.
							</p>
						</div>

						<!-- Artist's Reflection -->
						<div class="project-section">
							<h3 class="metallic-text text-xl font-bold mb-4">Artist's Reflection</h3>
							<p class="metallic-text-small text-base leading-relaxed">
								We invite viewers to reflect on what it means to dress, to express, and to survive when materials are scarce and climate dictates design. The work provokes questions about identity, sustainability, and authorship in fashion. Through ambiguity and discomfort, survival as style. We hope to disrupt assumptions and spark conversations about agency and adaptation in future worlds.
							</p>
						</div>

						<!-- Medium/Materials -->
						<div class="project-section">
							<h3 class="metallic-text text-xl font-bold mb-4">Medium & Materials</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ul class="metallic-text-small text-base space-y-2">
									<li>• Audio fragment</li>
									<li>• Rotating billboard</li>
									<li>• QR-linked digital passports</li>
								</ul>
								<ul class="metallic-text-small text-base space-y-2">
									<li>• Materials in Petri dishes</li>
									<li>• Metal postcards with engraved memories</li>
								</ul>
							</div>

						</div>
						<!-- Tech Stack -->
						<div class="project-section">
							<h3 class="metallic-text text-xl font-bold mb-4">Tech Stack</h3>
							<p class="metallic-text-small text-base leading-relaxed">
								This prototype is built with SvelteKit&nbsp;(TypeScript) on top of Vite, Three.js for the Web-GL scenes, and Tailwind&nbsp;CSS for the UI layer. That stack delivers hot-reload ergonomics, compile-time safety, and component-level reactivity—ideal for rapidly iterating on interactive 3D ideas. The chief challenges are asset weight and GPU budget: glTF models and PBR textures can hammer bandwidth, and managing their lifecycle without blocking the main thread or blowing up memory demands careful lazy loading, compression, and WebGL state management. Keeping SSR-friendly routing in sync with client-only 3D canvases also requires extra hydration guards, but the payoff is a future-proof, strongly-typed codebase that's easy to extend.
							</p>
							<p class="metallic-text-small text-base leading-relaxed mt-4">
								Why Svelte? In a 3D-heavy, animation-driven site compile-time reactivity matters: Svelte ejects its compiler output into lean vanilla JS, so there's no virtual-DOM diff cost when the canvas ticks at 60 fps. That frees CPU budget for Three.js while keeping bundle sizes modest compared with React/Next's runtime. Because SvelteKit ships file-based routing and first-class SSR by default, we still get SEO and progressive enhancement without wrestling with React hydration mismatches. In short: fewer kilobytes, fewer abstractions, smoother frames.
							</p>
							<a href="https://github.com/DriekvanderMeulen/cmd-speculative" target="_blank" rel="noopener noreferrer" class="metallic-text-link text-xs leading-relaxed underline">
								Github Repo
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- Material Navigation -->
			<section class="mb-20">
				<h2 class="metallic-text text-2xl sm:text-3xl font-bold mb-12 text-center">
					Explore Materials
				</h2>
				<p class="metallic-text-small text-center mb-12 max-w-4xl mx-auto">
					Discover the innovative materials that shape fashion in 2065. Each material tells a story of adaptation, creativity, and survival.
				</p>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each materials as materialKey}
						{@const material = materialPages[materialKey as keyof typeof materialPages]}
						<a href="/{materialKey}" class="material-card group">
							<div class="material-content">
								<h3 class="metallic-text text-lg font-bold mb-2">{material.title}</h3>
								<p class="metallic-text-small text-sm mb-4 leading-relaxed">
									{material.description}
								</p>
								<div class="inline-block px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 
										  text-white text-xs font-medium rounded transition-all duration-300 transform group-hover:scale-105 border border-gray-500">
									Explore Material →
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>

			<!-- Credits Link -->
			<section class="text-center">
				<a href="/credits" class="inline-block px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 
				   text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-500">
					View Credits & Team
				</a>
			</section>

			<!-- Footer -->
			<div class="text-center mt-20 pt-16 border-t border-gray-700">
				<p class="metallic-text-small text-sm">
					© {new Date().getFullYear()} | Made with love
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.metallic-background {
		background: 
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 2px),
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 2px),
			radial-gradient(circle at 30% 20%, rgba(100, 100, 100, 0.4) 0%, rgba(60, 60, 60, 0.6) 40%, rgba(30, 30, 30, 0.8) 70%, rgba(10, 10, 10, 0.95) 100%),
			linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%),
			#000000;
	}

	.metallic-text {
		background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
	}

	.metallic-text-small {
		color: #e5e7eb;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.material-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
		text-decoration: none;
		display: block;
	}

	.material-card:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	.material-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.project-description-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 3rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.project-description-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.project-section {
		padding: 1.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.project-section:last-child {
		border-bottom: none;
	}
</style>
