import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const visitorsCards = pgTable('visitors_cards', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption').notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
