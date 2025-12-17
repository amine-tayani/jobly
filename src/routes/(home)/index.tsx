import { ApplySpontaneousDialog } from "@/components/apply-spontaneous-dialog"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(home)/")({
	component: HomePage,
})

type Job = {
	id: string
	title: string
	department: string
	location: string
	type: "Hybrid" | "Remote" | "Onsite"
}

const jobs: Job[] = [
	{
		id: "1",
		title: "Software engineer",
		department: "Engineering",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
	{
		id: "2",
		title: "UX Designer",
		department: "Design",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
	{
		id: "3",
		title: "Product Manager",
		department: "Product",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
	{
		id: "4",
		title: "Graphic Designer",
		department: "Design",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
	{
		id: "5",
		title: "Marketing Manager",
		department: "Marketing",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
	{
		id: "6",
		title: "Account Manager",
		department: "Customer Success",
		type: "Hybrid",
		location: "Rabat, Morocco",
	},
]

function HomePage() {
	return (
		<main className="mx-auto max-w-5xl px-6 py-16">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold">Open Positions</h1>
			</div>

			<div className="mb-10 px-6 flex justify-between">
				<p className="mt-3 text-muted-foreground font-semibold">
					We have {jobs.length} open positions
				</p>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="All departments" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All departments</SelectItem>
						<SelectItem value="engineering">Engineering</SelectItem>
						<SelectItem value="design">Design</SelectItem>
						<SelectItem value="product">Product</SelectItem>
						<SelectItem value="marketing">Marketing</SelectItem>
						<SelectItem value="customer-success">Customer Success</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="divide-y">
				{jobs.map((job) => (
					<Link
						to={`/jobs/${job.id}`}
						key={job.id}
						className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 space-y-3 items-center"
					>
						<div className="md:col-span-2">
							<h3 className="text-lg font-medium">{job.title}</h3>
							<p className="text-sm text-muted-foreground">{job.department}</p>
						</div>
						<div className="hidden md:flex justify-center">
							<span className="text-sm text-muted-foreground">{job.type}</span>
						</div>
						<div className="hidden md:flex justify-center">
							<span className="text-sm text-muted-foreground">
								{job.location}
							</span>
						</div>
						<div className="flex justify-end">
							<Button variant="outline">Apply</Button>
						</div>
					</Link>
				))}
			</div>

			<div className="mt-16 text-center">
				<p className="mb-4 text-muted-foreground">
					No matching role right now?
				</p>
				<ApplySpontaneousDialog />
			</div>
		</main>
	)
}
