"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { authApi } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export default function RegisterAdminPage() {
  const [form, setForm] = useState({ username: "", password: "", namaUnit: "", namaPengelola: "", telp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authApi.registerAdmin(form);
      alert("Registrasi Admin Berhasil! Silakan Login.");
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
            <ShieldCheck size={32} className="text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Daftar Admin</h1>
          <p className="text-gray-500 text-xs">Daftarkan Unit Bank Sampah</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: "username", label: "Username", type: "text", placeholder: "admin_banksampah" },
            { name: "password", label: "Password", type: "password", placeholder: "Minimal 6 karakter" },
            { name: "namaUnit", label: "Nama Unit Bank Sampah", type: "text", placeholder: "Bank Sampah Asri Jaya" },
            { name: "namaPengelola", label: "Nama Pengelola", type: "text", placeholder: "Bapak H. Sukirman" },
            { name: "telp", label: "No. Telepon", type: "tel", placeholder: "08123456789" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
              <input type={f.type} name={f.name} value={(form as any)[f.name]} onChange={handleChange}
                className="w-full p-2.5 border border-green-200 bg-green-50/30 rounded-xl text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none"
                placeholder={f.placeholder} required disabled={loading} />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> {loading ? "Memproses..." : "DAFTAR ADMIN"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Sudah punya akun? <Link href="/login" className="text-green-600 font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  );
}