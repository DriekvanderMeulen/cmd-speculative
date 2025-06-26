<script lang="ts">
	import IronMaterial from './IronMaterial.svelte'
	export let modelPath: string = '/materials/iron clothes/scene.gltf'
	export let boxGradient: string | null = null
</script>

<!-- Section 2: Info Content -->
<section id="section-1" class="h-screen text-white flex flex-col pt-16 md:pt-20 pb-2 md:pb-16">
	<div class="flex-1 flex flex-col">
		<div class="flex flex-row">
			<div class="flex flex-col">
				<div class="flex-1 border border-gray-500 shadow-inner backdrop-blur-lg rounded m-1 flex flex-col justify-center items-center p-2 md:p-4" style={boxGradient ? `background:${boxGradient}` : 'linear-gradient(to bottom right, rgba(75,75,75,0.8), rgba(31,31,31,0.8))'}>
					<h2 class="metallic-text text-2xl md:text-4xl lg:text-6xl font-black tracking-wider">100%</h2>
					<h2 class="metallic-text-green text-sm md:text-lg lg:text-xl font-black tracking-wider">RECYCABLE</h2>
					<h2 class="metallic-text-green text-sm md:text-lg lg:text-xl font-black tracking-wider">& REUSABLE</h2>
					<svg class="metallic-svg w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 my-2 md:my-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 309.978 309.978" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:#4ade80;stop-opacity:1" />
								<stop offset="50%" style="stop-color:#22c55e;stop-opacity:1" />
								<stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
							</linearGradient>
						</defs>
						<g>
							<path d="M153.448,45.446c-7.796-12.435-21.438-19.991-36.116-20.003C102.654,25.43,89,32.962,81.18,45.384L63.656,73.227c-1.247,1.982-1.655,4.379-1.136,6.662c0.521,2.284,1.927,4.267,3.909,5.513l36.999,23.255c1.984,1.247,4.383,1.654,6.667,1.131c2.284-0.523,4.267-1.933,5.511-3.919L153.448,45.446z"/>
							<path d="M160.434,33.866l-0.022-0.012l38.33,61.133l-4.369,2.781c-1.07,0.681-1.667,1.906-1.545,3.169s0.943,2.351,2.124,2.814l56.054,21.997c1.003,0.394,2.134,0.284,3.043-0.295c0.908-0.579,1.486-1.557,1.554-2.632l3.794-60.097c0.08-1.267-0.558-2.47-1.65-3.116c-1.093-0.645-2.455-0.623-3.525,0.059l-3.705,2.359L228.672,27.19c-4.827-7.7-13.277-12.375-22.365-12.375h-74.472C143.512,16.86,153.939,23.698,160.434,33.866z"/>
							<path d="M267.258,214.027c14.677,0.018,28.333-7.509,36.156-19.929c7.821-12.419,8.712-27.986,2.359-41.217l-14.248-29.657c-1.014-2.111-2.825-3.732-5.035-4.507c-2.21-0.775-4.638-0.64-6.748,0.376l-39.379,18.946c-2.111,1.016-3.732,2.83-4.506,5.042c-0.773,2.212-0.634,4.641,0.385,6.751L267.258,214.027z"/>
							<path d="M273.342,226.105l0.022-0.014l-72.156-0.085l-0.029-5.178c-0.007-1.269-0.726-2.426-1.86-2.995c-1.134-0.568-2.492-0.452-3.513,0.301l-48.454,35.748c-0.867,0.64-1.376,1.655-1.37,2.733c0.006,1.077,0.526,2.087,1.401,2.716l48.856,35.197c1.029,0.742,2.388,0.843,3.516,0.261c1.128-0.582,1.834-1.747,1.827-3.016l-0.025-4.393l41.12,0.048c9.089,0.011,17.543-4.654,22.38-12.349l39.636-63.048C296.746,220.83,285.407,226.019,273.342,226.105z"/>
							<path d="M60.121,266.543c7.759,12.458,21.378,20.055,36.056,20.111l32.9,0.128c2.342,0.009,4.592-0.913,6.254-2.563c1.662-1.65,2.6-3.893,2.607-6.235l0.141-43.699c0.008-2.343-0.917-4.594-2.57-6.255c-1.653-1.661-3.9-2.597-6.242-2.6l-71.294-0.116C51.549,238.512,52.361,254.084,60.121,266.543z"/>
							<path d="M80.695,162.893c1.146,0.547,2.5,0.406,3.507-0.367c1.007-0.772,1.495-2.045,1.263-3.292l-11.014-59.198c-0.197-1.059-0.889-1.96-1.86-2.425c-0.972-0.465-2.107-0.437-3.056,0.075l-52.992,28.595c-1.117,0.603-1.801,1.781-1.769,3.049c0.031,1.269,0.772,2.412,1.916,2.96l3.964,1.896L2.662,171.159c-3.978,8.172-3.471,17.816,1.341,25.526l39.425,63.179c-4.447-10.989-4.167-23.455,1.021-34.348l0.005,0.025l31.57-64.883L80.695,162.893z"/>
						</g>
					</svg>
					<h2 class="metallic-text-green text-xs md:text-sm lg:text-base font-black text-center tracking-wider">BY CIRCULWEAR®</h2>
				</div>
				<div class="flex-1 border border-gray-500 shadow-inner backdrop-blur-lg rounded m-1 flex flex-col justify-center items-center p-2 md:p-4" style={boxGradient ? `background:${boxGradient}` : 'linear-gradient(to bottom right, rgba(75,75,75,0.8), rgba(31,31,31,0.8))'}>
					<h2 class="metallic-text text-3xl md:text-5xl lg:text-7xl font-black tracking-wider">3D</h2>
					<h2 class="metallic-text text-base md:text-xl lg:text-2xl font-black tracking-wider">PRINTABLE</h2>
				</div>
			</div>
			<div class="flex-1 border border-gray-500 shadow-inner backdrop-blur-lg rounded m-1" style={boxGradient ? `background:${boxGradient}` : 'linear-gradient(to bottom right, rgba(75,75,75,0.8), rgba(31,31,31,0.8))'}>
				<IronMaterial {modelPath} />
			</div>
		</div>
		<div class="h-32 md:h-32 border border-gray-500 shadow-inner backdrop-blur-lg rounded m-1 flex flex-col items-center justify-center gap-2 md:gap-2 p-4 md:p-4" style={boxGradient ? `background:${boxGradient}` : 'linear-gradient(to bottom right, rgba(75,75,75,0.8), rgba(31,31,31,0.8))'}>
			<h2 class="metallic-text text-base md:text-lg lg:text-xl font-black tracking-wider">UNLIMITED CUSTOMIZATION</h2>
			<h2 class="metallic-text text-base md:text-lg lg:text-xl font-black tracking-wider">UNLEASH YOUR</h2>
			<h2 class="metallic-text-rainbow text-xl md:text-2xl lg:text-3xl font-black tracking-wider">CREATIVITY</h2>
		</div>
		
		<div class="h-32 md:h-32 border border-gray-500 shadow-inner backdrop-blur-lg rounded m-1 flex flex-col items-center justify-center gap-2 md:gap-2 p-4 md:p-4" style={boxGradient ? `background:${boxGradient}` : 'linear-gradient(to bottom right, rgba(75,75,75,0.8), rgba(31,31,31,0.8))'}>
			<h2 class="metallic-text text-base md:text-lg lg:text-xl font-black tracking-wider">CREATED FOR</h2>
			<h2 class="metallic-text-summer text-base md:text-lg lg:text-xl font-black tracking-wider">HOT SUMMER WAVES</h2>
			<h2 class="metallic-text-winter text-base md:text-lg lg:text-xl font-black tracking-wider">COLD WINTER STORMS</h2>
		</div>
	</div>
	

</section> 