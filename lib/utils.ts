export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(angka || 0);
}

export function formatPoin(angka: number): string {
  return new Intl.NumberFormat("id-ID").format(angka || 0) + " Poin";
}

export function formatTanggal(tgl: string | Date): string {
  const d = typeof tgl === "string" ? new Date(tgl) : tgl;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  }).format(d);
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "selesai":
    case "diverifikasi":
      return "text-green-700 bg-green-100";
    case "menunggu konfirmasi":
    case "menunggu_konfirmasi":
    case "diproses":
      return "text-amber-700 bg-amber-100";
    case "ditolak":
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
}

export function getBulanFormat(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getErrorMessage(error: any): string {
  return error?.response?.data?.message || error?.message || "Terjadi kesalahan";
}