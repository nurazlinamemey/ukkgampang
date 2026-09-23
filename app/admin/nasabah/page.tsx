"use client";
import { useEffect, useState } from "react";
import { Search, User } from "lucide-react";
import { formatPoin, getErrorMessage } from "@/lib/utils";
import { adminApi } from "@/lib/api-client";

export default function AdminNasabahPage() {
  const [nasabah, setNasabah] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getNasabah()
      .then((res) => setNasabah(res.data || []))
      .catch((err) => console.log(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = nasabah.filter((n: any) =>
    n.namaNasabah?.toLowerCase().includes(search.toLowerCase()) ||
    n.user?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Nasabah</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data nasabah Bank Sampah</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Cari nama atau username..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:outline-none" />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-8">Memuat data...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-green-100">
              <tr>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Nasabah</th>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Kontak</th>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Alamat</th>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Saldo Poin</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n: any) => (
                <tr key={n.id} className="border-b last:border-0 hover:bg-green-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="text-green-600" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{n.namaNasabah}</p>
                        <p className="text-xs text-gray-500">@{n.user?.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{n.telp}</td>
                  <td className="p-4 text-sm text-gray-600">{n.alamat}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {formatPoin(n.saldoPoin)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}