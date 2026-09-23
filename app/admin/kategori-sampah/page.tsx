"use client";
import { useEffect, useState } from "react";
import { Recycle } from "lucide-react";
import { formatRupiah, getErrorMessage } from "@/lib/utils";
import { kategoriApi } from "@/lib/api-client";

export default function AdminKategoriPage() {
  const [kategori, setKategori] = useState<any[]>([]);
  useEffect(() => {
    kategoriApi.getAll().then((res) => setKategori(res.data || [])).catch((e) => console.log(getErrorMessage(e)));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kategori Sampah</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kategori.map((k: any) => (
          <div key={k.id} className="bg-white p-5 rounded-xl shadow-sm border border-green-100">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-3">
              <Recycle className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{k.namaKategori}</h3>
            <p className="text-sm text-green-600 font-bold">{formatRupiah(k.hargaPerKg)}/kg</p>
            <p className="text-xs text-gray-500">{k.poinPerKg} Poin/kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}