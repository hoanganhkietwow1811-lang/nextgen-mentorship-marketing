// File: app/actions.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth" // <--- THÊM signOut vào đây
import { writeFile, mkdir } from "fs/promises"
import path from "path"

// --- 1. HÀM TẠO BÀI VIẾT (Giữ nguyên logic cũ) ---
export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Bạn cần đăng nhập!")

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const imageFile = formData.get("imageFile") as File;
  const imageUrlInput = formData.get("imageUrl") as string;

  let finalImageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

  // Xử lý Upload Ảnh
  if (imageFile && imageFile.size > 0) {
    try {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      // Thêm timestamp để tránh trùng tên
      const filename = `${Date.now()}-${imageFile.name.replaceAll(" ", "_")}`
      const uploadDir = path.join(process.cwd(), "public", "uploads")
      
      // Tạo thư mục nếu chưa có
      await mkdir(uploadDir, { recursive: true })
      
      await writeFile(path.join(uploadDir, filename), buffer)
      finalImageUrl = `/uploads/${filename}`
    } catch (error) {
      console.error("Lỗi upload:", error)
    }
  } else if (imageUrlInput) {
    finalImageUrl = imageUrlInput;
  }

  await prisma.post.create({
    data: {
      title,
      content,
      imageUrl: finalImageUrl,
      published: true,
      // authorId: session.user?.id (Bỏ comment nếu database đã có quan hệ)
    },
  })

  revalidatePath("/blog")
  redirect("/blog")
}

// --- 2. HÀM XÓA BÀI VIẾT (Giữ nguyên logic cũ) ---
export async function deletePost(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Bạn cần đăng nhập để xóa bài!")

  const postId = formData.get("postId") as string

  if (postId) {
    await prisma.post.delete({
      where: { id: postId },
    })
    revalidatePath("/blog")
  }
}

// --- 3. HÀM ĐĂNG XUẤT (MỚI THÊM VÀO CUỐI FILE) ---
export async function handleSignOut() {
  // Hàm này sẽ được gọi từ Client Component (HomeContent)
  await signOut({ redirectTo: "/" });
}