import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
	return (
		<footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">
							TaskMaster
						</h3>
						<p className="text-gray-400">
							Simplify your task management and boost productivity.
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 text-white">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="#features"
									className="text-gray-400 hover:text-white">
									Features
								</Link>
							</li>
							<li>
								<Link
									href="#testimonials"
									className="text-gray-400 hover:text-white">
									Testimonials
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="text-gray-400 hover:text-white">
									Pricing
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white">
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white">
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
						<div className="flex space-x-4">
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<Facebook className="h-6 w-6" />
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<Twitter className="h-6 w-6" />
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<Instagram className="h-6 w-6" />
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white">
								<Linkedin className="h-6 w-6" />
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 text-center">
					<p className="text-gray-400">
						&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
