'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export async function createPost(formData: FormData) {
  // 1. Kiểm tra đăng nhập
  const session = await auth()
  if (!session) {
    throw new Error("Bạn cần đăng nhập để viết bài!") // Bảo mật
  }

  // 2. Lấy dữ liệu
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  // 3. Lưu vào Database
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: true, // Đăng luôn
      // authorId: session.user.id (Tạm thời chưa gắn ID để tránh lỗi nếu chưa đồng bộ User)
    },
  })

  // 4. Cập nhật lại trang Blog và quay về đó
  revalidatePath("/blog")
  redirect("/blog")
}