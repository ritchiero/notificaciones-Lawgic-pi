"use client";

import { useEffect } from "react";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Gavel,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Clock,
  User,
  Briefcase,
  Scale,
  FileCheck,
} from "lucide-react";

type NotificationType = "concesion" | "oposicion" | "oficio" | "urgente" | "recordatorio";

interface NotificationDetail {
  id: string;
  type: NotificationType;
  title: string;
  marca: string;
  expediente: string;
  fullDescription: string;
  diasRestantes?: number;
  // Type-specific fields
  tipoOficio?: string;
  accionSugerida?: string;
  numeroRegistro?: string;
  clase?: string;
  vigencia?: string;
  fechaConcesion?: string;
  fechaVencimiento?: string;
  oponente?: string;
  baseOposicion?: string;
  plazoContestar?: number;
  documentos?: string[];
  primaryAction: string;
  secondaryAction: string;
}

// Detailed data for the 3 notifications with modals
const notificationDetails: Record<string, NotificationDetail> = {
  "1": {
    id: "1",
    type: "urgente",
    title: "Plazo por vencer",
    marca: "VOLTERRA",
    expediente: "2851203",
    fullDescription: "Se recibió un oficio de requerimiento del IMPI para el expediente 2851203 de la marca VOLTERRA. Es necesario responder antes de que expire el plazo legal. De no responder, el trámite podría ser desechado.",
    diasRestantes: 3,
    tipoOficio: "Requerimiento",
    accionSugerida: "Responder al oficio de requerimiento",
    primaryAction: "Responder oficio",
    secondaryAction: "Marcar como leída",
  },
  "2": {
    id: "2",
    type: "concesion",
    title: "Marca concedida",
    marca: "APEX DYNAMICS",
    expediente: "2849876",
    fullDescription: "El IMPI ha concedido el registro de la marca APEX DYNAMICS. El título de registro está disponible para descarga. Ya puedes usar el símbolo ® junto con tu marca. La vigencia del registro es de 10 años a partir de la fecha de concesión.",
    numeroRegistro: "REG-2849876-MX",
    clase: "Clase 9 — Aparatos tecnológicos",
    vigencia: "10 años",
    fechaConcesion: "9 feb 2026",
    fechaVencimiento: "9 feb 2036",
    primaryAction: "Descargar título de registro",
    secondaryAction: "Ver expediente completo",
  },
  "3": {
    id: "3",
    type: "oposicion",
    title: "Nueva oposición recibida",
    marca: "LUMINA GROUP",
    expediente: "2845012",
    fullDescription: "La empresa LUMINA GROUP ha presentado una oposición formal contra tu solicitud de registro de marca. La oposición alega similitud fonética y visual con su marca registrada. Tienes un plazo para presentar argumentos en contra.",
    oponente: "LUMINA GROUP",
    baseOposicion: "Similitud fonética y visual",
    plazoContestar: 30,
    documentos: ["Escrito de oposición.pdf"],
    primaryAction: "Contestar oposición",
    secondaryAction: "Consultar con abogado",
  },
};

