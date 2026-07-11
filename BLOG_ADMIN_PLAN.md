# Blog and Admin Implementation Plan

This document outlines the planned approach for replacing dummy blogs with real, database-backed blogs, and introducing a secure way to log in as an admin to manage (create, edit, delete) them.

## Authentication Approach
Since this is a personal portfolio and only the owner needs admin access, a lightweight, password-based authentication system will be used rather than a full third-party provider like Clerk or NextAuth.

1. Define an `ADMIN_PASSWORD` in the `.env` file.
2. Create a login page (`/admin/login`).
3. Upon successful login, securely set an HTTP-only JWT cookie that grants access to the `/admin` dashboard and API routes.

## Database Changes
Using Drizzle ORM, add a new `blogs` table to the database.

**Table Schema (`src/db/schema.ts`):**
- `id` (serial, primary key)
- `title` (text)
- `slug` (varchar, unique)
- `content` (text, storing markdown or HTML)
- `views` (integer, default 0)
- `published` (boolean, default true)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Required Dependencies
- `jose`: For lightweight, edge-compatible JWT signing and verification (compatible with Next.js Edge Middleware).

## New Routes & Files

### API & Middleware
- **`src/middleware.ts`**: Next.js middleware to protect all routes under `/admin` (except `/admin/login`). It will verify the JWT in the `admin_token` cookie.
- **`src/app/api/auth/login/route.ts`**: API route that accepts a password, compares it to `process.env.ADMIN_PASSWORD`, and sets a secure HTTP-only cookie with a JWT.
- **`src/app/api/auth/logout/route.ts`**: Clears the `admin_token` cookie.
- **`src/app/api/blogs/route.ts`**: API route for CRUD operations on blogs (protected by middleware for write operations).

### Admin Dashboard (Protected Routes)
- **`src/app/admin/login/page.tsx`**: A styled login form for the admin.
- **`src/app/admin/layout.tsx`**: A layout wrapper for the admin dashboard (e.g., sidebar with links to "Manage Blogs").
- **`src/app/admin/page.tsx`**: The main admin dashboard listing all blogs with Edit and Delete buttons.
- **`src/app/admin/blogs/new/page.tsx`** & **`src/app/admin/blogs/[id]/page.tsx`**: Pages containing the form to create or edit a blog post. (Need to decide between Markdown vs. Rich Text Editor).

### Public Blog UI
- **`src/components/BlogList.tsx`**: Update the component to fetch from the database directly, replacing the hardcoded `posts` array.
- **`src/app/blog/page.tsx`**: Update the public blog listing to fetch from the DB.
- **`src/app/blog/[slug]/page.tsx`**: Update to render individual blogs and increment the `views` count when visited.

## Open Decisions for Later
1. **Content Editor**: Decide whether to use a simple Markdown editor or a Rich Text Editor (WYSIWYG) for writing blogs.
2. **Blog Slug Generation**: Decide if the URL slug should be generated automatically from the title or manually inputted.
