"use client";
import { Home, Wallet, Newspaper, Gift, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const menus = [
    { name: "Home", icon: Home, path: "/nasabah/dashboard" },
    { name: "Setor", icon: Wallet, path: "/nasabah/setor-sampah" },
    { name: "Kategori", icon: Newspaper, path: "/nasabah/kategori-sampah" },
    { name: "Tukar", icon: Gift, path: "/nasabah/penukaran-poin" },
    { name: "Akun", icon: User, path: "/nasabah/riwayat" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 max-w-md mx-auto flex justify-around py-3 z-50 shadow-[0_-4px_20px_rgba(74,222,128,0.1)]">
      {menus.map((m) => {
        const isActive = pathname === m.path;
        const Icon = m.icon;
        return (
          <Link key={m.name} href={m.path}
            className={`flex flex-col items-center transition ${isActive ? "text-green-600" : "text-gray-400"}`}>
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{m.name}</span>
          </Link>
        );
      })}
    </div>
  );
}