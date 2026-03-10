// File: app/actions.ts - Enhanced with security
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { 
  postSchema, 
  sanitizeFilename, 
  isValidImageFile, 
  MAX_FILE_SIZE,
  sanitizeHtml,
  isValidImageUrl 
} from "@/lib/security"

// --- 1. HÀM TẠO BÀI VIẾT (Enhanced with security) ---
export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error("Bạn cần đăng nhập!")
  }

  // Check admin role
  const userRole = (session.user as any)?.role;
  if (userRole !== 'admin') {
    throw new Error("Chỉ admin mới có quyền tạo bài viết!")
  }

  // Get and validate input
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const imageFile = formData.get("imageFile") as File;
  const imageUrlInput = formData.get("imageUrl") as string;

  // Validate input with schema
  const validationResult = postSchema.safeParse({
    title,
    content,
    imageUrl: imageUrlInput || '',
  });

  if (!validationResult.success) {
    // Thêm 'as any' để TypeScript không soi mói lỗi này nữa
    const validationError = validationResult.error as any;
    throw new Error("Dữ liệu không hợp lệ: " + validationError.issues.map((e: any) => e.message).join(", "));
  }

  // Sanitize content to prevent XSS
  const sanitizedTitle = title.trim().substring(0, 200);
  const sanitizedContent = sanitizeHtml(content.trim());

  let finalImageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

  // Xử lý Upload Ảnh với bảo mật
  if (imageFile && imageFile.size > 0) {
    try {
      // Validate file size
      if (imageFile.size > MAX_FILE_SIZE) {
        throw new Error(`File quá lớn! Kích thước tối đa là ${MAX_FILE_SIZE / 1024 / 1024}MB`)
      }

      // Validate file type
      if (!isValidImageFile(imageFile)) {
        throw new Error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)")
      }

      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Sanitize filename to prevent path traversal
      const sanitizedOriginalName = sanitizeFilename(imageFile.name)
      const filename = `${Date.now()}-${sanitizedOriginalName}`
      const uploadDir = path.join(process.cwd(), "public", "uploads")
      
      // Ensure upload directory exists
      await mkdir(uploadDir, { recursive: true })
      
      // Write file with sanitized path
      const filePath = path.join(uploadDir, filename)
      // Additional security: ensure path is within upload directory
      const resolvedPath = path.resolve(filePath)
      const resolvedDir = path.resolve(uploadDir)
      if (!resolvedPath.startsWith(resolvedDir)) {
        throw new Error("Invalid file path")
      }
      
      await writeFile(filePath, buffer)
      finalImageUrl = `/uploads/${filename}`
    } catch (error) {
      console.error("Lỗi upload:", error)
      throw error
    }
  } else if (imageUrlInput && imageUrlInput.trim()) {
    // Validate image URL to prevent SSRF
    if (isValidImageUrl(imageUrlInput)) {
      finalImageUrl = imageUrlInput.trim();
    } else {
      throw new Error("URL ảnh không hợp lệ hoặc không được phép")
    }
  }

  // Create post with author relationship
  await prisma.post.create({
    data: {
      title: sanitizedTitle,
      content: sanitizedContent,
      imageUrl: finalImageUrl,
      published: true,
      authorId: (session.user as any)?.id || null,
    },
  })

  revalidatePath("/blog")
  redirect("/blog")
}

// --- 2. HÀM XÓA BÀI VIẾT (Enhanced with authorization) ---
export async function deletePost(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error("Bạn cần đăng nhập để xóa bài!")
  }

  const postId = formData.get("postId") as string

  if (!postId || typeof postId !== 'string') {
    throw new Error("ID bài viết không hợp lệ")
  }

  // Get the post to check ownership
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  })

  if (!post) {
    throw new Error("Bài viết không tồn tại")
  }

  const userId = (session.user as any)?.id
  const userRole = (session.user as any)?.role

  // Authorization: Only admin or post owner can delete
  if (userRole !== 'admin' && post.authorId !== userId) {
    throw new Error("Bạn không có quyền xóa bài viết này!")
  }

  await prisma.post.delete({
    where: { id: postId },
  })
  
  revalidatePath("/blog")
}

// --- 3. HÀM ĐĂNG XUẤT (MỚI THÊM VÀO CUỐI FILE) ---
export async function handleSignOut() {
  // Hàm này sẽ được gọi từ Client Component (HomeContent)
  await signOut({ redirectTo: "/" });
}