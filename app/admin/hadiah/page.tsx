"use client";
import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { formatPoin, getErrorMessage } from "@/lib/utils";
import { hadiahApi } from "@/lib/api-client";

export default function AdminHadiahPage() {
  const [hadiah, setHadiah] = useState<any[]>([]);
  useEffect(() => {
    hadiahApi.getAll().then((res) => setHadiah(res.data || [])).catch((e) => console.log(getErrorMessage(e)));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Katalog Hadiah</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hadiah.map((h: any) => (
          <div key={h.id} className="bg-white p-5 rounded-xl shadow-sm border border-green-100">
            <div className="bg-orange-100 p-3 rounded-full w-fit mb-3">
              <Gift className="text-orange-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{h.namaHadiah}</h3>
            <p className="text-sm text-orange-600 font-bold">{formatPoin(h.poinDibutuhkan)}</p>
            <p className="text-xs text-gray-500">Stok: {h.stok}</p>
          </div>
        ))}
      </div>
    </div>
  );
}