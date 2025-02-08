import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
	const plans = [
		{
			name: "Basic",
			price: "$9.99",
			features: ["Up to 5 projects", "Basic task management", "Email support"],
		},
		{
			name: "Pro",
			price: "$19.99",
			features: [
				"Unlimited projects",
				"Advanced task management",
				"Priority support",
				"Team collaboration",
			],
		},
		{
			name: "Enterprise",
			price: "Custom",
			features: [
				"Custom solutions",
				"Dedicated account manager",
				"24/7 phone support",
				"On-premise deployment",
			],
		},
	]

	return (
		<section
			id="pricing"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
			<div className="container mx-auto">
				<h2 className="text-3xl sm:text-4xl font-normal text-center mb-12 text-white">
					Choose Your Plan
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<div
							key={index}
							className="bg-black p-8 rounded-lg shadow-md flex flex-col border-[0.25px]">
							<h3 className="text-2xl font-bold mb-4 text-white">
								{plan.name}
							</h3>
							<p className="text-4xl font-bold mb-6 text-gray-300">
								{plan.price}
							</p>
							<ul className="mb-8 flex-grow">
								{plan.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className="flex items-center mb-2 text-gray-400">
										<Check className="h-5 w-5 text-white mr-2" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Button className="w-full bg-white text-black hover:bg-gray-200">
								Choose Plan
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
