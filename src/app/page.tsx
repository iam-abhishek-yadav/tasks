import {
	Features,
	Footer,
	Header,
	Hero,
	Pricing,
	Testimonials,
} from "@/components/home"
import { Separator } from "@/components/ui/separator"

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-slate-900">
			<Header />
			<Separator className="h-[0.5px]" />
			<main>
				<Hero />
				<Features />
				<Testimonials />
				<Pricing />
			</main>
			<Footer />
		</div>
	)
}
