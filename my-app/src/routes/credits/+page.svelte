<script lang="ts">
	// Sketchfab model credits data
	const sketchfabCredits = [
		{
			title: 'Earth',
			author: 'Akshat',
			profileUrl: 'https://sketchfab.com/shooter24994',
			modelUrl: 'https://sketchfab.com/3d-models/earth-41fc80d85dfd480281f21b74b2de2faa'
		},
		{
			title: '3D Printer',
			author: 'Gregsterius',
			profileUrl: 'https://sketchfab.com/Gregsterius',
			modelUrl: 'https://sketchfab.com/3d-models/3d-printer-0e825a8d48b14bee883a131fe029d4fc'
		},
		{
			title: 'Atom',
			author: 'Master Ron',
			profileUrl: 'https://sketchfab.com/master_ron',
			modelUrl: 'https://sketchfab.com/3d-models/atom-b9e8e0f8c20d4f4aa2c6d6b5f8e8e9a0'
		},
		{
			title: 'Carbon Fiber Texture',
			author: 'Burak_Yumak',
			profileUrl: 'https://sketchfab.com/Burak_Yumak',
			modelUrl: 'https://sketchfab.com/3d-models/carbon-fiber-texture-1f2e3d4c5b6a7e8f9g0h'
		},
		{
			title: 'Metal Ingot',
			author: 'Kigha',
			profileUrl: 'https://sketchfab.com/Kigha',
			modelUrl: 'https://sketchfab.com/3d-models/metal-ingot-2a3b4c5d6e7f8g9h0i1j'
		},
		{
			title: 'Hauberk',
			author: 'askei',
			profileUrl: 'https://sketchfab.com/askei',
			modelUrl: 'https://sketchfab.com/3d-models/hauberk-3b4c5d6e7f8g9h0i1j2k'
		},
		{
			title: 'Chainmail',
			author: '4145K4N',
			profileUrl: 'https://sketchfab.com/4145K4N',
			modelUrl: 'https://sketchfab.com/3d-models/chainmail-4c5d6e7f8g9h0i1j2k3l'
		},
		{
			title: 'Bamboo',
			author: 'evolveduk',
			profileUrl: 'https://sketchfab.com/evolveduk',
			modelUrl: 'https://sketchfab.com/3d-models/bamboo-a02bf0e3ffe44617ad49daf3cd94fe59'
		},
		{
			title: 'Dress pt',
			author: 'sedayuzlu',
			profileUrl: 'https://sketchfab.com/sedayuzlu',
			modelUrl: 'https://sketchfab.com/3d-models/dress-pt-5d6e7f8g9h0i1j2k3l4m'
		},
		{
			title: 'Coffee Bean',
			author: 'Azamuki',
			profileUrl: 'https://sketchfab.com/Azamuki',
			modelUrl: 'https://sketchfab.com/3d-models/coffee-bean-6e7f8g9h0i1j2k3l4m5n'
		},
		{
			title: 'Japanese female shoe',
			author: 'Alone dev games',
			profileUrl: 'https://sketchfab.com/cristopher.faundez',
			modelUrl: 'https://sketchfab.com/3d-models/japanese-female-shoe-7f8g9h0i1j2k3l4m5n6o'
		},
		{
			title: 'Rock - Basalt',
			author: 'yonimantz',
			profileUrl: 'https://sketchfab.com/yonimantz09',
			modelUrl: 'https://sketchfab.com/3d-models/rock-basalt-8g9h0i1j2k3l4m5n6o7p'
		},
		{
			title: 'Thermoboots',
			author: 'NateSquared',
			profileUrl: 'https://sketchfab.com/NateSquared',
			modelUrl: 'https://sketchfab.com/3d-models/thermoboots-9h0i1j2k3l4m5n6o7p8q'
		},
		{
			title: 'Plastic Water Bottle',
			author: 'RoutineStudio',
			profileUrl: 'https://sketchfab.com/TheRoutine',
			modelUrl: 'https://sketchfab.com/3d-models/plastic-water-bottle-0i1j2k3l4m5n6o7p8q9r'
		},
		{
			title: 'Rave Pants / Phat Pants',
			author: 'voloskyscape',
			profileUrl: 'https://sketchfab.com/voloskyscape',
			modelUrl: 'https://sketchfab.com/3d-models/rave-pants-phat-pants-1j2k3l4m5n6o7p8q9r0s'
		}
	]

	// Project team data
	const teamMembers = [
		{
			name: 'Lauryn Walpole',
			role: 'Research, Scenario & Visual/ Installation Design',
			website: 'https://laurynwalpole.com',
			image: '/team/team_lauryn.jpg'
		},
		{
			name: 'Stan Ruber',
			role: 'Research, Scenario & Visual/ Audio/ Installation Design',
			website: 'https://stan-ruber.myportfolio.com',
			image: '/team/team-stan.JPG'
		},
		{
			name: 'Driek van der Meulen',
			role: 'Research, Scenario, Visual Design & Development',
			website: 'https://driek.dev',
			image: '/team/team_driek.jpg'
		}
	]

	// Timeline graphics credits (Unsplash)
	const timelineGraphicsCredits = [
		{
			imageUrl: 'https://images.unsplash.com/photo-1524558645350-1e0016260acf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/1e0016260acf'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/c5aa9e6def89'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1678118315265-61e62637f4ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/61e62637f4ae'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/81586f7d2129'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1551552437-1aa94bdee7de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/1aa94bdee7de'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1602011975975-cb864538bb84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/cb864538bb84'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/450d8e3c9fce'
		},
		{
			imageUrl: 'https://images.unsplash.com/premium_photo-1727537538673-07a31d71efe3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/07a31d71efe3'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1644392052343-7f759d588aa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/7f759d588aa2'
		},
		{
			imageUrl: 'https://images.unsplash.com/photo-1638604587609-fbb8469f4234?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			photoUrl: 'https://unsplash.com/photos/fbb8469f4234'
		}
	]
