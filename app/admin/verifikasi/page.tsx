"use client";
import { useEffect, useState } from "react";
import { getStatusColor, formatTanggal, getErrorMessage } from "@/lib/utils";
import { adminApi } from "@/lib/api-client";

export default function VerifikasiPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    adminApi.listSetoran().then((res) => setData(res.data || [])).catch((e) => console.log(getErrorMessage(e)));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Verifikasi Penyetoran</h1>
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-50 border-b border-green-100">
            <tr>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Kode</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Nasabah</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Berat</th>
              <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: any) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-4 text-sm font-semibold">{p.kodeSetor}</td>
                <td className="p-4 text-sm">{p.nasabah?.namaNasabah}</td>
                <td className="p-4 text-sm">{p.totalBeratKg} Kg</td>
                <td className="p-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${getStatusColor(p.status)}`}>
                    {p.status?.replace("_", " ")}
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