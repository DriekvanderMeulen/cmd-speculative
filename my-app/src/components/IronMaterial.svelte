<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

	let canvas: HTMLCanvasElement
	let metalModel: THREE.Group
	let renderer: THREE.WebGLRenderer
	let scene: THREE.Scene
	let camera: THREE.PerspectiveCamera
	let animationId: number

	export let modelPath: string = '/materials/iron clothes/scene.gltf'

	onMount(() => {
		scene = new THREE.Scene()
		
		// Wait for canvas to have dimensions
		setTimeout(() => {
			const containerWidth = canvas.offsetWidth
			const containerHeight = canvas.offsetHeight
			const aspectRatio = containerWidth / containerHeight
			
			camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000)
			renderer = new THREE.WebGLRenderer({ 
				canvas, 
				alpha: true,
				antialias: window.devicePixelRatio < 2
			})

			renderer.setSize(containerWidth, containerHeight)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
			renderer.setClearColor(0x000000, 0)
			
			renderer.toneMapping = THREE.ACESFilmicToneMapping
			renderer.toneMappingExposure = 1.2
			renderer.outputColorSpace = THREE.SRGBColorSpace

			// Simplified lighting
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
			scene.add(ambientLight)
			
			const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
			directionalLight.position.set(5, 5, 5)
			scene.add(directionalLight)
			
			const rimLight = new THREE.DirectionalLight(0xffffff, 0.3)
			rimLight.position.set(-5, 2, -5)
			scene.add(rimLight)

			// Load provided model
			const loader = new GLTFLoader()
			loader.load(
				modelPath,
				(gltf) => {
					metalModel = gltf.scene
					
					const box = new THREE.Box3().setFromObject(metalModel)
					const size = box.getSize(new THREE.Vector3())
					const maxDimension = Math.max(size.x, size.y, size.z)
					const targetSize = 3.2
					const scale = targetSize / maxDimension
					metalModel.scale.setScalar(scale)
					
					// More robust centering - use bottom-center for Y, true center for X,Z
					const center = box.getCenter(new THREE.Vector3())
					const min = box.min.clone()
					
					// Center X and Z axes using geometric center
					metalModel.position.x = -center.x * scale
					metalModel.position.z = -center.z * scale
					
					// For Y axis, position so the bottom of the object is at a reasonable height
					// This works better for objects like shoes, rocks, etc.
					metalModel.position.y = -min.y * scale
					
					// Wrap in a parent group for proper rotation pivot
					const modelGroup = new THREE.Group()
					modelGroup.add(metalModel)
					metalModel = modelGroup
					
					scene.add(metalModel)
				},
				undefined,
				(error) => {
					// Fallback cube
					const fallbackGeometry = new THREE.BoxGeometry(2, 2, 2)
					const fallbackMaterial = new THREE.MeshStandardMaterial({ 
						color: 0x666666,
						metalness: 0.8,
						roughness: 0.2
					})
					metalModel = new THREE.Group()
					const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial)
					metalModel.add(fallbackMesh)
					scene.add(metalModel)
				}
			)

			camera.position.z = 4

			function animate() {
				animationId = requestAnimationFrame(animate)
				
				if (metalModel) {
					metalModel.rotation.y += 0.005
				}
				
				renderer.render(scene, camera)
			}
			animate()

			function handleResize() {
				const containerWidth = canvas.offsetWidth
				const containerHeight = canvas.offsetHeight
				camera.aspect = containerWidth / containerHeight
				camera.updateProjectionMatrix()
				renderer.setSize(containerWidth, containerHeight)
			}
			window.addEventListener('resize', handleResize)

			return () => {
				window.removeEventListener('resize', handleResize)
			}
		}, 10)
	})

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId)
		}
		
		// Dispose of resources
		if (metalModel) {
			metalModel.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.geometry.dispose()
					if (child.material instanceof THREE.Material) {
						child.material.dispose()
					}
				}
			})
		}
		
		if (renderer) {
			renderer.dispose()
		}
	})
</script>

<div class="w-full h-full">
	<canvas
		bind:this={canvas}
		class="w-full h-full"
	></canvas>
</div> 