# Fix Login Error - Database Migration Required

## Problem
You're getting a server-side error when trying to log in. This is because the database migration hasn't been run yet, so the `password` column doesn't exist in the `User` table.

## Solution

### Option 1: Run Migration via Vercel (Recommended)

1. **Connect to your database** from Vercel dashboard
2. **Run the migration SQL** directly:

```sql
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;
```

### Option 2: Run Migration Locally

If you have local database access:

```bash
# Generate migration
npx prisma migrate dev --name add_password_field

# Or apply migration to production
npx prisma migrate deploy
```

### Option 3: Use Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Run migration
vercel env pull .env.local
npx prisma migrate deploy
```

## Temporary Workaround

Until the migration is run, the code includes a **temporary fallback** that allows login for emails containing "admin". This is **NOT SECURE** and should only be used temporarily.

**⚠️ IMPORTANT:** After running the migration:
1. Create admin users with proper passwords using the script:
   ```bash
   npx tsx scripts/create-admin.ts admin@example.com YourSecurePassword123
   ```
2. Remove the temporary fallback code from `auth.ts` (lines with "temporary fallback")

## Verify Migration

After running the migration, verify the column exists:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'password';
```

You should see the `password` column listed.

## Next Steps

1. ✅ Run the database migration
2. ✅ Create admin user with password
3. ✅ Test login
4. ✅ Remove temporary fallback code (if added)

## Need Help?

Check the server logs in Vercel dashboard for detailed error messages. The error should mention "password" or "column" if the migration hasn't been run.
