# Security Setup Guide

Follow these steps to set up the enhanced security features:

## 1. Install Dependencies

The required packages have been installed:
- `bcryptjs` - Password hashing
- `zod` - Input validation
- `@types/bcryptjs` - TypeScript types

## 2. Database Migration

You need to run a Prisma migration to add the `password` field to the User model:

```bash
npx prisma migrate dev --name add_password_field
```

Or if you prefer to create the migration manually:

```bash
npx prisma migrate dev --create-only --name add_password_field
```

Then edit the migration file and add:
```sql
ALTER TABLE "User" ADD COLUMN "password" TEXT;
```

Then apply it:
```bash
npx prisma migrate dev
```

## 3. Generate Prisma Client

After the migration, regenerate the Prisma client:

```bash
npx prisma generate
```

## 4. Create Admin User

You can create an admin user using the provided script:

```bash
npx tsx scripts/create-admin.ts admin@example.com YourSecurePassword123 "Admin Name"
```

**Note**: You may need to install `tsx` first:
```bash
npm install -D tsx
```

Alternatively, you can create users programmatically in your code:

```typescript
import { createUser } from './lib/auth-utils';

await createUser('admin@example.com', 'secure-password', 'Admin User', 'admin');
```

## 5. Environment Variables

Make sure you have a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
AUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure AUTH_SECRET:
```bash
openssl rand -base64 32
```

## 6. Update Existing Users

If you have existing users without passwords, you'll need to:

1. Either delete them and recreate with passwords
2. Or create a migration script to hash and set passwords for existing users

## 7. Test the Security Features

1. **Test Rate Limiting**: Try logging in with wrong credentials 6 times - you should be blocked
2. **Test File Upload**: Try uploading a non-image file - it should be rejected
3. **Test Authorization**: Try deleting a post you didn't create (as non-admin) - it should fail
4. **Test Input Validation**: Try submitting a post with XSS in the content - it should be sanitized

## Important Notes

- **Existing Users**: Users created before this security update won't have passwords. They'll need to be recreated or have passwords set.
- **Admin Role**: The admin role is now stored in the database. Make sure to set the role to 'ADMIN' (uppercase) when creating admin users.
- **Production**: For production, consider:
  - Using Redis for rate limiting instead of in-memory storage
  - Setting up proper logging and monitoring
  - Regular security audits
  - HTTPS enforcement

## Troubleshooting

### "Property 'password' does not exist" error
- Make sure you've run `npx prisma generate` after the migration
- Restart your development server

### "User has no password set" error
- The user was created before the password field was added
- Create a new user or update the existing user with a password

### Rate limiting not working
- The in-memory rate limiter resets on server restart
- For production, consider using Redis
