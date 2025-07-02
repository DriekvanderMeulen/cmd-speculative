import type { PageLoad } from './$types'
import pagesData from '$lib/materialPages.json'

// Disable SSR for this page — it relies heavily on browser-only globals like `window`
export const ssr = false

export const load: PageLoad = async ({ params }) => {
	const slug = params.material as keyof typeof pagesData
	const config = pagesData[slug] ?? pagesData['steel']
	return { slug, config }
} 