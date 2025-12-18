import { db } from "@/lib/db"
import { applications } from "@/lib/db/schema/applications"
import { uploadPDF } from "@/utils/upload"
import { createServerFn } from "@tanstack/react-start"
import * as z from "zod"

export const submitApplicationFn = createServerFn({ method: "POST" })
	.validator(z.instanceof(FormData))
	.handler(async ({ data }) => {
		const resume = data.get("resume") as File

		const name = data.get("name") as string
		const email = data.get("email") as string
		const position = data.get("position") as string

		if (!(resume instanceof File)) {
			throw new Error("File is invalid")
		}

		const resumePath = await uploadPDF(resume)

		await db.insert(applications).values({
			name,
			email,
			position,
			resumeUrl: resumePath,
		})

		return {
			message:
				"Application submitted successfully. We'll get back to you soon.",
		}
	})
