import BottomNav from "@/components/layout/BottomNav";

export default function NasabahLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0FDF4] pb-20">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}