// app/admin/layout.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decryptKey } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const accessKey = localStorage.getItem("accessKey");
    if (
      !accessKey ||
      decryptKey(accessKey) !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY
    ) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    ); 
  }

  return <div>{children}</div>;
}
