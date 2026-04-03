"use client";

import { usePathname } from "next/navigation";
import MQTTIndicator from "@/components/shared/MQTTIndicator";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/mapa": "Mapa",
  "/inventario": "Inventario",
  "/pos-locales": "POS Locales",
  "/devoluciones": "Devoluciones",
  "/pedidos": "Pedidos",
  "/metricas": "Métricas de Flujo",
  "/cdp": "CDP",
  "/recetas": "Recetas",
  "/varianza": "Varianza AvT",
  "/conteo-cierre": "Conteo de Cierre",
  "/patrones": "Patrones",
  "/ventas-perdidas": "Ventas Perdidas",
  "/prediccion-agotados": "Predicción Agotados",
  "/alertas-inteligentes": "Alertas Inteligentes",
  "/disponibilidad-carta": "Disponibilidad de Carta",
  "/dispositivos": "Dispositivos",
  "/perfiles": "Gestión de Perfiles",
  "/configuracion": "Configuración",
};

export default function Header() {
  const pathname = usePathname();
  const currentPage = pageTitles[pathname] || "Inicio";

  return (
    <header className="h-14 bg-card border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400">VitaTag</span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-navy">{currentPage}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <MQTTIndicator />

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-[11px] font-semibold text-white">
            DM
          </div>
          <span className="text-sm font-medium text-gray-700">
            Diego Mauro
          </span>
        </div>
      </div>
    </header>
  );
}
