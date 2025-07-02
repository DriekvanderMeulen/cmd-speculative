import Slideshow from '../components/Slideshow'

interface HomeProps {
	images: Array<string>
}

export default function Home({ images }: HomeProps) {
	return <Slideshow images={images} />
}

export async function getStaticProps() {
	const path = await import('path')
	const fs = await import('fs')
	const postersDir = path.join(process.cwd(), 'public', 'posters')
	const files = await fs.promises.readdir(postersDir)
	const images = files.filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file)).map((file) => `/posters/${file}`)
	return { props: { images } }
}
