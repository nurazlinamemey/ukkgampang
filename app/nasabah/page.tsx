"use client";
import Link from "next/link";
import { Leaf, LogIn, UserPlus, Recycle, TrendingUp, Gift, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="bg-white/25 p-4 rounded-full backdrop-blur-sm">
                <Leaf size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Bank Sampah</h1>
            <p className="text-green-50 text-sm">Ubah Sampahmu Jadi Poin & Rupiah</p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-[40px]" />
        </div>

        <div className="px-6 pb-8 -mt-6 relative z-10">
          <div className="grid grid-cols-3 gap-2 mb-8 text-center">
            {[
              { icon: Recycle, label: "Setor Sampah" },
              { icon: TrendingUp, label: "Dapat Poin" },
              { icon: Gift, label: "Tukar Hadiah" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-green-100 p-2.5 rounded-full mb-2">
                  <f.icon size={18} className="text-green-600" />
                </div>
                <span className="text-[10px] text-gray-600 font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Link href="/login"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95">
              <LogIn size={20} /> Masuk (Login)
            </Link>
            <Link href="/register-nasabah"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-green-400 text-green-700 hover:bg-green-50 font-bold rounded-xl transition active:scale-95">
              <UserPlus size={20} /> Daftar Nasabah
            </Link>
            <Link href="/register-admin"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded-xl transition active:scale-95">
              <ShieldCheck size={20} /> Daftar Admin Bank Sampah
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">© 2024 Bank Sampah Digital</p>
        </div>
      </div>
    </div>
  );
}