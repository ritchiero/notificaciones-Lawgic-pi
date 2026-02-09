import Sidebar from "@/components/Sidebar";

export default function BasePage() {
  return (
    <div className="flex min-h-screen bg-[#FAFBFD]">
      <Sidebar currentBase={0} />
      <main className="flex-1 ml-[88px] p-[2.4rem] transition-all duration-300">
        {/* Contenido principal aquí */}
      </main>
    </div>
  );
}
