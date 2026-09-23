export interface KategoriSampah {
  id: string;
  namaKategori: string;
  hargaPerKg: number;
  poinPerKg: number;
  jenis: "plastik" | "kertas" | "logam" | "kaca";
  foto?: string;
}

export interface Hadiah {
  id: string;
  namaHadiah: string;
  poinDibutuhkan: number;
  stok: number;
  foto?: string;
}

export interface NasabahData {
  id: string;
  namaNasabah: string;
  alamat: string;
  telp: string;
  saldoPoin: number;
  foto?: string;
  user?: { username: string; role: string };
}