import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // <--- THÊM DÒNG NÀY (BẮT BUỘC)
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Trả về user giả lập để test
        const user = { id: "1", name: "Mentor Demo", email: "demo@example.com" }
        return user
      },
    }),
  ],
})