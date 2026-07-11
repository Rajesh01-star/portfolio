'use server';

import { db } from '../db';
import { visitorsCards } from '../db/schema';
import { desc } from 'drizzle-orm';

export async function getVisitorCards() {
  return await db.select().from(visitorsCards).orderBy(desc(visitorsCards.createdAt));
}
