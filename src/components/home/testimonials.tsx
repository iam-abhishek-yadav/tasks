import Image from "next/image"

export default function Testimonials() {
	const testimonials = [
		{
			name: "John Doe",
			role: "Project Manager",
			content:
				"TaskMaster has revolutionized how our team manages projects. It's intuitive and powerful!",
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			name: "Jane Smith",
			role: "Freelancer",
			content:
				"As a freelancer, TaskMaster helps me stay organized and meet all my deadlines. Highly recommended!",
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			name: "Mike Johnson",
			role: "Student",
			content:
				"TaskMaster has been a game-changer for my studies. I can easily track assignments and study schedules.",
			avatar: "/placeholder.svg?height=100&width=100",
		},
	]

	return (
		<section
			id="testimonials"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
			<div className="container mx-auto">
				<h2 className="text-3xl sm:text-4xl font-normal text-center mb-12 text-white">
					What Our Users Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-black p-6 rounded-lg shadow-md">
							<p className="text-gray-300 mb-4">
								&quot;{testimonial.content}&quot;
							</p>
							<div className="flex items-center">
								<Image
									src={testimonial.avatar || "/placeholder.svg"}
									alt={testimonial.name}
									width={50}
									height={50}
									className="rounded-full mr-4"
								/>
								<div>
									<h3 className="font-semibold text-white">
										{testimonial.name}
									</h3>
									<p className="text-gray-400 text-sm">{testimonial.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
