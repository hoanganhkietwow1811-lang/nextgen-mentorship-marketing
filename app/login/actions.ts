// File: app/login/actions.ts
'use server';

import { signIn } from "@/auth";

export async function handleLogin(formData: FormData) {
  // Thêm dòng redirectTo: "/"
  await signIn("credentials", formData, { redirectTo: "/" });
}