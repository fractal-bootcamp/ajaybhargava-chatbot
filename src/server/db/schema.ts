import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey(),
  name: text("name").default("New Chat"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chatbotMessages = pgTable(
  "messages",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    sessionId: uuid("session_id")
      .references(() => sessions.id)
      .notNull(),
    role: text("role").notNull(), 
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
);

export const toolInvocations = pgTable("tool_invocations", {
  id: varchar('id', { length: 255 }).primaryKey(),
  messageId: varchar('message_id', { length: 255 })
    .references(() => chatbotMessages.id)
    .notNull(),
  toolName: text('tool_name').notNull(),
  args: jsonb('args'),        
  result: jsonb('result'),    
  state: text('state').notNull(), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const uiComponents = pgTable("ui_components", {
  id: varchar("id", { length: 255 }).primaryKey(),
  messageId: varchar("message_id")
    .references(() => chatbotMessages.id)
    .notNull(),
  componentType: text("component_type").notNull(),
  componentProps: jsonb("component_props"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type ChatbotMessage = typeof chatbotMessages.$inferSelect;
export type ToolInvocation = typeof toolInvocations.$inferSelect;
export type UIComponent = typeof uiComponents.$inferSelect;