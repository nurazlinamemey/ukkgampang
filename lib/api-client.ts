import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://learn.smktelkom-mlg.sch.id/bank_sampah/api/v1",
  headers: {
    "Content-Type": "application/json",
    "x-app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  registerNasabah: async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k]) formData.append(k, data[k]);
    });
    const res = await api.post("/auth/nasabah/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  registerAdmin: async (data: any) => {
    const res = await api.post("/auth/admin/register", data);
    return res.data;
  },
  login: async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
  },
  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};

export const kategoriApi = {
  getAll: async () => (await api.get("/kategori-sampah")).data,
  getById: async (id: string) => (await api.get(`/kategori-sampah/${id}`)).data,
};

export const setorApi = {
  pengajuan: async (data: any) => (await api.post("/setor-sampah/pengajuan", data)).data,
  mySetor: async () => (await api.get("/setor-sampah/my-setor")).data,
  detail: async (id: string) => (await api.get(`/setor-sampah/${id}`)).data,
};

export const hadiahApi = {
  getAll: async () => (await api.get("/hadiah")).data,
};

export const penukaranApi = {
  tukar: async (hadiahId: string) => (await api.post("/penukaran-poin/tukar", { hadiahId })).data,
  myPenukaran: async () => (await api.get("/penukaran-poin/my-penukaran")).data,
};

export const dashboardApi = {
  summary: async () => (await api.get("/dashboard/summary")).data,
  stats: async () => (await api.get("/dashboard/stats")).data,
};

export const adminApi = {
  getNasabah: async () => (await api.get("/admin/nasabah")).data,
  detailNasabah: async (id: string) => (await api.get(`/admin/nasabah/${id}`)).data,
  listSetoran: async () => (await api.get("/setor-sampah/admin/list")).data,
  verifySetoran: async (id: string, data: any) => (await api.put(`/setor-sampah/admin/verify/${id}`, data)).data,
  rekapitulasi: async (bulan: string) => (await api.get(`/rekapitulasi/bulanan?bulan=${bulan}`)).data,
};

export const seedApi = {
  generate: async () => (await api.post("/seed")).data,
};