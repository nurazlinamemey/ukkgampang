"use client";
import { LayoutDashboard, Users, Package, Gift, ClipboardCheck, FileText, BarChart3, LogOut, Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Data Nasabah", icon: Users, path: "/admin/nasabah" },
    { name: "Kategori Sampah", icon: Package, path: "/admin/kategori-sampah" },
    { name: "Hadiah", icon: Gift, path: "/admin/hadiah" },
    { name: "Verifikasi Setoran", icon: ClipboardCheck, path: "/admin/verifikasi" },
    { name: "Transaksi", icon: FileText, path: "/admin/transaksi" },
    { name: "Rekapitulasi", icon: BarChart3, path: "/admin/rekapitulasi" },
  ];

  const handleLogout = () => { localStorage.clear(); router.push("/login"); };

  return (
    <aside className="w-64 bg-gradient-to-b from-green-500 to-green-700 text-white min-h-screen flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="bg-white/20 p-2 rounded-lg"><Leaf size={24} /></div>
        <div>
          <h1 className="font-bold text-lg">Bank Sampah</h1>
          <p className="text-xs text-green-50 opacity-80">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menus.map((m) => {
          const isActive = pathname === m.path;
          const Icon = m.icon;
          return (
            <Link key={m.name} href={m.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`}>
              <Icon size={20} />
              <span className="text-sm">{m.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/25 hover:bg-red-500/40 transition text-red-50 font-semibold">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}