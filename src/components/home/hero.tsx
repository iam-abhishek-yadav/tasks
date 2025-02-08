import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function Hero() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white  ">
			<div className="container mx-auto text-center">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4">
					Manage Tasks with Ease
				</h1>
				<p className="text-lg sm:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
					TaskMaster helps you organize, track, and complete your tasks
					efficiently.
				</p>
				<div className="flex justify-center space-x-4 mb-8">
					<Button
						size="lg"
						className="bg-white text-black hover:bg-gray-200">
						Get Started
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="bg-transparent border-white text-white hover:bg-gray-800">
						Learn More
					</Button>
				</div>
				<div className="flex justify-center space-x-8">
					<div className="flex items-center">
						<CheckCircle className="text-white mr-2" />
						<span>Easy to use</span>
					</div>
					<div className="flex items-center">
						<CheckCircle className="text-white mr-2" />
						<span>Collaborative</span>
					</div>
					<div className="flex items-center">
						<CheckCircle className="text-white mr-2" />
						<span>Cross-platform</span>
					</div>
				</div>
			</div>
		</section>
	)
}
