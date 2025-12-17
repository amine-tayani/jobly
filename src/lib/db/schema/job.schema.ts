import { relations } from "drizzle-orm"
import {
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import type * as z from "zod"

export const jobTypeEnum = pgEnum("job_type", ["onsite", "hybrid", "remote"])

export const jobs = pgTable("jobs", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	department: varchar("department", { length: 255 }).notNull(),
	type: jobTypeEnum("type").notNull(),
	location: varchar("location", { length: 255 }).notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const applications = pgTable("applications", {
	id: uuid("id").defaultRandom().primaryKey(),

	jobId: uuid("job_id").references(() => jobs.id, {
		onDelete: "set null",
	}),

	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	position: varchar("position", { length: 255 }).notNull(),
	resumeUrl: text("resume_url").notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const jobsRelations = relations(jobs, ({ many }) => ({
	applications: many(applications),
}))

export const applicationsRelations = relations(applications, ({ one }) => ({
	job: one(jobs, {
		fields: [applications.jobId],
		references: [jobs.id],
	}),
}))

export const insertJobSchema = createInsertSchema(jobs)

export const insertApplicationSchema = createInsertSchema(applications)

export const jobFormSchema = insertJobSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})

export const applicationFormSchema = insertApplicationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>

export type jobFormSchema = z.infer<typeof jobFormSchema>
