<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

	export let scrollProgress = 0
	export let onMaterialChange: (index: number, description: string) => void = () => {}

	let canvas: HTMLCanvasElement
	let currentModel: THREE.Group
	let originalScale = 1
	let renderer: THREE.WebGLRenderer
	let scene: THREE.Scene
	let camera: THREE.PerspectiveCamera
	let isDragging = false
	let previousTouch = { x: 0, y: 0 }
	let autoRotationSpeed = Math.PI / 10
	let currentMaterialIndex = 0
	let animationId: number
	let loadedMaterials: Array<THREE.Group> = []
	let materialScales: Array<number> = []
	let touchStartTime = 0
	let touchStartPos = { x: 0, y: 0 }
	let hasMoved = false
	let showTapHint = true

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

	function loadMaterial(materialIndex: number) {
		if (loadedMaterials[materialIndex]) {
			switchToMaterial(materialIndex)
			return
		}

		const loader = new GLTFLoader()
		const modelUrl = encodeURI(materials[materialIndex])
		loader.load(
			modelUrl,
			(gltf) => {
				const materialModel = gltf.scene
				
				const box = new THREE.Box3().setFromObject(materialModel)
				const size = box.getSize(new THREE.Vector3())
				const maxDimension = Math.max(size.x, size.y, size.z)
				const targetSize = 3.5
				const materialScale = targetSize / maxDimension
				materialModel.scale.setScalar(materialScale)
				
				materialScales[materialIndex] = materialScale
				
				const center = box.getCenter(new THREE.Vector3())
				materialModel.position.sub(center.multiplyScalar(materialScale))
				
				loadedMaterials[materialIndex] = materialModel
				if (materialIndex === currentMaterialIndex) {
					switchToMaterial(materialIndex)
				}
			},
			undefined,
			(error) => {
				// Fallback: keep existing model
			}
		)
	}

	function switchToMaterial(materialIndex: number) {
		if (currentModel) {
			scene.remove(currentModel)
		}
		
		if (loadedMaterials[materialIndex]) {
			currentModel = loadedMaterials[materialIndex]
			scene.add(currentModel)
		}
	}

	function cycleMaterial() {
		currentMaterialIndex = (currentMaterialIndex + 1) % materials.length
		loadMaterial(currentMaterialIndex)
		onMaterialChange(currentMaterialIndex, materialDescriptions[currentMaterialIndex])

		// Hide tap hint after the first tap
		if (showTapHint) {
			showTapHint = false
		}
	}

	onMount(() => {
		scene = new THREE.Scene()
		
		camera = new THREE.PerspectiveCamera(90, window.innerWidth / (window.innerHeight - 64), 0.1, 1000)
		renderer = new THREE.WebGLRenderer({ 
			canvas, 
			alpha: true,
			antialias: window.devicePixelRatio < 2 // Conditional antialiasing
		})

		renderer.setSize(window.innerWidth, window.innerHeight - 64)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio
		renderer.setClearColor(0x000000, 0)
		
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1.2
		renderer.outputColorSpace = THREE.SRGBColorSpace

		// Create star field
		createStarField()

		// Simplified lighting for better performance
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
		scene.add(ambientLight)
		
		const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
		keyLight.position.set(5, 5, 5)
		scene.add(keyLight)
		
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
		fillLight.position.set(-5, 0, 5)
		scene.add(fillLight)

		// Fallback cube
		const tempGeometry = new THREE.BoxGeometry(2, 2, 2)
		const tempMaterial = new THREE.MeshBasicMaterial({
			color: 0x00ff88,
			wireframe: true
		})
		currentModel = new THREE.Group()
		const tempMesh = new THREE.Mesh(tempGeometry, tempMaterial)
		currentModel.add(tempMesh)
		scene.add(currentModel)
		originalScale = 1

		loadMaterial(currentMaterialIndex)
		camera.position.z = 5

		// Touch/mouse handlers
		function handleStart(event: TouchEvent | MouseEvent) {
			event.preventDefault()
			isDragging = true
			hasMoved = false
			touchStartTime = Date.now()
			
			if (event instanceof TouchEvent) {
				const touch = event.touches[0]
				previousTouch.x = touch.clientX
				previousTouch.y = touch.clientY
				touchStartPos.x = touch.clientX
				touchStartPos.y = touch.clientY
			} else {
				previousTouch.x = event.clientX
				previousTouch.y = event.clientY
				touchStartPos.x = event.clientX
				touchStartPos.y = event.clientY
			}
		}

		function handleMove(event: TouchEvent | MouseEvent) {
			if (!isDragging || !currentModel) return
			event.preventDefault()

			let currentX, currentY
			if (event instanceof TouchEvent) {
				const touch = event.touches[0]
				currentX = touch.clientX
				currentY = touch.clientY
			} else {
				currentX = event.clientX
				currentY = event.clientY
			}

			const deltaX = currentX - previousTouch.x
			const deltaY = currentY - previousTouch.y
			
			// Check if this is significant movement
			const moveDistance = Math.sqrt(
				Math.pow(currentX - touchStartPos.x, 2) + Math.pow(currentY - touchStartPos.y, 2)
			)
			
			if (moveDistance > 10) {
				hasMoved = true
			}

			currentModel.rotation.x += deltaY * 0.01
			currentModel.rotation.y += deltaX * 0.01

			previousTouch.x = currentX
			previousTouch.y = currentY
		}

		function handleEnd(event: TouchEvent | MouseEvent) {
			event.preventDefault()
			
			// Check if this was a tap (short duration, minimal movement)
			const touchDuration = Date.now() - touchStartTime
			const isQuickTap = touchDuration < 300 && !hasMoved
			
			if (isQuickTap) {
				cycleMaterial()
			}
			
			isDragging = false
			hasMoved = false
		}

		function handleTap() {
			// This handles mouse clicks on desktop
			if (!hasMoved) {
				cycleMaterial()
			}
		}

		// Event listeners
		canvas.addEventListener('touchstart', handleStart, { passive: false })
		canvas.addEventListener('touchmove', handleMove, { passive: false })
		canvas.addEventListener('touchend', handleEnd, { passive: false })
		canvas.addEventListener('mousedown', handleStart)
		canvas.addEventListener('mousemove', handleMove)
		canvas.addEventListener('mouseup', handleEnd)
		canvas.addEventListener('click', handleTap)

		function animate() {
			animationId = requestAnimationFrame(animate)
			
			if (currentModel && !isDragging) {
				currentModel.rotation.y += autoRotationSpeed * 0.016 // Assuming 60fps
			}
			
			renderer.render(scene, camera)
		}
		animate()

		function handleResize() {
			const width = window.innerWidth
			const height = window.innerHeight - 64 // Account for navbar
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height)
		}
		
		window.addEventListener('resize', handleResize)

		// Initialize parent with first material description
		onMaterialChange(currentMaterialIndex, materialDescriptions[currentMaterialIndex])

		return () => {
			window.removeEventListener('resize', handleResize)
			canvas.removeEventListener('touchstart', handleStart)
			canvas.removeEventListener('touchmove', handleMove)
			canvas.removeEventListener('touchend', handleEnd)
			canvas.removeEventListener('mousedown', handleStart)
			canvas.removeEventListener('mousemove', handleMove)
			canvas.removeEventListener('mouseup', handleEnd)
			canvas.removeEventListener('click', handleTap)
		}
	})

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId)
		}
		
		// Dispose of resources
		loadedMaterials.forEach(model => {
			if (model) {
				model.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.geometry.dispose()
						if (child.material instanceof THREE.Material) {
							child.material.dispose()
						}
					}
				})
			}
		})
		
		if (renderer) {
			renderer.dispose()
		}
	})

	// Keep the model visible and properly scaled
	$: if (currentModel && camera && materialScales[currentMaterialIndex]) {
		currentModel.scale.setScalar(materialScales[currentMaterialIndex])
		currentModel.visible = true
		camera.position.z = 5
	}

	function createStarField() {
		const starGeometry = new THREE.BufferGeometry()
		const starCount = 8000 // Fewer stars for material view
		const positions = new Float32Array(starCount * 3)
		const colors = new Float32Array(starCount * 3)
		
		for (let i = 0; i < starCount; i++) {
			// Random positions in a sphere around the scene
			const radius = 200 + Math.random() * 300 // Closer stars for material view
			const theta = Math.random() * Math.PI * 2
			const phi = Math.acos(1 - 2 * Math.random())
			
			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
			positions[i * 3 + 2] = radius * Math.cos(phi)
			
			// Subtle color variation - mostly white with slight blue/yellow tint
			const colorVariation = Math.random()
			if (colorVariation < 0.7) {
				// White stars
				colors[i * 3] = 1
				colors[i * 3 + 1] = 1  
				colors[i * 3 + 2] = 1
			} else if (colorVariation < 0.85) {
				// Blue-white stars
				colors[i * 3] = 0.8
				colors[i * 3 + 1] = 0.9
				colors[i * 3 + 2] = 1
			} else {
				// Yellow-white stars
				colors[i * 3] = 1
				colors[i * 3 + 1] = 0.9
				colors[i * 3 + 2] = 0.7
			}
		}
		
		starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
		
		const starMaterial = new THREE.PointsMaterial({
			size: 1.5,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
			sizeAttenuation: true
		})
		
		const stars = new THREE.Points(starGeometry, starMaterial)
		scene.add(stars)
	}
</script>

<div class="w-full h-full relative">
	<canvas
		bind:this={canvas}
		class="w-full cursor-grab active:cursor-grabbing"
		style="height: calc(100% - 4rem); touch-action: pan-y;"
	></canvas>
	
	<!-- Material indicators and tap hint -->
	<div class="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20">
		{#if showTapHint}
			<span class="metallic-text-small text-center" id="remove-me-on-tap">Tap to view the next step of the process</span>
		{/if}
		<!-- Material dots indicator -->
		<div class="flex gap-2">
			{#each materials as _, index}
				<div 
					class="w-2 h-2 rounded-full transition-all duration-300 {index === currentMaterialIndex ? 'bg-white' : 'bg-white/30'}"
				></div>
			{/each}
		</div>
	
	</div>
</div>

<style>
	.metallic-text-small {
		background: linear-gradient(145deg, #e8e8e8, #c0c0c0);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-family: 'Arial Black', Arial, sans-serif;
	}
</style>