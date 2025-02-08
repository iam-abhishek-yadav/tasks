import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
	return (
		<header className="py-4 px-4 sm:px-6 lg:px-8 bg-black">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-white">
					TaskMaster
				</Link>
				<nav className="hidden md:flex space-x-4">
					<Link
						href="#features"
						className="text-gray-300 hover:text-white">
						Features
					</Link>
					<Link
						href="#testimonials"
						className="text-gray-300 hover:text-white">
						Testimonials
					</Link>
					<Link
						href="#pricing"
						className="text-gray-300 hover:text-white">
						Pricing
					</Link>
				</nav>
				<div className="flex space-x-2">
					<Button
						variant="outline"
						className="bg-white text-black hover:text-white hover:bg-gray-800">
						Log in
					</Button>
					<Button
						variant="outline"
						className="bg-white text-black hover:text-white hover:bg-gray-800">
						Sign up
					</Button>
				</div>
			</div>
		</header>
	)
}
