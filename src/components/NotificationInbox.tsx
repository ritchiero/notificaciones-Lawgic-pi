"use client";

import { useState } from "react";
import {
  CheckCircle,
  FileText,
  AlertTriangle,
  Clock,
  Star,
  MoreHorizontal,
  Search,
  Archive,
  Trash2,
  ExternalLink,
  Gavel,
  Calendar,
} from "lucide-react";
import NotificationModal, { hasDetailModal } from "./NotificationModal";

// Helper function to calculate deadline date from days remaining
const getDeadlineDate = (daysRemaining: number): string => {
  const today = new Date();
  const deadline = new Date(today.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${deadline.getDate()} ${months[deadline.getMonth()]} ${deadline.getFullYear()}`;
};

// Helper function to get urgency level
const getUrgencyLevel = (daysRemaining: number): "critical" | "warning" | "safe" => {
  if (daysRemaining < 7) return "critical";
  if (daysRemaining <= 15) return "warning";
  return "safe";
};

// Helper function to get urgency styles
const getUrgencyStyles = (level: "critical" | "warning" | "safe") => {
  switch (level) {
    case "critical":
      return { bg: "#FEF2F2", barBg: "#DC2626", text: "#991B1B", lightBg: "#FEE2E2" };
    case "warning":
      return { bg: "#FFFBEB", barBg: "#D97706", text: "#92400E", lightBg: "#FEF3C7" };
    case "safe":
      return { bg: "#F0FDF4", barBg: "#16A34A", text: "#166534", lightBg: "#DCFCE7" };
  }
};

// Helper function to calculate progress percentage (inverse - less days = more progress)
const getProgressPercentage = (daysRemaining: number): number => {
  const maxDays = 45; // Consider 45 days as the baseline
  const progress = Math.max(0, Math.min(100, ((maxDays - daysRemaining) / maxDays) * 100));
  return progress;
};

type NotificationType = "concesion" | "oposicion" | "oficio" | "urgente" | "recordatorio";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  marca?: string;
  expediente?: string;
  date: string;
  read: boolean;
  starred: boolean;
  diasRestantes?: number;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "urgente",
    title: "Plazo por vencer",
    description: "Responde al oficio de requerimiento antes de que expire el plazo legal",
    marca: "VOLTERRA",
    expediente: "2851203",
    date: "Hace 30 min",
    read: false,
    starred: true,
    diasRestantes: 3,
  },
  {
    id: "2",
    type: "concesion",
    title: "Marca concedida",
    description: "Tu marca APEX DYNAMICS ha sido aprobada por el IMPI. Ya puedes usar ®",
    marca: "APEX DYNAMICS",
    expediente: "2849876",
    date: "Hace 1 hora",
    read: false,
    starred: false,
  },
  {
    id: "3",
    type: "oposicion",
    title: "Nueva oposición recibida",
    description: "LUMINA GROUP ha presentado oposición contra tu solicitud",
    marca: "LUMINA GROUP",
    expediente: "2845012",
    date: "Hace 2 horas",
    read: false,
    starred: true,
  },
  {
    id: "4",
    type: "oficio",
    title: "Oficio de requerimiento",
    description: "Oficio de requerimiento para presentar pruebas de uso de la marca",
    marca: "CREST MEDICAL",
    expediente: "2843567",
    date: "Hace 3 horas",
    read: false,
    starred: false,
    diasRestantes: 15,
  },
  {
    id: "5",
    type: "urgente",
    title: "Vencimiento inminente",
    description: "Plazo límite para contestar oposición. Acción inmediata requerida",
    marca: "BLUERIDGE",
    expediente: "2841298",
    date: "Hace 4 horas",
    read: false,
    starred: true,
    diasRestantes: 5,
  },
  {
    id: "6",
    type: "recordatorio",
    title: "Renovación próxima",
    description: "El registro de tu marca vence en 45 días. Inicia el trámite de renovación",
    marca: "SOLARIS TECH",
    expediente: "2839421",
    date: "Hace 5 horas",
    read: false,
    starred: false,
    diasRestantes: 45,
  },
  {
    id: "7",
    type: "concesion",
    title: "Registro aprobado",
    description: "Registro de marca concedido clase 25. Certificado disponible para descarga",
    marca: "PINNACLE",
    expediente: "2837654",
    date: "Hace 6 horas",
    read: false,
    starred: false,
  },
  {
    id: "8",
    type: "oficio",
    title: "Oficio preventivo",
    description: "Oficio preventivo de caducidad por falta de uso. Requiere atención",
    marca: "IRONVAULT",
    expediente: "2835901",
    date: "Ayer",
    read: false,
    starred: true,
    diasRestantes: 20,
  },
  {
    id: "9",
    type: "oposicion",
    title: "Resolución favorable",
    description: "Resolución favorable en proceso de oposición. Tu marca continúa trámite",
    marca: "MERIDIAN",
    expediente: "2834102",
    date: "Ayer",
    read: false,
    starred: false,
  },
  {
    id: "10",
    type: "urgente",
    title: "Acción requerida",
    description: "Documentación faltante para completar solicitud. Plazo legal próximo",
    marca: "SKYWARD",
    expediente: "2832445",
    date: "Ayer",
    read: false,
    starred: true,
    diasRestantes: 10,
  },
  {
    id: "11",
    type: "concesion",
    title: "Marca registrada",
    description: "El IMPI ha concedido el registro. Número de registro disponible",
    marca: "NOVACORE",
    expediente: "2830789",
    date: "Hace 2 días",
    read: true,
    starred: false,
  },
  {
    id: "12",
    type: "oficio",
    title: "Requerimiento documental",
    description: "Requerimiento de documentación complementaria para continuar trámite",
    marca: "GREENPATH",
    expediente: "2829012",
    date: "Hace 2 días",
    read: true,
    starred: false,
    diasRestantes: 25,
  },
  {
    id: "13",
    type: "recordatorio",
    title: "Pago pendiente",
    description: "Recordatorio de pago de derechos para mantener vigencia del registro",
    marca: "ZENITH LABS",
    expediente: "2827345",
    date: "Hace 2 días",
    read: true,
    starred: false,
    diasRestantes: 30,
  },
  {
    id: "14",
    type: "oposicion",
    title: "Oposición presentada",
    description: "Oposición presentada por VERTEX INDUSTRIES. Plazo de 30 días para responder",
    marca: "VERTEX",
    expediente: "2825678",
    date: "Hace 3 días",
    read: true,
    starred: true,
  },
  {
    id: "15",
    type: "concesion",
    title: "Título otorgado",
    description: "Título de registro de marca otorgado. Protección por 10 años",
    marca: "AURORA SYSTEMS",
    expediente: "2823901",
    date: "Hace 3 días",
    read: true,
    starred: false,
  },
  {
    id: "16",
    type: "oficio",
    title: "Notificación oficial",
    description: "Notificación de observaciones a la solicitud. Requiere aclaración",
    marca: "COBALT",
    expediente: "2822234",
    date: "Hace 3 días",
    read: true,
    starred: false,
    diasRestantes: 30,
  },
  {
    id: "17",
    type: "urgente",
    title: "Último aviso",
    description: "Último aviso antes de declarar abandono de solicitud por falta de respuesta",
    marca: "TRADEWIND",
    expediente: "2820567",
    date: "Hace 4 días",
    read: true,
    starred: false,
    diasRestantes: 5,
  },
  {
    id: "18",
    type: "recordatorio",
    title: "Declaración de uso",
    description: "Se aproxima plazo para presentar declaración de uso efectivo de marca",
    marca: "FORGEPOINT",
    expediente: "2818890",
    date: "Hace 4 días",
    read: true,
    starred: false,
    diasRestantes: 20,
  },
  {
    id: "19",
    type: "oposicion",
    title: "Audiencia programada",
    description: "Audiencia de alegatos programada para proceso de oposición",
    marca: "CLEARVIEW",
    expediente: "2817123",
    date: "Hace 5 días",
    read: true,
    starred: false,
  },
  {
    id: "20",
    type: "concesion",
    title: "Solicitud aprobada",
    description: "Solicitud de registro aprobada. Pendiente pago de derechos finales",
    marca: "TECHFLOW",
    expediente: "2815456",
    date: "Hace 5 días",
    read: true,
    starred: false,
  },
  {
    id: "21",
    type: "oficio",
    title: "Citatorio IMPI",
    description: "Citatorio para comparecer ante el IMPI y ratificar documentación",
    marca: "INNOVATECH",
    expediente: "2813789",
    date: "Hace 6 días",
    read: true,
    starred: false,
    diasRestantes: 15,
  },
  {
    id: "22",
    type: "recordatorio",
    title: "Vencimiento registro",
    description: "Tu registro vence próximamente. Programa la renovación con anticipación",
    marca: "CLOUDNEST",
    expediente: "2812012",
    date: "Hace 1 semana",
    read: true,
    starred: false,
    diasRestantes: 25,
  },
  {
    id: "23",
    type: "oposicion",
    title: "Oposición desestimada",
    description: "La oposición ha sido desestimada. Tu solicitud continúa su trámite normal",
    marca: "DATASTREAM",
    expediente: "2810345",
    date: "Hace 1 semana",
    read: true,
    starred: false,
  },
  {
    id: "24",
    type: "concesion",
    title: "Marca concedida",
    description: "Felicidades, tu marca ha sido registrada exitosamente ante el IMPI",
    marca: "BRIGHTIDEA",
    expediente: "2808678",
    date: "Hace 1 semana",
    read: true,
    starred: false,
  },
  {
    id: "25",
    type: "oficio",
    title: "Resolución emitida",
    description: "Se ha emitido resolución sobre tu solicitud. Consulta el expediente",
    marca: "NEXGEN SOLUTIONS",
    expediente: "2806901",
    date: "Hace 8 días",
    read: true,
    starred: false,
  },
  {
    id: "26",
    type: "urgente",
    title: "Plazo crítico",
    description: "Plazo crítico para presentar alegatos. Vence en días",
    marca: "URBANFLOW",
    expediente: "2805234",
    date: "Hace 9 días",
    read: true,
    starred: false,
    diasRestantes: 3,
  },
  {
    id: "27",
    type: "recordatorio",
    title: "Actualización datos",
    description: "Recordatorio para actualizar datos de contacto en expediente",
    marca: "SMARTLINK",
    expediente: "2803567",
    date: "Hace 10 días",
    read: true,
    starred: false,
  },
  {
    id: "28",
    type: "oposicion",
    title: "Nueva oposición",
    description: "Se ha interpuesto nueva oposición. Revisa los fundamentos presentados",
    marca: "QUANTUM LABS",
    expediente: "2801890",
    date: "Hace 12 días",
    read: true,
    starred: false,
  },
  {
    id: "29",
    type: "concesion",
    title: "Registro exitoso",
    description: "Registro de marca clase 9 concedido. Vigencia de 10 años iniciada",
    marca: "SYNERGY GLOBAL",
    expediente: "2800123",
    date: "Hace 2 semanas",
    read: true,
    starred: false,
  },
  {
    id: "30",
    type: "oficio",
    title: "Oficio informativo",
    description: "Oficio informativo sobre cambios en normativa de propiedad industrial",
    marca: "PRISM TECH",
    expediente: "2798456",
    date: "Hace 2 semanas",
    read: true,
    starred: false,
  },
];

const getTypeIcon = (type: NotificationType, size: number = 14) => {
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

type FilterType = "all" | "urgente" | "oficio" | "oposicion" | "concesion" | "recordatorio" | "plazos";

export default function NotificationInbox() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [modalNotificationId, setModalNotificationId] = useState<string | null>(null);

  const toggleStar = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n))
    );
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Count notifications by type
  const typeCounts = {
    urgente: notifications.filter((n) => n.type === "urgente").length,
    oficio: notifications.filter((n) => n.type === "oficio").length,
    oposicion: notifications.filter((n) => n.type === "oposicion").length,
    concesion: notifications.filter((n) => n.type === "concesion").length,
    recordatorio: notifications.filter((n) => n.type === "recordatorio").length,
    plazos: notifications.filter((n) => n.diasRestantes !== undefined).length,
  };

  const filteredNotifications = (() => {
    let result = notifications;

    if (filter === "urgente" || filter === "oficio" || filter === "oposicion" || filter === "concesion" || filter === "recordatorio") {
      result = notifications.filter((n) => n.type === filter);
    } else if (filter === "plazos") {
      result = notifications
        .filter((n) => n.diasRestantes !== undefined)
        .sort((a, b) => (a.diasRestantes ?? 0) - (b.diasRestantes ?? 0));
    }

    return result;
  })();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#111827",
              margin: 0,
            }}
          >
            Notificaciones
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              margin: "4px 0 0 0",
            }}
          >
            {unreadCount} sin leer
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            padding: "8px 12px",
            gap: "8px",
            maxWidth: "240px",
            flex: 1,
          }}
        >
          <Search size={16} color="#9CA3AF" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
              width: "100%",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#fff",
          borderRadius: "12px 12px 0 0",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {/* Regular filter tabs */}
          {[
            { key: "all", label: "Todas", color: "#4570EB", bg: "#EEF2FF" },
            { key: "urgente", label: `Urgente (${typeCounts.urgente})`, color: "#DC2626", bg: "#FEE2E2" },
            { key: "oficio", label: `Oficio (${typeCounts.oficio})`, color: "#2563EB", bg: "#DBEAFE" },
            { key: "oposicion", label: `Oposición (${typeCounts.oposicion})`, color: "#D97706", bg: "#FEF3C7" },
            { key: "concesion", label: `Concesión (${typeCounts.concesion})`, color: "#16A34A", bg: "#DCFCE7" },
            { key: "recordatorio", label: `Recordatorio (${typeCounts.recordatorio})`, color: "#9333EA", bg: "#F3E8FF" },
          ].map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as FilterType)}
                style={{
                  padding: "5px 10px",
                  fontSize: "12px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? tab.color : "#6B7280",
                  backgroundColor: isActive ? tab.bg : "transparent",
                  border: isActive ? `1px solid ${tab.color}30` : "1px solid transparent",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {tab.key === "urgente" && <AlertTriangle size={11} />}
                {tab.key === "oficio" && <FileText size={11} />}
                {tab.key === "oposicion" && <Gavel size={11} />}
                {tab.key === "concesion" && <CheckCircle size={11} />}
                {tab.key === "recordatorio" && <Clock size={11} />}
                {tab.label}
              </button>
            );
          })}

          {/* Vertical separator */}
          <div
            style={{
              width: "1px",
              height: "24px",
              backgroundColor: "#E5E7EB",
              marginLeft: "8px",
              marginRight: "8px",
            }}
          />

          {/* Plazos y términos - Highlighted button */}
          <button
            onClick={() => setFilter("plazos")}
            style={{
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 600,
              color: filter === "plazos" ? "#fff" : "#B45309",
              backgroundColor: filter === "plazos" ? "#D97706" : "#FEF3C7",
              border: filter === "plazos" ? "1px solid #B45309" : "1px solid #FCD34D",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: filter === "plazos"
                ? "0 2px 8px rgba(217, 119, 6, 0.3)"
                : "0 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Calendar size={15} strokeWidth={2.5} />
            <span>Plazos y términos</span>
            {/* Badge with count */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "22px",
                height: "20px",
                padding: "0 6px",
                borderRadius: "10px",
                backgroundColor: filter === "plazos" ? "#fff" : "#DC2626",
                color: filter === "plazos" ? "#D97706" : "#fff",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {typeCounts.plazos}
            </span>
          </button>
        </div>

        {/* Actions */}
        {selectedIds.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>
              {selectedIds.length} seleccionados
            </span>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                fontSize: "13px",
                color: "#6B7280",
                backgroundColor: "transparent",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <Archive size={14} />
              Archivar
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                fontSize: "13px",
                color: "#DC2626",
                backgroundColor: "transparent",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Notification List */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "0 0 12px 12px",
          overflow: "auto",
        }}
      >
        {filteredNotifications.map((notification) => {
          const typeStyle = getTypeStyle(notification.type);
          const isSelected = selectedIds.includes(notification.id);
          const isUrgent = notification.type === "urgente" || (notification.diasRestantes && notification.diasRestantes <= 7);
          const isPlazoView = filter === "plazos";
          const urgencyLevel = notification.diasRestantes ? getUrgencyLevel(notification.diasRestantes) : "safe";
          const urgencyStyles = getUrgencyStyles(urgencyLevel);

          return (
            <div
              key={notification.id}
              onClick={() => {
                toggleRead(notification.id);
                if (hasDetailModal(notification.id)) {
                  setModalNotificationId(notification.id);
                }
              }}
              style={{
                display: "flex",
                alignItems: "stretch",
                borderBottom: "1px solid #F3F4F6",
                backgroundColor: isPlazoView
                  ? urgencyStyles.bg
                  : isSelected
                  ? "#EEF2FF"
                  : notification.read
                  ? "#fff"
                  : "#FAFBFF",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected && !isPlazoView) {
                  e.currentTarget.style.backgroundColor = "#F9FAFB";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected && !isPlazoView) {
                  e.currentTarget.style.backgroundColor = notification.read
                    ? "#fff"
                    : "#FAFBFF";
                }
              }}
            >
              {/* Left border indicator */}
              <div
                style={{
                  width: isPlazoView ? "4px" : "3px",
                  backgroundColor: isPlazoView
                    ? urgencyStyles.barBg
                    : isUrgent
                    ? "#DC2626"
                    : notification.read
                    ? "transparent"
                    : typeStyle.border,
                  flexShrink: 0,
                }}
              />

              {/* Content wrapper - compact */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: isPlazoView ? "12px 12px" : "10px 12px",
                  gap: "10px",
                }}
              >
                {/* Left controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {/* Unread dot */}
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: notification.read ? "transparent" : "#4570EB",
                      flexShrink: 0,
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelect(notification.id);
                    }}
                    style={{
                      width: "14px",
                      height: "14px",
                      accentColor: "#4570EB",
                      cursor: "pointer",
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(notification.id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <Star
                      size={14}
                      fill={notification.starred ? "#FBBF24" : "none"}
                      color={notification.starred ? "#FBBF24" : "#D1D5DB"}
                    />
                  </button>
                </div>

                {/* Main Content - 2 rows (or 3 rows for plazo view) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Row 1: Title + Client */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: notification.read ? 500 : 600,
                        color: "#111827",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {notification.title}
                    </span>
                    {notification.marca && (
                      <>
                        <span style={{ color: "#D1D5DB" }}>—</span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#4570EB",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {notification.marca}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Row 2: Expediente + Description */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#6B7280",
                    }}
                  >
                    {notification.expediente && (
                      <>
                        <span
                          style={{
                            fontWeight: 500,
                            color: "#374151",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Exp. {notification.expediente}
                        </span>
                        <span style={{ color: "#D1D5DB" }}>·</span>
                      </>
                    )}
                    <span
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {notification.description}
                    </span>
                  </div>

                  {/* Row 3: Plazo view - Progress bar and deadline */}
                  {isPlazoView && notification.diasRestantes && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      {/* Progress bar container */}
                      <div
                        style={{
                          flex: 1,
                          height: "6px",
                          backgroundColor: "#E5E7EB",
                          borderRadius: "3px",
                          overflow: "hidden",
                          maxWidth: "200px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${getProgressPercentage(notification.diasRestantes)}%`,
                            backgroundColor: urgencyStyles.barBg,
                            borderRadius: "3px",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>

                      {/* Deadline info */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "3px 10px",
                          borderRadius: "4px",
                          backgroundColor: urgencyStyles.lightBg,
                          color: urgencyStyles.text,
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        <Calendar size={12} />
                        <span>Vence: {getDeadlineDate(notification.diasRestantes)}</span>
                        <span style={{ opacity: 0.7 }}>
                          ({notification.diasRestantes} {notification.diasRestantes === 1 ? "día" : "días"})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right section: Type badge + Days badge + Timestamp + More options */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  {/* Type Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: typeStyle.bg,
                      color: typeStyle.color,
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {getTypeIcon(notification.type, 12)}
                    <span>{getTypeLabel(notification.type)}</span>
                  </div>

                  {/* Days remaining badge */}
                  {!isPlazoView && notification.diasRestantes && notification.diasRestantes <= 30 && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor:
                          notification.diasRestantes <= 5 ? "#FEE2E2" :
                          notification.diasRestantes <= 15 ? "#FEF3C7" : "#E0F2FE",
                        color:
                          notification.diasRestantes <= 5 ? "#DC2626" :
                          notification.diasRestantes <= 15 ? "#D97706" : "#0369A1",
                        fontSize: "10px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Clock size={10} />
                      {notification.diasRestantes}d
                    </span>
                  )}

                  {/* Timestamp */}
                  <span style={{ color: "#9CA3AF", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {notification.date}
                  </span>

                  {/* More options */}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "4px",
                      cursor: "pointer",
                      display: "flex",
                      borderRadius: "4px",
                    }}
                  >
                    <MoreHorizontal size={14} color="#9CA3AF" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              color: "#9CA3AF",
            }}
          >
            <FileText size={48} strokeWidth={1} />
            <p style={{ fontSize: "14px", marginTop: "12px" }}>
              No hay notificaciones
            </p>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      <NotificationModal
        notificationId={modalNotificationId}
        onClose={() => setModalNotificationId(null)}
      />
    </div>
  );
}
