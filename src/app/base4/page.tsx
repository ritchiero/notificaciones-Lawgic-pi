import Sidebar from "@/components/Sidebar";

export default function Base4Page() {
  return (
    <div className="flex min-h-screen bg-[#FAFBFD]">
      <Sidebar currentBase={4} />
      <main className="flex-1 ml-[88px] p-[24px] transition-all duration-300">
        {/* Contenido principal - Base 4 */}
      </main>
    </div>
  );
}
