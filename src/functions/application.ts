import { db } from "@/lib/db"
import { applications } from "@/lib/db/schema/applications"
import { uploadPDF } from "@/utils/upload"
import { createServerFn } from "@tanstack/react-start"
import { desc } from "drizzle-orm"
import * as z from "zod"

export const getAllJobApplicationsFn = createServerFn().handler(async () => {
	const data = await db
		.select()
		.from(applications)
		.orderBy(desc(applications.createdAt))
	return data
})

export const submitApplicationFn = createServerFn({
	method: "POST",
})
	.validator(z.instanceof(FormData))
	.handler(async ({ data }) => {
		const resume = data.get("resume") as File

		const name = data.get("name") as string
		const email = data.get("email") as string
		const position = data.get("position") as string
		const job_id = data.get("job_id") as string | null

		if (!resume || !(resume instanceof File)) {
			throw new Error("File is invalid")
		}

		const resumePath = await uploadPDF(resume)

		try {
			await db.insert(applications).values({
				name,
				email,
				position,
				jobId: job_id || null,
				resumeUrl: resumePath,
			})
		} catch (err) {
			console.log("Error while submitting application", err)
			throw new Error("Failed to submit application.")
		}

		return {
			message:
				"Application submitted successfully. We'll get back to you soon.",
		}
	})