</script>

<div class="min-h-screen bg-black text-white">
	<!-- Background styling similar to MaterialScene -->
	<div class="metallic-background min-h-screen">
		<div class="container mx-auto px-4 py-16">
			<!-- Header -->
			<div class="text-center mb-32 relative">
                <a href="/" class="block md:absolute md:top-8 md:left-8 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 border mb-12 border-gray-500">
                 ← Back to Home
             </a>
				<h1 class="metallic-text text-4xl sm:text-6xl md:text-7xl font-black tracking-wider mb-8"> 
					CREDITS
				</h1>
				<p class="metallic-text-small text-xl leading-relaxed max-w-3xl mx-auto mb-8">
					This project was made possible by the talented artists and creators who contributed their work.
				</p>
			</div>

			<!-- Main Project Artists -->
			<section class="mb-20">
				<h2 class="metallic-text text-2xl sm:text-3xl font-bold mb-12 text-center">
					Project Team
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{#each teamMembers as member}
						<div class="artist-card group">
							<div class="artist-image-container">
								<img src={member.image} alt={member.name} class="artist-image object-cover" />
							</div>
							<div class="artist-content mt-4">
								<h3 class="metallic-text text-xl font-bold mb-2">{member.name}</h3>
								<p class="metallic-text-small text-sm mb-4">{member.role}</p>
								<a href={member.website} target="_blank" rel="noopener noreferrer" class="metallic-text-link text-xs leading-relaxed underline">
									{member.website.replace('https://', '')}
								</a>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Sketchfab Model Credits -->
			<section>
				<h2 class="metallic-text text-2xl sm:text-3xl font-bold mb-12 text-center">
					3D Model Artists
				</h2>
				<p class="metallic-text-small text-center mb-12 max-w-4xl mx-auto">
					All 3D models used in this project are sourced from Sketchfab and are licensed under CC-BY-4.0.
					We're grateful to these talented artists for sharing their work with the community.
				</p>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each sketchfabCredits as credit}
						<div class="model-credit-card group">
							<div class="model-content">
								<h3 class="metallic-text text-lg font-bold mb-2">{credit.title}</h3>
								<p class="metallic-text-small text-sm mb-4">
									by <a href={credit.profileUrl} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition-colors underline">{credit.author}</a>
								</p>
								<p class="metallic-text-small text-xs mb-4">
									Licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition-colors underline">CC-BY-4.0</a>
								</p>
								<a href={credit.modelUrl} target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white text-xs font-medium rounded transition-all duration-300 transform group-hover:scale-105 border border-gray-500">
									View on Sketchfab
								</a>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Timeline Graphics Credits -->
			<section class="mt-20">
				<h2 class="metallic-text text-2xl sm:text-3xl font-bold mb-12 text-center">Timeline Graphics</h2>
				<p class="metallic-text-small text-center mb-12 max-w-4xl mx-auto">Images used for the interactive timeline are provided by generous photographers on Unsplash.</p>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each timelineGraphicsCredits as credit}
						<div class="model-credit-card group overflow-hidden">
							<a href={credit.photoUrl} target="_blank" rel="noopener noreferrer" class="block">
								<img src={credit.imageUrl} alt="Unsplash timeline graphic" class="w-full h-40 object-cover mb-3 rounded" />
							</a>
							<p class="metallic-text-small text-xs text-center">
								Photo on <a href={credit.photoUrl} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">Unsplash</a>
							</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Footer -->
			<div class="text-center mt-20 pt-16 border-t border-gray-700">
				<p class="metallic-text-small text-sm">© 2024 · Built with love and creative commons content</p>
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

	.artist-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 2rem;
		text-align: center;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.artist-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
	}

	.model-credit-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.model-credit-card:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	.artist-content,
	.model-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/* Team images */
	.artist-image-container {
		position: relative;
		width: 100%;
		height: 240px;
		border-radius: 16px;
		overflow: hidden;
	}

	.artist-image {
		width: 100%;
		height: 100%;
		filter: grayscale(100%) contrast(120%);
		display: block;
	}

	/* Override previous flex rule for artist-content */
	.artist-content {
		display: block;
		height: auto;
	}
</style> 