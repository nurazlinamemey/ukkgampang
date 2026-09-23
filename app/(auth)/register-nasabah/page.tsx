"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, UserPlus, ArrowLeft, Upload } from "lucide-react";
import { authApi } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export default function RegisterNasabahPage() {
  const [form, setForm] = useState({ username: "", password: "", namaNasabah: "", alamat: "", telp: "" });
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authApi.registerNasabah({ ...form, foto: foto || undefined });
      alert("Registrasi Nasabah Berhasil! Silakan Login.");
      router.push("/login");
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-green-600">
          <ArrowLeft size={16} /> Kembali
        </Link>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 p-3.5 rounded-full mb-2">
            <Leaf size={32} className="text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Daftar Nasabah</h1>
          <p className="text-gray-500 text-xs">Bergabung jadi Nasabah Bank Sampah</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: "username", label: "Username", type: "text", placeholder: "nasabah_budi" },
            { name: "password", label: "Password", type: "password", placeholder: "Minimal 6 karakter" },
            { name: "namaNasabah", label: "Nama Lengkap", type: "text", placeholder: "Nama Kamu" },
            { name: "telp", label: "No. Telepon", type: "tel", placeholder: "08123456789" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
              <input type={f.type} name={f.name} value={(form as any)[f.name]} onChange={handleChange}
                className="w-full p-2.5 border border-green-200 bg-green-50/30 rounded-xl text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none"
                placeholder={f.placeholder} required disabled={loading} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Alamat</label>
            <textarea name="alamat" value={form.alamat} onChange={handleChange} rows={2}
              className="w-full p-2.5 border border-green-200 bg-green-50/30 rounded-xl text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none"
              placeholder="Alamat lengkap" required disabled={loading} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Foto (Opsional)</label>
            <div className="border-2 border-dashed border-green-300 bg-green-50/30 rounded-xl p-3 text-center relative hover:border-green-400 transition">
              <input type="file" accept="image/*"
                onChange={(e) => e.target.files && setFoto(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={loading} />
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Upload size={16} className="text-green-500" />
                <span>{foto ? foto.name : "Pilih Foto"}</span>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
            <UserPlus size={18} /> {loading ? "Memproses..." : "DAFTAR NASABAH"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Sudah punya akun? <Link href="/login" className="text-green-600 font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  );
}