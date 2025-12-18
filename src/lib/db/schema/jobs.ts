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
import { applications } from "./applications"

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

export const jobsRelations = relations(jobs, ({ many }) => ({
	applications: many(applications),
}))

export const insertJobSchema = createInsertSchema(jobs)

export const jobFormSchema = insertJobSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})

export type jobFormSchema = z.infer<typeof jobFormSchema>
