'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  MessageCircle,
  Mail,
  Smartphone,
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { alerts as initialAlerts, type Alert } from '@/data/mock/alerts';
import { useToast } from '@/components/shared/Toast';

const NAVY = '#0D1B2A';
const GREEN = '#1E8449';
const RED = '#C0392B';
const AMBER = '#F39C12';
const ACCENT_BLUE = '#2980B9';

const typeConfig: Record<
  Alert['type'],
  { barColor: string; badgeBg: string; badgeText: string; label: string; Icon: typeof AlertTriangle }
> = {
  critical: { barColor: RED, badgeBg: 'bg-red-100', badgeText: 'text-red-800', label: 'CRITICO', Icon: AlertTriangle },
  warning: { barColor: AMBER, badgeBg: 'bg-yellow-100', badgeText: 'text-yellow-800', label: 'WARNING', Icon: AlertTriangle },
  variance: { barColor: AMBER, badgeBg: 'bg-amber-100', badgeText: 'text-amber-800', label: 'VARIANZA', Icon: TrendingUp },
  info: { barColor: ACCENT_BLUE, badgeBg: 'bg-blue-100', badgeText: 'text-blue-800', label: 'INFO', Icon: Info },
  success: { barColor: GREEN, badgeBg: 'bg-green-100', badgeText: 'text-green-800', label: 'EXITO', Icon: CheckCircle2 },
};

