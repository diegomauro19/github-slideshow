"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Package,
  Store,
  RotateCcw,
  ShoppingCart,
  Activity,
  Users,
  BookOpen,
  BarChart3,
  ClipboardCheck,
  BrainCircuit,
  TrendingDown,
  AlertTriangle,
  Bell,
  UtensilsCrossed,
  Cpu,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  badge?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "CAPA 1: OPERACIÓN",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Mapa", href: "/mapa", icon: Map },
      { label: "Inventario", href: "/inventario", icon: Package },
      { label: "POS Locales", href: "/pos-locales", icon: Store },
      { label: "Devoluciones", href: "/devoluciones", icon: RotateCcw },
      { label: "Pedidos", href: "/pedidos", icon: ShoppingCart },
      { label: "Métricas de Flujo", href: "/metricas", icon: Activity },
      { label: "CDP", href: "/cdp", icon: Users },
    ],
  },
  {
    title: "CAPA 2: CONTROL",
    badge: "Nuevo",
    items: [
      { label: "Recetas", href: "/recetas", icon: BookOpen },
      { label: "Varianza AvT", href: "/varianza", icon: BarChart3 },
      { label: "Conteo de Cierre", href: "/conteo-cierre", icon: ClipboardCheck },
    ],
  },
  {
    title: "CAPA 3: INTELIGENCIA",
    badge: "Nuevo",
    items: [
      { label: "Patrones", href: "/patrones", icon: BrainCircuit },
      { label: "Ventas Perdidas", href: "/ventas-perdidas", icon: TrendingDown },
      { label: "Predicción Agotados", href: "/prediccion-agotados", icon: AlertTriangle },
      { label: "Alertas Inteligentes", href: "/alertas-inteligentes", icon: Bell },
      { label: "Disponibilidad de Carta", href: "/disponibilidad-carta", icon: UtensilsCrossed },
    ],
  },
  {
    title: "SISTEMA",
    items: [
      { label: "Dispositivos", href: "/dispositivos", icon: Cpu },
      { label: "Gestión de Perfiles", href: "/perfiles", icon: UserCog },
      { label: "Configuración", href: "/configuracion", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen bg-[#0D1B2A] text-white shrink-0 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-heading font-bold tracking-tight">
              MysticFoods
            </h1>
            <p className="text-[10px] text-gray-400 tracking-wide">
              Powered by VitaTag
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-white/10"
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* KPI mini header */}
      {!collapsed && (
        <div className="mx-4 mb-3 px-3 py-2 rounded-md bg-white/5 border border-white/10">
          <p className="text-[11px] text-gray-300 font-data">
            19 PdV &nbsp;|&nbsp; 47 Personal &nbsp;|&nbsp; 3,198 Productos
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-4">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="flex items-center gap-2 px-2 mb-1">
                <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                  {section.title}
                </span>
                {section.badge && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-accent-blue/20 text-accent-blue">
                    {section.badge}
                  </span>
                )}
              </div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent-blue/20 text-accent-blue"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      } ${collapsed ? "justify-center" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-3">
        {collapsed ? (
          <div className="w-8 h-8 rounded-full bg-accent-blue/30 flex items-center justify-center text-xs font-semibold text-accent-blue mx-auto">
            D
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-blue/30 flex items-center justify-center text-xs font-semibold text-accent-blue">
              DM
            </div>
            <div>
              <p className="text-sm font-medium text-white">Diego</p>
              <p className="text-[11px] text-gray-400">Administrador</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
