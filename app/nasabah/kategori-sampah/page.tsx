"use client";
import { useEffect, useState } from "react";
import { Recycle } from "lucide-react";
import { formatRupiah, getErrorMessage } from "@/lib/utils";
import { kategoriApi } from "@/lib/api-client";

export default function KategoriPage() {
  const [kategori, setKategori] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kategoriApi.getAll()
      .then((res) => setKategori(res.data || []))
      .catch((err) => console.log(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Daftar Harga Sampah</h1>
      {loading ? (
        <div className="text-center text-gray-400 py-8">Memuat data...</div>
      ) : (
        <div className="grid gap-3">
          {kategori.map((k: any) => (
            <div key={k.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Recycle size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{k.namaKategori}</p>
                  <p className="text-xs text-gray-500">{k.poinPerKg} Poin/kg • {k.jenis}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600 text-sm">{formatRupiah(k.hargaPerKg)}</p>
                <p className="text-[10px] text-gray-400">per kg</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}