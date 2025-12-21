import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const getJobInfo = createServerFn({ method: "GET" })
	.validator((jobId: string) => {
		if (!jobId) {
			throw new Error("Invalid jobId")
		}
		return jobId
	})
	.handler(async ({ data }: { data: string }) => {
		try {
			const job = db.query.jobs.findFirst({
				where: eq(jobs.id, data),
				columns: {
					createdAt: false,
					updatedAt: false,
				},
			})

			if (!job) {
				throw new Error("Job not found")
			}

			return job
		} catch (error) {
			console.error("Error fetching job:", error)
			throw new Error("Failed to fetch job")
		}
	})
