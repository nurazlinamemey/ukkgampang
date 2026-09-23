"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import { getStatusColor, formatTanggal, getErrorMessage } from "@/lib/utils";
import { setorApi } from "@/lib/api-client";

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [filter, setFilter] = useState("semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setorApi.mySetor()
      .then((res) => setRiwayat(res.data || []))
      .catch((err) => console.log(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "semua"
    ? riwayat
    : riwayat.filter((r: any) => r.status === filter);

  const getIcon = (status: string) => {
    if (status === "selesai" || status === "diverifikasi") return <CheckCircle size={14} />;
    if (status === "menunggu_konfirmasi") return <Clock size={14} />;
    if (status === "ditolak") return <XCircle size={14} />;
    return <FileText size={14} />;
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Riwayat Penyetoran</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[
          { key: "semua", label: "Semua" },
          { key: "menunggu_konfirmasi", label: "Menunggu" },
          { key: "selesai", label: "Selesai" },
          { key: "ditolak", label: "Ditolak" },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              filter === f.key ? "bg-gradient-to-r from-green-400 to-green-600 text-white" : "bg-green-50 text-gray-600"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-8">Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border border-green-100 text-center text-gray-400 text-sm">
          Belum ada data
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r: any) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800 text-xs">{r.kodeSetor}</p>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium flex items-center gap-1 ${getStatusColor(r.status)}`}>
                  {getIcon(r.status)} {r.status?.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div>
                  <p>{formatTanggal(r.tanggal)}</p>
                  <p>{r.totalBeratKg} Kg</p>
                </div>
                <p className="text-green-600 font-bold self-end">+{r.totalPoin} Poin</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}