function ToggleSwitch({
  label,
  icon: Icon,
  enabled,
  onToggle,
}: {
  label: string;
  icon: typeof MessageCircle;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all"
      style={{
        borderColor: enabled ? ACCENT_BLUE : '#D1D5DB',
        backgroundColor: enabled ? '#EBF5FB' : '#FFFFFF',
      }}
    >
      <Icon size={18} style={{ color: enabled ? ACCENT_BLUE : '#9CA3AF' }} />
      <span className="text-sm font-medium" style={{ color: enabled ? NAVY : '#6B7280' }}>
        {label}
      </span>
      <div
        className="relative ml-2 w-10 h-5 rounded-full transition-colors"
        style={{ backgroundColor: enabled ? ACCENT_BLUE : '#D1D5DB' }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
          style={{ left: enabled ? '22px' : '2px' }}
        />
      </div>
    </button>
  );
}

function AlertCard({
  alert,
  onAction,
  fading,
  reviewed,
}: {
  alert: Alert;
  onAction: (action: string) => void;
  fading: boolean;
  reviewed: boolean;
}) {
  const config = typeConfig[alert.type];
  const IconComponent = config.Icon;

  return (
    <div
      className={`flex bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-500 ${
        fading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${reviewed ? 'border-green-300 bg-green-50/30' : 'border-gray-200'}`}
    >
      <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: reviewed ? GREEN : config.barColor }} />

      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${config.badgeBg} ${config.badgeText}`}
          >
            <IconComponent size={12} />
            {reviewed ? 'REVISADO' : config.label}
          </span>
          <span className="text-xs text-gray-400 ml-auto flex-shrink-0">{alert.timeAgo}</span>
        </div>

        <h3 className={`text-sm font-bold mb-1 ${reviewed ? 'line-through text-gray-400' : ''}`} style={{ color: reviewed ? undefined : NAVY }}>
          {alert.title}
        </h3>

        <p className={`text-sm mb-2 leading-relaxed ${reviewed ? 'text-gray-400' : 'text-gray-600'}`}>{alert.message}</p>

        {alert.recommendation && !reviewed && (
          <p className="text-sm italic mb-3" style={{ color: ACCENT_BLUE }}>
            Recomendación: {alert.recommendation}
          </p>
        )}

        {alert.actions.length > 0 && !reviewed && (
          <div className="flex flex-wrap gap-2">
            {alert.actions.map((action, i) => (
              <button
                key={action}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-transform hover:scale-105 active:scale-95 ${
                  i === 0 ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={i === 0 ? { backgroundColor: config.barColor } : {}}
                onClick={() => onAction(action)}
              >
                {action}
                {i === 0 && <ChevronRight size={12} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatSliderValue(value: number, type: 'pct' | 'days' | 'cop'): string {
  if (type === 'pct') return `${value}%`;
  if (type === 'days') return `${value} días`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function AlertasInteligentesPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);

  const [varianzaThreshold, setVarianzaThreshold] = useState(10);
  const [stockThreshold, setStockThreshold] = useState(2);
  const [ventasThreshold, setVentasThreshold] = useState(500000);

  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const [fadingIds, setFadingIds] = useState<Set<string>>(new Set());
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const visibleAlerts = alertList.filter((a) => !fadingIds.has(a.id) || fadingIds.has(a.id));

  const criticalCount = alertList.filter((a) => a.type === 'critical' && !reviewedIds.has(a.id)).length;
  const warningCount = alertList.filter((a) => (a.type === 'warning' || a.type === 'variance') && !reviewedIds.has(a.id)).length;

  // Threshold preview counts
  const varianzaAlertCount = useMemo(() => {
    const varianzaValues = [23, 21.5];
    return varianzaValues.filter((v) => v > varianzaThreshold).length;
  }, [varianzaThreshold]);

  const stockAlertCount = useMemo(() => {
    const stockDaysValues = [0.5, 1, 1.5];
    return stockDaysValues.filter((v) => v < stockThreshold).length;
  }, [stockThreshold]);

  const ventasAlertCount = useMemo(() => {
    const ventasValues = [1200000, 680000, 450000];
    return ventasValues.filter((v) => v > ventasThreshold).length;
  }, [ventasThreshold]);

  const fadeOutAlert = (id: string) => {
    setFadingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAlertList((prev) => prev.filter((a) => a.id !== id));
      setFadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500);
  };

  const handleAction = (alertId: string, action: string) => {
    const normalizedAction = action.toLowerCase();

    if (normalizedAction.includes('reposición')) {
      toast('success', 'Reposición solicitada al CDP');
    } else if (normalizedAction.includes('desactivar')) {
      toast('warning', 'Platos desactivados temporalmente');
    } else if (normalizedAction === 'ver detalle' || normalizedAction.includes('ver patrón') || normalizedAction.includes('ver análisis') || normalizedAction.includes('ver pedido') || normalizedAction.includes('ver recetas')) {
      const alert = alertList.find((a) => a.id === alertId);
      if (alert?.type === 'variance') {
        router.push('/varianza');
      } else if (alert?.type === 'info' && alert.title.includes('Conteo')) {
        router.push('/conteo-cierre');
      } else {
        toast('info', 'Navegando al detalle...');
      }
    } else if (normalizedAction.includes('revisado')) {
      setReviewedIds((prev) => new Set(prev).add(alertId));
      toast('success', 'Alerta marcada como revisada');
    } else if (normalizedAction === 'ignorar' || normalizedAction === 'descartar') {
      fadeOutAlert(alertId);
      toast('info', 'Alerta descartada');
    } else if (normalizedAction.includes('sustituto')) {
      toast('info', 'Buscando sustitutos disponibles...');
    } else if (normalizedAction.includes('pedido')) {
      toast('success', 'Ingrediente agregado al próximo pedido');
    } else if (normalizedAction.includes('prioridad')) {
      toast('warning', 'Producto marcado como uso prioritario');
    } else {
      toast('info', `Acción "${action}" ejecutada`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                Alertas Inteligentes
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: GREEN }}>
                Capa 3
              </span>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Notificaciones basadas en patrones e impacto económico
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RED }} />
              <span className="text-gray-600">{criticalCount} críticas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: AMBER }} />
              <span className="text-gray-600">{warningCount} advertencias</span>
            </div>
          </div>
        </div>

        {/* Notification toggles */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} style={{ color: NAVY }} />
            <h2 className="text-sm font-bold" style={{ color: NAVY }}>Canales de Notificación</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ToggleSwitch label="WhatsApp" icon={MessageCircle} enabled={whatsapp} onToggle={() => setWhatsapp(!whatsapp)} />
            <ToggleSwitch label="Email" icon={Mail} enabled={email} onToggle={() => setEmail(!email)} />
            <ToggleSwitch label="Push" icon={Smartphone} enabled={push} onToggle={() => setPush(!push)} />
          </div>
        </div>

        {/* Alert feed */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} style={{ color: AMBER }} />
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>Feed de Alertas</h2>
            <span className="text-xs text-gray-400 ml-auto">{alertList.length} alertas</span>
          </div>

          <div className="relative">
            <div className="absolute left-[11px] top-6 bottom-6 w-px bg-gray-200 hidden sm:block" />
            <div className="space-y-4">
              {visibleAlerts.map((alert) => (
                <div key={alert.id} className="relative sm:pl-8">
                  <div
                    className="absolute left-0 top-6 w-[23px] h-[23px] rounded-full border-[3px] border-white shadow-sm hidden sm:flex items-center justify-center"
                    style={{ backgroundColor: reviewedIds.has(alert.id) ? GREEN : typeConfig[alert.type].barColor }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <AlertCard
                    alert={alert}
                    onAction={(action) => handleAction(alert.id, action)}
                    fading={fadingIds.has(alert.id)}
                    reviewed={reviewedIds.has(alert.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {alertList.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-green-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No hay alertas pendientes</p>
            </div>
          )}
        </div>

        {/* Threshold configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={18} style={{ color: NAVY }} />
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>Configuración de Umbrales</h2>
          </div>

          <div className="space-y-8">
            {/* Varianza threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Varianza &gt; <strong style={{ color: AMBER }}>{varianzaThreshold}%</strong> → alerta
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{varianzaAlertCount} alertas activas</span>
                  <span className="text-sm font-bold px-3 py-0.5 rounded-full" style={{ backgroundColor: AMBER + '20', color: AMBER }}>
                    {formatSliderValue(varianzaThreshold, 'pct')}
                  </span>
                </div>
              </div>
              <input
                type="range" min={1} max={30} step={1} value={varianzaThreshold}
                onChange={(e) => setVarianzaThreshold(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${AMBER} 0%, ${AMBER} ${((varianzaThreshold - 1) / 29) * 100}%, #E5E7EB ${((varianzaThreshold - 1) / 29) * 100}%, #E5E7EB 100%)` }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1%</span><span>30%</span></div>
            </div>

            {/* Stock threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Stock &lt; <strong style={{ color: RED }}>{stockThreshold} días</strong> → alerta
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{stockAlertCount} alertas activas</span>
                  <span className="text-sm font-bold px-3 py-0.5 rounded-full" style={{ backgroundColor: RED + '20', color: RED }}>
                    {formatSliderValue(stockThreshold, 'days')}
                  </span>
                </div>
              </div>
              <input
                type="range" min={0.5} max={7} step={0.5} value={stockThreshold}
                onChange={(e) => setStockThreshold(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${RED} 0%, ${RED} ${((stockThreshold - 0.5) / 6.5) * 100}%, #E5E7EB ${((stockThreshold - 0.5) / 6.5) * 100}%, #E5E7EB 100%)` }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0.5 días</span><span>7 días</span></div>
            </div>

            {/* Ventas perdidas threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Ventas perdidas &gt;{' '}
                  <strong style={{ color: ACCENT_BLUE }}>{formatSliderValue(ventasThreshold, 'cop')}</strong> → alerta
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{ventasAlertCount} alertas activas</span>
                  <span className="text-sm font-bold px-3 py-0.5 rounded-full" style={{ backgroundColor: ACCENT_BLUE + '20', color: ACCENT_BLUE }}>
                    {formatSliderValue(ventasThreshold, 'cop')}
                  </span>
                </div>
              </div>
              <input
                type="range" min={100000} max={2000000} step={50000} value={ventasThreshold}
                onChange={(e) => setVentasThreshold(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${ACCENT_BLUE} 0%, ${ACCENT_BLUE} ${((ventasThreshold - 100000) / 1900000) * 100}%, #E5E7EB ${((ventasThreshold - 100000) / 1900000) * 100}%, #E5E7EB 100%)` }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$100K</span><span>$2M</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
