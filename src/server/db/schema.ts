// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";


export const chatbotMessages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey(),
    role: text("role").notNull(), 
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
);

export const toolInvocations = pgTable("tool_invocations", {
  id: uuid('id').primaryKey(),
  messageId: integer('message_id')
    .references(() => chatbotMessages.id)
    .notNull(),
  toolName: text('tool_name').notNull(),
  args: jsonb('args'),        
  result: jsonb('result'),    
  state: text('state').notNull(), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const uiComponents = pgTable("ui_components", {
  id: uuid("id").primaryKey(),
  messageId: integer("message_id")
    .references(() => chatbotMessages.id)
    .notNull(),
  componentType: text("component_type").notNull(),
  componentProps: jsonb("component_props"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatbotMessage = typeof chatbotMessages.$inferSelect;
export type ToolInvocation = typeof toolInvocations.$inferSelect;
export type UIComponent = typeof uiComponents.$inferSelect;