import Sidebar from "@/components/Sidebar";

export default function Base1Page() {
  return (
    <div className="flex min-h-screen bg-[#FAFBFD]">
      <Sidebar currentBase={1} />
      <main className="flex-1 ml-[88px] p-[24px] transition-all duration-300">
        {/* Contenido principal - Base 1 */}
      </main>
    </div>
  );
}
