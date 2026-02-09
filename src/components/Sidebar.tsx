"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  Home,
  Bell,
  LayoutGrid,
  Calendar,
  Globe,
  Search,
  FileText,
  MessageSquareText,
  Scale,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  section?: string;
}

interface SidebarProps {
  currentBase?: number;
  onExpandChange?: (expanded: boolean) => void;
}

const menuItems: MenuItem[] = [
  { icon: <Home size={16} strokeWidth={1.5} />, label: "Dashboard" },
  { icon: <Bell size={16} strokeWidth={1.5} />, label: "Notificaciones", active: true },
  { icon: <LayoutGrid size={16} strokeWidth={1.5} />, label: "Mis Marcas" },
  { icon: <Calendar size={16} strokeWidth={1.5} />, label: "Timelines", section: "HERRAMIENTAS" },
  { icon: <Globe size={16} strokeWidth={1.5} />, label: "Monitoreo" },
  { icon: <Search size={16} strokeWidth={1.5} />, label: "Búsqueda Fonetica" },
  { icon: <FileText size={16} strokeWidth={1.5} />, label: "Consulta De Registros" },
  { icon: <MessageSquareText size={16} strokeWidth={1.5} />, label: "Contestaciones I.A." },
  { icon: <Scale size={16} strokeWidth={1.5} />, label: "Legal Search" },
];

const baseRoutes = ["/base", "/base1", "/base2", "/base3", "/base4"];

const baseLabels = ["base", "base 1", "base 2", "base 3", "base 4"];

export default function Sidebar({ currentBase = 0, onExpandChange }: SidebarProps) {
  const nextBase = (currentBase + 1) % 5;
  const nextRoute = baseRoutes[nextBase];
  const displayName = currentBase === 0 ? "base" : `base ${currentBase}`;
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleExpand = (value: boolean) => {
    setExpanded(value);
    onExpandChange?.(value);
  };

  return (
    <aside
      className={clsx(
        "h-screen bg-[#FAFBFD] flex flex-col border-r border-[#EEF0F4] fixed left-0 top-0 transition-all duration-300 z-50",
        expanded ? "w-[260px]" : "w-[88px]"
      )}
      style={{
        paddingTop: "40px",
        paddingBottom: "24px",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
      onMouseEnter={() => handleExpand(true)}
      onMouseLeave={() => {
        handleExpand(false);
        setMenuOpen(false);
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          marginBottom: "32px",
          paddingLeft: expanded ? "12px" : "0"
        }}
      >
        {expanded ? (
          <Image
            src="/images/logo-lawgic.png"
            alt="Lawgic"
            width={110}
            height={36}
            className="object-contain"
            priority
          />
        ) : (
          <Image
            src="/images/Isotipo.png"
            alt="Lawgic"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
        )}
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.section && expanded && (
              <div
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginTop: "24px",
                  marginBottom: "12px",
                  paddingLeft: "12px",
                  letterSpacing: "0.5px"
                }}
              >
                {item.section}
              </div>
            )}
            {item.section && !expanded && <div style={{ marginTop: "24px" }} />}

            {/* Menu Item */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: expanded ? "flex-start" : "center",
                height: "48px",
                cursor: "pointer",
                transition: "all 0.2s",
                gap: expanded ? "12px" : "0",
                paddingLeft: expanded ? "12px" : "0",
                paddingRight: expanded ? "12px" : "0",
                borderRadius: expanded ? "24px" : "12px",
                backgroundColor: item.active ? "#E0E7FF" : "transparent",
                color: item.active ? "#4F46E5" : "#6B7280"
              }}
            >
              {!expanded ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: item.active ? "#E0E7FF" : "transparent",
                    color: item.active ? "#4F46E5" : "#6B7280"
                  }}
                >
                  {item.icon}
                </span>
              ) : (
                <>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px" }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      fontWeight: item.active ? 500 : 400
                    }}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Base Indicator */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          marginTop: "auto",
          paddingTop: "24px",
          gap: expanded ? "12px" : "0",
          paddingLeft: expanded ? "8px" : "0"
        }}
      >
        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "52px",
              left: expanded ? "8px" : "50%",
              transform: expanded ? "none" : "translateX(-50%)",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              padding: "8px 0",
              minWidth: "120px",
              zIndex: 100
            }}
          >
            {baseRoutes.map((route, index) => (
              <Link
                key={route}
                href={route}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  fontSize: "13px",
                  color: index === currentBase ? "#4570EB" : "#374151",
                  fontWeight: index === currentBase ? 600 : 400,
                  backgroundColor: index === currentBase ? "#EEF2FF" : "transparent",
                  textDecoration: "none",
                  transition: "background-color 0.15s"
                }}
                onMouseEnter={(e) => {
                  if (index !== currentBase) {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index === currentBase ? "#EEF2FF" : "transparent";
                }}
              >
                {baseLabels[index]}
              </Link>
            ))}
          </div>
        )}

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#4570EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            flexShrink: 0,
            cursor: "pointer",
            transition: "transform 0.15s"
          }}
        >
          {currentBase === 0 ? "B" : currentBase}
        </div>
        {expanded ? (
          <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
            <span
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                fontSize: "13px",
                color: "#374151",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                cursor: "pointer"
              }}
            >
              {displayName}
            </span>
            <Link
              href={nextRoute}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                borderRadius: "4px",
                cursor: "pointer",
                flexShrink: 0
              }}
            >
              <ChevronRight size={16} color="#9CA3AF" />
            </Link>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
