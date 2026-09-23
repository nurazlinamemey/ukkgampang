"use client";
import { useEffect, useState } from "react";
import { Users, Package, TrendingUp, Gift } from "lucide-react";
import { StatCard } from "@/components/ui/Card";
import { dashboardApi } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    dashboardApi.stats()
      .then((res) => setStats(res.data || {}))
      .catch((err) => console.log(getErrorMessage(err)));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas Bank Sampah</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Nasabah" value={stats.totalNasabah || 0} icon={Users} color="green" />
        <StatCard label="Kategori Sampah" value={stats.totalKategoriSampah || 0} icon={Package} color="blue" />
        <StatCard label="Transaksi Setor" value={stats.totalTransaksiSetor || 0} icon={TrendingUp} color="orange" />
        <StatCard label="Total Hadiah" value={stats.totalHadiah || 0} icon={Gift} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="font-bold text-gray-800 mb-4">Ringkasan Data</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-green-50">
              <span className="text-sm text-gray-600">Total Berat Sampah</span>
              <span className="font-bold text-green-600">{stats.totalBeratSampahKg || 0} Kg</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-green-50">
              <span className="text-sm text-gray-600">Poin Tersalurkan</span>
              <span className="font-bold text-green-600">{stats.totalPoinTersalurkan || 0} Poin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}