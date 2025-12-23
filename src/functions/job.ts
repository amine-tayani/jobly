import { db } from "@/lib/db"
import { jobFormSchema, jobs } from "@/lib/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { desc, eq, inArray } from "drizzle-orm"
import z from "zod"

export const getAllJobsFn = createServerFn().handler(async () => {
	const data = await db.select().from(jobs).orderBy(desc(jobs.createdAt))
	return data
})

export const getJobInfoFn = createServerFn({ method: "GET" })
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

export const createJobFn = createServerFn({ method: "POST" })
	.validator(jobFormSchema)
	.handler(async ({ data }) => {
		try {
			await db.insert(jobs).values(data)
			return {
				message: "Job created successfully",
			}
		} catch (error) {
			console.error("Error creating job:", error)
			throw new Error("Failed to create job")
		}
	})

// export const updateJobFn = createServerFn({ method: "POST" })

export const singleOrBulkDeleteJobFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			ids: z.array(z.string()),
		}),
	)
	.handler(async ({ data }) => {
		try {
			const ids = data.ids

			await db.transaction(async (tx) => {
				await tx.delete(jobs).where(inArray(jobs.id, ids))
				await tx.delete(jobs).where(inArray(jobs.id, ids))
			})

			return { success: true }
		} catch (error) {
			console.error("Error deleting job:", error)
			throw new Error("Failed to delete job")
		}
	})
