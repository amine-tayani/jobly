import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import * as z from "zod"
import { jobs } from "./jobs"

export const applications = pgTable("applications", {
	id: uuid("id").defaultRandom().primaryKey(),
	jobId: uuid("job_id").references(() => jobs.id, { onDelete: "set null" }),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	position: varchar("position", { length: 255 }).notNull(),
	resumeUrl: text("resume_url").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const applicationsRelations = relations(applications, ({ one }) => ({
	job: one(jobs, {
		fields: [applications.jobId],
		references: [jobs.id],
	}),
}))

export const insertApplicationSchema = createInsertSchema(applications, {
	email: z.email(),
	name: z.string().nonempty({ error: "Name is required*" }),
	position: z.string().nonempty({ error: "Position is required*" }),
})

export const applicationFormSchema = insertApplicationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	resumeUrl: true,
	jobId: true,
})

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>
