"use client";
import { useState } from "react";
import { Plus, Trash2, Send, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const kategoriSampah = [
  { id: 1, nama: "Botol Plastik PET", harga: 3500, poin: 10 },
  { id: 2, nama: "Kardus & Karton", harga: 2000, poin: 5 },
  { id: 3, nama: "Kaleng Aluminium", harga: 12000, poin: 30 },
  { id: 4, nama: "Botol Kaca Bening", harga: 1500, poin: 4 },
];

export default function SetorSampahPage() {
  const [items, setItems] = useState([{ kategori_id: "", berat: 0 }]);
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (i: number, field: string, val: any) => {
    const n = [...items]; n[i] = { ...n[i], [field]: val }; setItems(n);
  };
  const addItem = () => setItems([...items, { kategori_id: "", berat: 0 }]);
  const removeItem = (i: number) => items.length > 1 && setItems(items.filter((_, x) => x !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      alert("Pengajuan berhasil dikirim! Tunggu verifikasi admin.");
      router.push("/riwayat");
      setLoading(false);
    }, 800);
  };

  const hitungTotal = () => items.reduce((t, item) => {
    const k = kategoriSampah.find((x) => x.id === parseInt(item.kategori_id));
    return t + (k?.poin || 0) * item.berat;
  }, 0);

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Ajukan Penyetoran</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Tanggal Pengajuan</p>
          <p className="font-semibold text-gray-800 text-sm">
            {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {items.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-500">Item #{i + 1}</span>
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(i)} className="text-red-500 p-1">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="space-y-3">
              <select className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={item.kategori_id} onChange={(e) => handleChange(i, "kategori_id", e.target.value)} required>
                <option value="">Pilih Jenis Sampah</option>
                {kategoriSampah.map((k) => (
                  <option key={k.id} value={k.id}>{k.nama} - Rp {k.harga}/kg</option>
                ))}
              </select>
              <div className="flex items-center gap-3">
                <input type="number" step="0.1" placeholder="Berat (Kg)"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={item.berat || ""} onChange={(e) => handleChange(i, "berat", parseFloat(e.target.value))} required />
                <span className="text-sm font-medium text-gray-500">Kg</span>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-emerald-400 text-emerald-700 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-emerald-50 transition">
          <Plus size={18} /> Tambah Item
        </button>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
          <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Contoh: Sampah sudah dipilah" />
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex justify-between items-center">
          <span className="text-emerald-800 font-medium">Estimasi Total Poin:</span>
          <span className="text-emerald-800 font-bold text-lg">{hitungTotal().toFixed(2)} Poin</span>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
          {loading ? "Mengirim..." : <><Send size={18} /> Ajukan Sekarang</>}
        </button>
      </form>
    </div>
  );
}