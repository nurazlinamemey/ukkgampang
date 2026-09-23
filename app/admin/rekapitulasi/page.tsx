"use client";
import { BarChart3, TrendingUp, DollarSign, Recycle } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export default function RekapitulasiPage() {
  const breakdown = [
    { jenis: "Plastik", kg: 600, rupiah: 2100000, poin: 6000, color: "emerald" },
    { jenis: "Kertas", kg: 400, rupiah: 800000, poin: 2000, color: "blue" },
    { jenis: "Logam", kg: 150, rupiah: 1800000, poin: 4500, color: "orange" },
    { jenis: "Kaca", kg: 100, rupiah: 150000, poin: 400, color: "purple" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rekapitulasi Bulanan</h1>
        <p className="text-gray-500 text-sm mt-1">Laporan periode Agustus 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-xl text-white">
          <Recycle size={28} className="mb-3 opacity-80" />
          <p className="text-emerald-100 text-sm">Total Tonase</p>
          <p className="text-3xl font-bold">1.250 Kg</p>
          <p className="text-xs text-emerald-100 mt-1">1.25 Ton</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <DollarSign size={28} className="text-emerald-700 mb-3" />
          <p className="text-gray-500 text-sm">Estimasi Pembayaran</p>
          <p className="text-2xl font-bold text-gray-800">{formatRupiah(2875000)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <TrendingUp size={28} className="text-orange-600 mb-3" />
          <p className="text-gray-500 text-sm">Total Poin Diterbitkan</p>
          <p className="text-2xl font-bold text-gray-800">12.900 Poin</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-emerald-700" size={22} />
          <h2 className="font-bold text-gray-800 text-lg">Breakdown per Jenis Sampah</h2>
        </div>

        <div className="space-y-5">
          {breakdown.map((b) => {
            const percent = (b.kg / 1250) * 100;
            return (
              <div key={b.jenis}>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{b.jenis}</p>
                    <p className="text-xs text-gray-500">{b.kg} Kg • {b.poin} Poin</p>
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{formatRupiah(b.rupiah)}</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}