// Helper function to calculate deadline date
const getDeadlineDate = (daysRemaining: number): string => {
  const today = new Date();
  const deadline = new Date(today.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${deadline.getDate()} ${months[deadline.getMonth()]} ${deadline.getFullYear()}`;
};

// Helper function to get progress percentage
const getProgressPercentage = (daysRemaining: number): number => {
  const maxDays = 30;
  return Math.max(0, Math.min(100, ((maxDays - daysRemaining) / maxDays) * 100));
};

const getTypeStyle = (type: NotificationType) => {
  switch (type) {
    case "concesion":
      return { bg: "#DCFCE7", color: "#16A34A", border: "#16A34A" };
    case "oposicion":
      return { bg: "#FEF3C7", color: "#D97706", border: "#D97706" };
    case "oficio":
      return { bg: "#DBEAFE", color: "#2563EB", border: "#2563EB" };
    case "urgente":
      return { bg: "#FEE2E2", color: "#DC2626", border: "#DC2626" };
    case "recordatorio":
      return { bg: "#F3E8FF", color: "#9333EA", border: "#9333EA" };
  }
};

const getTypeIcon = (type: NotificationType, size: number = 16) => {
  switch (type) {
    case "concesion":
      return <CheckCircle size={size} />;
    case "oposicion":
      return <Gavel size={size} />;
    case "oficio":
      return <FileText size={size} />;
    case "urgente":
      return <AlertTriangle size={size} />;
    case "recordatorio":
      return <Clock size={size} />;
  }
};

const getTypeLabel = (type: NotificationType) => {
  switch (type) {
    case "concesion":
      return "Concesión";
    case "oposicion":
      return "Oposición";
    case "oficio":
      return "Oficio";
    case "urgente":
      return "Urgente";
    case "recordatorio":
      return "Recordatorio";
  }
};

interface NotificationModalProps {
  notificationId: string | null;
  onClose: () => void;
}

export default function NotificationModal({ notificationId, onClose }: NotificationModalProps) {
  const detail = notificationId ? notificationDetails[notificationId] : null;

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (notificationId) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [notificationId, onClose]);

  if (!detail) return null;

  const typeStyle = getTypeStyle(detail.type);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          animation: "scaleIn 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #E5E7EB",
            backgroundColor: typeStyle.bg,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                color: typeStyle.color,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {getTypeIcon(detail.type, 16)}
              <span>{getTypeLabel(detail.type)}</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {detail.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              cursor: "pointer",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            }}
          >
            <X size={18} color="#6B7280" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
          }}
        >
          {/* Client & Expediente */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Briefcase size={16} color="#6B7280" />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Cliente:</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#4570EB" }}>
                {detail.marca}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FileCheck size={16} color="#6B7280" />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Expediente:</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
                {detail.expediente}
              </span>
            </div>
          </div>

          {/* Urgente: Plazo section */}
          {detail.type === "urgente" && detail.diasRestantes && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px",
                border: "1px solid #FECACA",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Clock size={16} color="#DC2626" />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#DC2626" }}>
                  {detail.diasRestantes} días restantes
                </span>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: "8px",
                  backgroundColor: "#FECACA",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${getProgressPercentage(detail.diasRestantes)}%`,
                    backgroundColor: "#DC2626",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={14} color="#991B1B" />
                <span style={{ fontSize: "13px", color: "#991B1B" }}>
                  Fecha límite: {getDeadlineDate(detail.diasRestantes)}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Descripción
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#374151",
                margin: 0,
              }}
            >
              {detail.fullDescription}
            </p>
          </div>

          {/* Type-specific sections */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {/* Urgente fields */}
            {detail.tipoOficio && (
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Tipo de oficio
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.tipoOficio}
                </span>
              </div>
            )}
            {detail.accionSugerida && (
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Acción sugerida
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.accionSugerida}
                </span>
              </div>
            )}

            {/* Concesión fields */}
            {detail.numeroRegistro && (
              <div
                style={{
                  backgroundColor: "#F0FDF4",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Número de registro
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#16A34A" }}>
                  {detail.numeroRegistro}
                </span>
              </div>
            )}
            {detail.clase && (
              <div
                style={{
                  backgroundColor: "#F0FDF4",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Clase
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.clase}
                </span>
              </div>
            )}
            {detail.vigencia && (
              <div
                style={{
                  backgroundColor: "#F0FDF4",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  gridColumn: "span 2",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Vigencia
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.vigencia} ({detail.fechaConcesion} → {detail.fechaVencimiento})
                </span>
              </div>
            )}

            {/* Oposición fields */}
            {detail.oponente && (
              <div
                style={{
                  backgroundColor: "#FFFBEB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Oponente
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.oponente}
                </span>
              </div>
            )}
            {detail.baseOposicion && (
              <div
                style={{
                  backgroundColor: "#FFFBEB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Base de la oposición
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                  {detail.baseOposicion}
                </span>
              </div>
            )}
            {detail.plazoContestar && (
              <div
                style={{
                  backgroundColor: "#FFFBEB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>
                  Plazo para contestar
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#D97706" }}>
                  {detail.plazoContestar} días
                </span>
              </div>
            )}
            {detail.documentos && detail.documentos.length > 0 && (
              <div
                style={{
                  backgroundColor: "#FFFBEB",
                  borderRadius: "8px",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "8px" }}>
                  Documentos adjuntos
                </span>
                {detail.documentos.map((doc, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <FileText size={14} color="#D97706" />
                    <span style={{ fontSize: "13px", color: "#374151" }}>{doc}</span>
                    <Download size={14} color="#9CA3AF" style={{ marginLeft: "auto" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
            padding: "16px 24px",
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              backgroundColor: "#fff",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            {detail.secondaryAction}
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              backgroundColor: typeStyle.color,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            {detail.type === "concesion" && <Download size={16} />}
            {detail.type === "urgente" && <ExternalLink size={16} />}
            {detail.type === "oposicion" && <Scale size={16} />}
            {detail.primaryAction}
          </button>
        </div>
      </div>
    </div>
  );
}

// Export function to check if a notification has a detail modal
export function hasDetailModal(notificationId: string): boolean {
  return notificationId in notificationDetails;
}
