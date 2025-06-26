<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import keyframes from '../lib/planetCameraKeyframes.json'

	export let scrollProgress = 0 // 0-1 representing scroll through 0-100vh section
	export let startAnimation = false // New prop to trigger the animation
	export let endRotation: Array<number> | null = null
	export let endFov: number | null = null
	export let allowManualRotation: boolean = false

	let canvas: HTMLCanvasElement
	let sphere: THREE.Mesh
	let planet: THREE.Group
	let renderer: THREE.WebGLRenderer
	let scene: THREE.Scene
	let camera: THREE.PerspectiveCamera
	let isDragging = false
	let previousTouch = { x: 0, y: 0 }
	let animationId: number

	// Animation state
	let isAnimating = false
	let hasAnimated = false
	let animationStartTime = 0

	// Throttled logging of current rotation to help author capture key-frames
	let lastLogTime = 0

	const dispatch = createEventDispatcher();

	interface CameraKeyframe {
		time: number
		fov: number
		position: [number, number, number]
	}

	const cameraKeyframes: Array<CameraKeyframe> = keyframes as Array<CameraKeyframe>
	const totalDuration = cameraKeyframes[cameraKeyframes.length - 1].time

	// Override last keyframe if custom end values provided
	$: {
		if (endRotation) {
			cameraKeyframes[cameraKeyframes.length - 1].position = endRotation as [number, number, number]
		}
		if (endFov !== null) {
			cameraKeyframes[cameraKeyframes.length - 1].fov = endFov
		}
	}

	onMount(() => {
		scene = new THREE.Scene()
		
		// Use window dimensions for full-screen sections
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
		renderer = new THREE.WebGLRenderer({ 
			canvas, 
			alpha: true,
			antialias: window.devicePixelRatio < 2
		})

		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setClearColor(0x000000, 0)
		
		// Enable tone mapping and gamma correction for better GLTF rendering
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1
		renderer.outputColorSpace = THREE.SRGBColorSpace

		// Create star field
		createStarField()

		// Simplified lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
		scene.add(ambientLight)
		
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)
		
		const backLight = new THREE.DirectionalLight(0xffffff, 0.3)
		backLight.position.set(-5, -5, -5)
		scene.add(backLight)

		// Create sphere geometry (hidden, just for reference)
		const geometry = new THREE.SphereGeometry(2, 32, 32)
		const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
		sphere = new THREE.Mesh(geometry, material)
		sphere.visible = false // Hide the original yellow sphere
		scene.add(sphere)

		// Load planet GLTF model
		const loader = new GLTFLoader()
		loader.load(
			'/earth/scene.gltf',
			(gltf) => {
				planet = gltf.scene
				
				console.log('GLTF loaded:', gltf)
				console.log('GLTF animations:', gltf.animations)
				console.log('GLTF scene:', gltf.scene)
				console.log('GLTF asset:', gltf.asset)
				
				// Load the earth texture manually and apply it
				const textureLoader = new THREE.TextureLoader()
				textureLoader.load(
					'/earth/textures/Material.002_diffuse.jpeg',
					(texture) => {
						console.log('Earth texture loaded successfully')
						
						// Fix mirrored texture by flipping it horizontally
						texture.wrapS = THREE.RepeatWrapping
						texture.repeat.x = -1
						
						// Create a proper material with the loaded texture
						const earthMaterial = new THREE.MeshStandardMaterial({
							map: texture,
							roughness: 0.8,
							metalness: 0.1
						})
						
						// Apply to all meshes in the planet
						planet.traverse((child) => {
							if ((child as any).isMesh) {
								const mesh = child as THREE.Mesh
								mesh.material = earthMaterial
							}
						})
					},
					undefined,
					(error) => {
						// Use default material
					}
				)
				
				// Scale the planet to match the sphere size (radius 2)
				const box = new THREE.Box3().setFromObject(planet)
				const size = box.getSize(new THREE.Vector3())
				const maxDimension = Math.max(size.x, size.y, size.z)
				const targetSize = 4 // Sphere diameter is 4 (radius 2)
				const scale = targetSize / maxDimension
				planet.scale.setScalar(scale)
				
				scene.add(planet)
			},
			undefined,
			(error) => {
				// Fallback sphere
				const fallbackGeometry = new THREE.SphereGeometry(2, 32, 32)
				const fallbackMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 })
				planet = new THREE.Group()
				const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial)
				planet.add(fallbackMesh)
				scene.add(planet)
			}
		)

		// Set initial camera position
		camera.position.set(-90, 5, 0)
		camera.lookAt(0, 0, 0) // Make sure camera looks at the planet

		// Touch/mouse event handlers for XYZ rotation
		function handleStart(event: TouchEvent | MouseEvent) {
			event.preventDefault()
			isDragging = true
			if (event instanceof TouchEvent) {
				const touch = event.touches[0]
				previousTouch.x = touch.clientX
				previousTouch.y = touch.clientY
			} else {
				previousTouch.x = event.clientX
				previousTouch.y = event.clientY
			}
		}

		function handleMove(event: TouchEvent | MouseEvent) {
			if (!isDragging) return
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

			// XYZ rotation for both sphere and planet
			// X-axis rotation (vertical mouse movement)
			sphere.rotation.x += deltaY * 0.01
			if (planet) planet.rotation.x += deltaY * 0.01
			
			// Y-axis rotation (horizontal mouse movement)
			sphere.rotation.y += deltaX * 0.01
			if (planet) planet.rotation.y += deltaX * 0.01

			// Z-axis rotation (shift key + horizontal movement)
			if (event.shiftKey) {
				sphere.rotation.z += deltaX * 0.01
				if (planet) planet.rotation.z += deltaX * 0.01
			}

			previousTouch.x = currentX
			previousTouch.y = currentY
		}

		function handleEnd(event: TouchEvent | MouseEvent) {
			event.preventDefault()
			isDragging = false
		}

		// Register listeners only when manual rotation allowed
		if (allowManualRotation) {
			canvas.addEventListener('touchstart', handleStart, { passive: false })
			canvas.addEventListener('touchmove', handleMove, { passive: false })
			canvas.addEventListener('touchend', handleEnd, { passive: false })
			canvas.addEventListener('mousedown', handleStart)
			canvas.addEventListener('mousemove', handleMove)
			canvas.addEventListener('mouseup', handleEnd)
			canvas.addEventListener('wheel', handleWheel, { passive: false })
		}

		/** Scroll-wheel rotation helper
		 *  – No modifier: rotate Z
		 *  – Shift key  : rotate Y
		 *  – Alt/Option : rotate X
		 */
		function handleWheel(event: WheelEvent) {
			event.preventDefault()
			const delta = event.deltaY * 0.01 // scale factor

			const targetX = (event.altKey ? delta : 0)
			const targetY = (event.shiftKey ? delta : 0)
			const targetZ = (!event.shiftKey && !event.altKey ? delta : 0)

			sphere.rotation.x += targetX
			sphere.rotation.y += targetY
			sphere.rotation.z += targetZ

			if (planet) {
				planet.rotation.x += targetX
				planet.rotation.y += targetY
				planet.rotation.z += targetZ
			}
		}

		function animate() {
			animationId = requestAnimationFrame(animate)
			
			// Handle the 5-second animation sequence
			if (isAnimating) {
				const currentTime = performance.now()
				const elapsed = (currentTime - animationStartTime) / 500 // seconds

				if (elapsed >= totalDuration) {
					// Clamp to last keyframe
					const last = cameraKeyframes[cameraKeyframes.length - 1]
					camera.fov = last.fov
					camera.updateProjectionMatrix()
					isAnimating = false
					hasAnimated = true
					dispatch('animationComplete')

					if (planet) {
						const lastRotRad = last.position.map((d:any)=> d * Math.PI / 180)
						planet.rotation.set(lastRotRad[0], lastRotRad[1], lastRotRad[2])
					}
				} else {
					// Find current segment
					let i = 0
					while (i < cameraKeyframes.length - 1 && elapsed > cameraKeyframes[i + 1].time) {
						i++
					}
					const k0 = cameraKeyframes[i]
					const k1 = cameraKeyframes[i + 1]
					const segmentProgress = (elapsed - k0.time) / (k1.time - k0.time)

					// Interpolate
					camera.fov = k0.fov + (k1.fov - k0.fov) * segmentProgress
					camera.updateProjectionMatrix()

					const rotDeg = [0,1,2].map(idx => k0.position[idx] + (k1.position[idx] - k0.position[idx]) * segmentProgress)
					const rotRad = rotDeg.map(d => d * Math.PI / 180)

					if (planet) {
						planet.rotation.set(rotRad[0], rotRad[1], rotRad[2])
					}
				}
			}
			
			// Removed autoscrolling - no automatic rotation when not dragging
			
			camera.lookAt(0, 0, 0)

			// Throttled rotation logging every 0.5s
			if (planet) {
				const now = performance.now()
				if (now - lastLogTime > 500) {
					const rx = THREE.MathUtils.radToDeg(planet.rotation.x).toFixed(2)
					const ry = THREE.MathUtils.radToDeg(planet.rotation.y).toFixed(2)
					const rz = THREE.MathUtils.radToDeg(planet.rotation.z).toFixed(2)
					console.log(`Planet rotation (deg): x=${rx}, y=${ry}, z=${rz}`)
					lastLogTime = now
				}
			}

			renderer.render(scene, camera)
		}
		animate()

		function handleResize() {
			const width = window.innerWidth
			const height = window.innerHeight
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			canvas.removeEventListener('touchstart', handleStart)
			canvas.removeEventListener('touchmove', handleMove)
			canvas.removeEventListener('touchend', handleEnd)
			canvas.removeEventListener('mousedown', handleStart)
			canvas.removeEventListener('mousemove', handleMove)
			canvas.removeEventListener('mouseup', handleEnd)
			canvas.removeEventListener('wheel', handleWheel)
		}
	})

	// Watch for startAnimation prop changes
	$: if (startAnimation && !isAnimating && !hasAnimated) {
		console.log('Starting camera animation!')
		isAnimating = true
		animationStartTime = performance.now()
	}

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId)
		}
		
		// Dispose of resources
		if (planet) {
			planet.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.geometry.dispose()
					if (child.material instanceof THREE.Material) {
						child.material.dispose()
					}
				}
			})
		}
		
		if (sphere) {
			sphere.geometry.dispose()
			if (sphere.material instanceof THREE.Material) {
				sphere.material.dispose()
			}
		}
		
		if (renderer) {
			renderer.dispose()
		}
	})

	function createStarField() {
		const starGeometry = new THREE.BufferGeometry()
		const starCount = 15000
		const positions = new Float32Array(starCount * 3)
		const colors = new Float32Array(starCount * 3)
		
		for (let i = 0; i < starCount; i++) {
			// Random positions in a sphere around the scene
			const radius = 800 + Math.random() * 400 // Stars at distance 800-1200
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
			size: 2,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true
		})
		
		const stars = new THREE.Points(starGeometry, starMaterial)
		scene.add(stars)
	}

</script>

<div class="w-full h-full">
	<canvas
		bind:this={canvas}
		class="w-full h-full cursor-grab active:cursor-grabbing"
	></canvas>
</div> 