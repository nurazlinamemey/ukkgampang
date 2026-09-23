"use client";
import { LucideIcon, TrendingUp } from "lucide-react";

export function SaldoCard({ label, saldo, icon: Icon }: { label: string; saldo: number; icon?: LucideIcon }) {
  return (
    <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mb-6">
      <div className="relative z-10">
        <p className="text-green-50 text-sm mb-1 opacity-90">{label}</p>
        <h2 className="text-3xl font-bold mb-4">{saldo.toLocaleString()} Poin</h2>
        <div className="flex items-center gap-2 text-xs bg-white/25 w-fit px-3 py-1.5 rounded-full">
          <TrendingUp size={14} /><span>Aktif</span>
        </div>
      </div>
      {Icon && <div className="absolute -right-6 -bottom-6 opacity-20"><Icon size={120} /></div>}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-12 -left-8 w-40 h-40 bg-white/5 rounded-full" />
    </div>
  );
}

export function InfoCard({ label, value, icon: Icon, iconColor = "text-green-600", iconBg = "bg-green-100" }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      {Icon && <div className={`${iconBg} p-3 rounded-full`}><Icon className={iconColor} size={24} /></div>}
    </div>
  );
}

export function MenuCard({ label, icon: Icon, iconColor = "text-green-600", iconBg = "bg-green-100", href }: any) {
  return (
    <a href={href}
      className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col items-center gap-2 hover:bg-green-50 transition active:scale-95">
      <div className={`${iconBg} p-3 rounded-full ${iconColor}`}>
        <Icon size={24} />
      </div>
      <span className="font-semibold text-gray-700 text-sm text-center">{label}</span>
    </a>
  );
}

export function StatCard({ label, value, icon: Icon, color = "green" }: any) {
  const colorMap: any = {
    green: { bg: "bg-green-100", text: "text-green-600" },
    blue: { bg: "bg-sky-100", text: "text-sky-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-500" },
    purple: { bg: "bg-purple-100", text: "text-purple-500" },
  };
  const c = colorMap[color] || colorMap.green;
  return (
    <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm">
      <div className={`${c.bg} p-3 rounded-full w-fit mb-3`}>
        {Icon && <Icon className={c.text} size={22} />}
      </div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}