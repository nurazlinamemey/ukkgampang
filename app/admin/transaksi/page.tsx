"use client";
import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const transaksiData = [
  { id: 1, kode: "STR-202608-1001", nasabah: "Budi Santoso", tipe: "setor", tanggal: "28 Mei 2024", nilai: 150, status: "selesai" },
  { id: 2, kode: "TKR-202608-5001", nasabah: "Siti Aminah", tipe: "tukar", tanggal: "28 Mei 2024", nilai: 75, status: "diproses" },
  { id: 3, kode: "STR-202608-1002", nasabah: "Dewi Lestari", tipe: "setor", tanggal: "27 Mei 2024", nilai: 55, status: "menunggu_konfirmasi" },
  { id: 4, kode: "TKR-202608-5002", nasabah: "Budi Santoso", tipe: "tukar", tanggal: "26 Mei 2024", nilai: 100, status: "selesai" },
];

export default function TransaksiPage() {
  const [filter, setFilter] = useState("semua");

  const filtered = filter === "semua"
    ? transaksiData
    : transaksiData.filter((t) => t.tipe === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Transaksi</h1>
        <p className="text-gray-500 text-sm mt-1">Semua transaksi penyetoran & penukaran poin</p>
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { key: "semua", label: "Semua" },
          { key: "setor", label: "Penyetoran" },
          { key: "tukar", label: "Penukaran" },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f.key ? "bg-emerald-700 text-white" : "bg-white text-gray-600 border border-gray-200"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Kode</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Nasabah</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Tipe</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Tanggal</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Poin</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 text-sm font-semibold text-gray-800">{t.kode}</td>
                <td className="p-4 text-sm text-gray-600">{t.nasabah}</td>
                <td className="p-4">
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    t.tipe === "setor" ? "text-emerald-700" : "text-orange-600"
                  }`}>
                    {t.tipe === "setor" ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                    {t.tipe === "setor" ? "Setor" : "Tukar"}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{t.tanggal}</td>
                <td className="p-4 text-sm font-bold text-gray-800">{t.nilai} Poin</td>
                <td className="p-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${getStatusColor(t.status)}`}>
                    {t.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}