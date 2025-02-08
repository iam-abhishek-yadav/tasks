import { CheckSquare, Users, Zap, Bell } from "lucide-react"

export default function Features() {
	const features = [
		{
			icon: <CheckSquare className="h-6 w-6 text-white" />,
			title: "Task Management",
			description: "Create, organize, and track your tasks with ease.",
		},
		{
			icon: <Users className="h-6 w-6 text-white" />,
			title: "Collaboration",
			description: "Work together with your team in real-time.",
		},
		{
			icon: <Zap className="h-6 w-6 text-white" />,
			title: "Productivity Boost",
			description: "Increase your efficiency with our intuitive interface.",
		},
		{
			icon: <Bell className="h-6 w-6 text-white" />,
			title: "Reminders",
			description: "Never miss a deadline with customizable notifications.",
		},
	]

	return (
		<section
			id="features"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
			<div className="container mx-auto">
				<h2 className="text-3xl sm:text-4xl font-normal text-center mb-12 text-white">
					Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="p-6 rounded-lg shadow-md">
							<div className="mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold mb-2 text-white">
								{feature.title}
							</h3>
							<p className="text-gray-400">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
