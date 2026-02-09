import Sidebar from "@/components/Sidebar";

export default function Base2Page() {
  return (
    <div className="flex min-h-screen bg-[#FAFBFD]">
      <Sidebar currentBase={2} />
      <main className="flex-1 ml-[88px] p-[24px] transition-all duration-300">
        {/* Contenido principal - Base 2 */}
      </main>
    </div>
  );
}
