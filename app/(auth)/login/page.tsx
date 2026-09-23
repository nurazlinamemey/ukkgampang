"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, LogIn, ShieldCheck, User } from "lucide-react";
import { authApi } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"NASABAH" | "ADMIN">("NASABAH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authApi.login(username, password);
      const userRole = res.data?.role;
      if (userRole !== role) {
        setError(`Akun ini terdaftar sebagai ${userRole}. Silakan pilih tab ${userRole}.`);
        setLoading(false);
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert(`Login ${userRole} Berhasil!`);
      router.push(userRole === "ADMIN" ? "/admin/dashboard" : "/nasabah/dashboard");
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full mb-3">
            <Leaf size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Bank Sampah</h1>
          <p className="text-gray-500 text-sm">Selamat datang kembali!</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-green-50 rounded-xl">
          {(["NASABAH", "ADMIN"] as const).map((r) => {
            const Icon = r === "NASABAH" ? User : ShieldCheck;
            return (
              <button key={r} type="button" onClick={() => { setRole(r); setError(""); }}
                className={`py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
                  role === r ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow" : "text-gray-500"
                }`}>
                <Icon size={14} /> {r}
              </button>
            );
          })}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-green-200 bg-green-50/30 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none"
              placeholder={role === "ADMIN" ? "admin_banksampah" : "nasabah_budi"}
              required disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-green-200 bg-green-50/30 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none"
              placeholder="••••••••" required disabled={loading} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95">
            <LogIn size={18} /> {loading ? "Memproses..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
          <p className="text-[10px] font-semibold text-green-800 mb-1">💡 Akun Demo:</p>
          <p className="text-[10px] text-green-700">Admin: <strong>admin_banksampah</strong> / <strong>admin123</strong></p>
          <p className="text-[10px] text-green-700">Nasabah: <strong>nasabah_budi</strong> / <strong>password123</strong></p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-600 space-y-1">
          <p>Belum punya akun?</p>
          <div className="flex justify-center gap-4">
            <Link href="/register-nasabah" className="text-green-600 font-semibold">Daftar Nasabah</Link>
            <span className="text-gray-300">|</span>
            <Link href="/register-admin" className="text-green-600 font-semibold">Daftar Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}