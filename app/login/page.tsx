// File: app/login/page.tsx
import RegistrationForm from "@/components/RegistrationForm"; // Import giao diện cũ của bạn

export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50">
      {/* Hiển thị Form đăng nhập/đăng ký cũ của bạn */}
      <RegistrationForm />
    </div>
  );
}