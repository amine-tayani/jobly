import { ApplySpontaneousDialog } from "@/components/apply-spontaneous-dialog"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { Route as jobRoute } from "@/routes/jobs/$jobId"
import { useQuery } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { desc } from "drizzle-orm"
import { ChevronRight } from "lucide-react"

export const Route = createFileRoute("/(home)/")({
	component: HomePage,
})

const getJobListings = createServerFn().handler(async () => {
	const data = await db.query.jobs.findMany({
		columns: {
			createdAt: false,
			updatedAt: false,
		},
		orderBy: [desc(jobs.createdAt)],


	})
	return data
})

function HomePage() {
	const { data: jobs = [], isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: getJobListings,
	})

	return (
		<main className="mx-auto max-w-5xl px-6 py-16">
			<div className="mb-2 text-sm text-muted-foreground">
				<Link
					to="/dashboard/jobs"
					className="text-muted-foreground inline-flex items-center font-medium"
				>
					{" "}
					<ChevronRight size={16} className="size-4 mr-2" /> Go to Dashboard
				</Link>
			</div>
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold">Open Positions</h1>
			</div>

			<div className="mb-10 px-6 flex justify-between items-center">
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
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className="grid grid-cols-1 md:grid-cols-5 py-2 first:pt-0 last:pb-0 gap-4 px-6 space-y-3 items-center"
						>
							<div className="md:col-span-2 space-y-2">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
							<div className="hidden md:flex justify-center">
								<Skeleton className="h-4 w-16" />
							</div>
							<div className="hidden md:flex justify-center">
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex justify-end">
								<Skeleton className="h-9 w-16" />
							</div>
						</div>
					))
					: jobs.map((job) => (
						<Link
							to={jobRoute.to}
							params={{ jobId: job.id }}
							key={job.id}
							className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 space-y-3 items-center"
						>
							<div className="md:col-span-2">
								<h3 className="text-lg font-medium">{job.title}</h3>
								<p className="text-sm text-muted-foreground">
									{job.department}
								</p>
							</div>
							<div className="hidden md:flex justify-center">
								<span className="text-sm text-muted-foreground capitalize">
									{job.type}
								</span>
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