"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Recycle, Wallet, LogOut } from "lucide-react";
import { SaldoCard, InfoCard, MenuCard } from "@/components/ui/Card";
import { getStatusColor, getErrorMessage } from "@/lib/utils";
import { dashboardApi, setorApi } from "@/lib/api-client";

export default function DashboardNasabah() {
  const [user, setUser] = useState<any>(null);
  const [saldo, setSaldo] = useState(0);
  const [totalSampah, setTotalSampah] = useState(0);
  const [histori, setHistori] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { router.push("/login"); return; }
    const parsed = JSON.parse(u);
    setUser(parsed);

    dashboardApi.summary()
      .then((res) => {
        setSaldo(res.data?.saldo || 0);
        setTotalSampah(res.data?.total_sampah || 0);
      })
      .catch((err) => console.log("Summary error:", getErrorMessage(err)));

    setorApi.mySetor()
      .then((res) => setHistori((res.data || []).slice(0, 3)))
      .catch((err) => console.log("Histori error:", getErrorMessage(err)));
  }, [router]);

  const handleLogout = () => { localStorage.clear(); router.push("/login"); };
  const namaTampil = user?.nasabah?.namaNasabah || user?.username || "Nasabah";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500 text-sm">Selamat Datang,</p>
          <h1 className="text-xl font-bold text-gray-800">{namaTampil}</h1>
        </div>
        <button onClick={handleLogout}
          className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <LogOut size={20} />
        </button>
      </div>

      <SaldoCard label="Total Saldo Poin" saldo={saldo} icon={Wallet} />

      <div className="mb-6">
        <InfoCard label="Total Sampah Disetor" value={`${totalSampah} Kg`} icon={Recycle} />
      </div>

      <h2 className="font-bold text-gray-800 mb-3">Aksi Cepat</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MenuCard label="Setor Sampah" icon={ArrowUpRight} href="/nasabah/setor-sampah" />
        <MenuCard label="Tukar Poin" icon={Wallet} href="/nasabah/penukaran-poin"
          iconBg="bg-orange-100" iconColor="text-orange-600" />
      </div>

      <h2 className="font-bold text-gray-800 mb-3">Histori Terakhir</h2>
      <div className="space-y-3">
        {histori.length === 0 ? (
          <div className="bg-white p-4 rounded-xl border border-green-100 text-center text-gray-400 text-sm">
            Belum ada histori penyetoran
          </div>
        ) : (
          histori.map((h: any) => (
            <div key={h.id} className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800 text-sm">{h.kodeSetor}</p>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${getStatusColor(h.status)}`}>
                  {h.status?.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{h.totalBeratKg} Kg</span>
                <span className="text-green-600 font-bold">+{h.totalPoin} Poin</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}