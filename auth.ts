import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { authConfig } from "./auth.config" // <--- Import cấu hình nhẹ

const prisma = new PrismaClient()

// Ghép Prisma Adapter vào cấu hình nhẹ
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig, // <--- Spread cấu hình từ file kia sang
})