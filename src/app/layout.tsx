import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "TaskMaster - Simplify Your Task Management",
	description:
		"TaskMaster helps you organize, track, and complete your tasks efficiently.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className="scroll-smooth">
			<body className={`${inter.className} bg-black text-white`}>
				{children}
			</body>
		</html>
	)
}
