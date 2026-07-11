'use server';

import { put } from '@vercel/blob';
import { db } from '../db';
import { visitorsCards } from '../db/schema';
import { revalidatePath } from 'next/cache';

export async function uploadVisitorCard(formData: FormData) {
  const file = formData.get('file') as File;
  const caption = formData.get('caption') as string;
  const username = formData.get('username') as string;

  if (!file || !caption || !username) {
    throw new Error('Missing required fields');
  }

  // Upload to Vercel Blob
  const blob = await put(file.name, file, {
    access: 'public',
  });

  // Save to Neon Database
  await db.insert(visitorsCards).values({
    imageUrl: blob.url,
    caption,
    username,
  });

  revalidatePath('/');
  return { success: true, url: blob.url };
}
