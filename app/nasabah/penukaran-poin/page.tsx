"use client";
import { useEffect, useState } from "react";
import { Gift, Star } from "lucide-react";
import { formatPoin, getErrorMessage } from "@/lib/utils";
import { hadiahApi, penukaranApi, dashboardApi } from "@/lib/api-client";

export default function PenukaranPoinPage() {
  const [hadiah, setHadiah] = useState<any[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hadiahApi.getAll()
      .then((res) => setHadiah(res.data || []))
      .catch((err) => console.log(getErrorMessage(err)));

    dashboardApi.summary()
      .then((res) => setSaldo(res.data?.saldo || 0))
      .catch((err) => console.log(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleTukar = async (h: any) => {
    if (saldo < h.poinDibutuhkan) return alert("Saldo poin tidak cukup!");
    if (h.stok === 0) return alert("Stok habis!");
    if (!confirm(`Tukar ${h.poinDibutuhkan} poin dengan ${h.namaHadiah}?`)) return;
    try {
      await penukaranApi.tukar(h.id);
      alert("Penukaran berhasil! Tunggu verifikasi admin.");
      setSaldo(saldo - h.poinDibutuhkan);
    } catch (err: any) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Star size={16} />
          <p className="text-green-50 text-sm">Saldo Poin Kamu</p>
        </div>
        <h2 className="text-2xl font-bold">{formatPoin(saldo)}</h2>
      </div>

      <h1 className="text-xl font-bold text-gray-800 mb-4">Katalog Hadiah</h1>
      {loading ? (
        <div className="text-center text-gray-400 py-8">Memuat data...</div>
      ) : (
        <div className="space-y-3">
          {hadiah.map((h: any) => (
            <div key={h.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <Gift size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{h.namaHadiah}</p>
                  <p className="text-xs text-gray-500">Stok: {h.stok}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600 text-sm mb-1">{formatPoin(h.poinDibutuhkan)}</p>
                <button onClick={() => handleTukar(h)}
                  disabled={saldo < h.poinDibutuhkan || h.stok === 0}
                  className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition">
                  {h.stok === 0 ? "Habis" : "Tukar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}