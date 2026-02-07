import { auth } from "@/auth"; // Cái này chỉ chạy được ở Server
import HomeContent from "@/components/HomeContent"; // Import file Client vừa tạo

export default async function Home() {
  // Lấy session ở phía Server (an toàn và chuẩn)
  const session = await auth();

  // Truyền session xuống cho Client Component xử lý giao diện
  return <HomeContent session={session} />;
}