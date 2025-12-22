import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { jobs } from "./schema"

dotenv.config({ path: "./.env.local" })

if (!("DATABASE_URL" in process.env))
	throw new Error("DATABASE_URL not found on .env.local")

const main = async () => {
	const client = new Pool({
		connectionString: process.env.DATABASE_URL,
	})
	const db = drizzle(client)

	const jobsData: (typeof jobs.$inferInsert)[] = [
		{
			title: "Software engineer",
			department: "Engineering",
			type: "hybrid",
			location: "Rabat, Morocco",
			description:
				"We are looking for a talented Software Engineer to join our team...",
		},
		{
			title: "UX Designer",
			department: "Design",
			type: "remote",
			location: "Rabat, Morocco",
			description:
				"Join our design team to create beautiful user experiences...",
		},
		{
			title: "Product Manager",
			department: "Product",
			type: "hybrid",
			location: "Rabat, Morocco",
			description:
				"Lead product strategy and execution for our key initiatives...",
		},
		{
			title: "Graphic Designer",
			department: "Design",
			type: "hybrid",
			location: "Rabat, Morocco",
			description:
				"Create stunning visual designs for our marketing materials...",
		},
		{
			title: "Marketing Manager",
			department: "Marketing",
			type: "hybrid",
			location: "Rabat, Morocco",
			description:
				"Drive marketing strategy and campaigns to grow our brand...",
		},
		{
			title: "Account Manager",
			department: "Customer Success",
			type: "hybrid",
			location: "Rabat, Morocco",
			description:
				"Build and maintain strong relationships with our key clients...",
		},
	]

	console.log("Start jobs seeding...")
	await db.insert(jobs).values(jobsData)
	console.log(`Seeding is finished - added ${jobsData.length} jobs`)

	await client.end()
}

main().catch((err) => {
	console.error("Seed error:", err)
	process.exit(1)
})
