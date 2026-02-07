// File: app/login/actions.ts
'use server';

import { signIn } from "@/auth";

export async function handleLogin(formData: FormData) {
  await signIn("credentials", formData);
}