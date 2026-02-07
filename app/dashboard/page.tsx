// File: app/dashboard/page.tsx
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <p>Role: {(session.user as any).role}</p> 
      
      <form action={async () => { "use server"; await signOut(); }}>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </form>
    </div>
  );
}