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

  // Generate a unique filename to prevent collisions
  const uniqueFilename = `${Date.now()}-${file.name}`;

  // Upload to Vercel Blob
  const blob = await put(uniqueFilename, file, {
    access: 'public',
    addRandomSuffix: true,
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
