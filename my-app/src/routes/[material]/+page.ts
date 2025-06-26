import type { PageLoad } from './$types'
import pagesData from '$lib/materialPages.json'

export const load: PageLoad = async ({ params }) => {
	const slug = params.material as keyof typeof pagesData
	const config = pagesData[slug] ?? pagesData['steel']
	return { slug, config }
} 