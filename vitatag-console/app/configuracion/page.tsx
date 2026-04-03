'use client';

import { useState } from 'react';
import { Settings, Wifi, Bell, SlidersHorizontal, Globe, Clock, Mail, MessageSquare, Smartphone, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/shared/Toast';

const NAVY = '#0D1B2A';
const ACCENT_BLUE = '#2980B9';
const TEAL = '#148F77';
const GREEN = '#1E8449';
const AMBER = '#F39C12';

const DEFAULTS = {
  empresa: 'Mystic Foods SAS',
  timezone: 'America/Bogota (UTC-5)',
  idioma: 'Español (Colombia)',
  brokerUrl: 'mqtt://broker.vitatag.io',
  brokerPort: '8883',
  emailNotif: true,
  whatsappNotif: true,
  pushNotif: false,
  varianzaMax: '5',
  stockMin: '10',
  diasVencimiento: '3',
};

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function ConfiguracionPage() {
  const { toast } = useToast();

  const [empresa, setEmpresa] = useState(DEFAULTS.empresa);
  const [timezone, setTimezone] = useState(DEFAULTS.timezone);
  const [idioma, setIdioma] = useState(DEFAULTS.idioma);
  const [brokerUrl, setBrokerUrl] = useState(DEFAULTS.brokerUrl);
  const [brokerPort, setBrokerPort] = useState(DEFAULTS.brokerPort);
  const [emailNotif, setEmailNotif] = useState(DEFAULTS.emailNotif);
  const [whatsappNotif, setWhatsappNotif] = useState(DEFAULTS.whatsappNotif);
  const [pushNotif, setPushNotif] = useState(DEFAULTS.pushNotif);
  const [varianzaMax, setVarianzaMax] = useState(DEFAULTS.varianzaMax);
  const [stockMin, setStockMin] = useState(DEFAULTS.stockMin);
  const [diasVencimiento, setDiasVencimiento] = useState(DEFAULTS.diasVencimiento);

  const handleSave = () => {
    toast('success', 'Configuración guardada exitosamente');
  };

  const handleReset = () => {
    setEmpresa(DEFAULTS.empresa);
    setTimezone(DEFAULTS.timezone);
    setIdioma(DEFAULTS.idioma);
    setBrokerUrl(DEFAULTS.brokerUrl);
    setBrokerPort(DEFAULTS.brokerPort);
    setEmailNotif(DEFAULTS.emailNotif);
    setWhatsappNotif(DEFAULTS.whatsappNotif);
    setPushNotif(DEFAULTS.pushNotif);
    setVarianzaMax(DEFAULTS.varianzaMax);
    setStockMin(DEFAULTS.stockMin);
    setDiasVencimiento(DEFAULTS.diasVencimiento);
    toast('info', 'Valores restablecidos por defecto');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Configuración del Sistema</h1>
        <p className="text-gray-500 mt-1">Parámetros generales, conexiones y umbrales del sistema VitaTag</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* General */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT_BLUE + '15' }}>
              <Globe size={18} style={{ color: ACCENT_BLUE }} />
            </div>
            <div>
              <h2 className="font-semibold" style={{ color: NAVY }}>General</h2>
              <p className="text-xs text-gray-400">Información básica de la empresa</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Nombre de la empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Zona horaria</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
              >
                <option>America/Bogota (UTC-5)</option>
                <option>America/New_York (UTC-5)</option>
                <option>America/Mexico_City (UTC-6)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Idioma</label>
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
              >
                <option>Español (Colombia)</option>
                <option>English</option>
                <option>Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* MQTT */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: TEAL + '15' }}>
              <Wifi size={18} style={{ color: TEAL }} />
            </div>
            <div>
              <h2 className="font-semibold" style={{ color: NAVY }}>MQTT</h2>
              <p className="text-xs text-gray-400">Conexión al broker de mensajería</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Broker URL</label>
              <input
                type="text"
                value={brokerUrl}
                onChange={(e) => setBrokerUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Puerto</label>
              <input
                type="text"
                value={brokerPort}
                onChange={(e) => setBrokerPort(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Estado</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Conectado</span>
                <span className="text-xs text-green-500 ml-auto">Latencia: 12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: AMBER + '15' }}>
              <Bell size={18} style={{ color: AMBER }} />
            </div>
            <div>
              <h2 className="font-semibold" style={{ color: NAVY }}>Notificaciones</h2>
              <p className="text-xs text-gray-400">Canales de alerta</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-xs text-gray-400">Alertas al correo del equipo</p>
                </div>
              </div>
              <Toggle enabled={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">WhatsApp</p>
                  <p className="text-xs text-gray-400">Alertas críticas por WhatsApp</p>
                </div>
              </div>
              <Toggle enabled={whatsappNotif} onChange={() => setWhatsappNotif(!whatsappNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Push</p>
                  <p className="text-xs text-gray-400">Notificaciones push al navegador</p>
                </div>
              </div>
              <Toggle enabled={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
            </div>
          </div>
        </div>

        {/* Umbrales */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN + '15' }}>
              <SlidersHorizontal size={18} style={{ color: GREEN }} />
            </div>
            <div>
              <h2 className="font-semibold" style={{ color: NAVY }}>Umbrales</h2>
              <p className="text-xs text-gray-400">Límites para alertas automáticas</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Varianza máxima permitida (%)</label>
              <input
                type="number"
                value={varianzaMax}
                onChange={(e) => setVarianzaMax(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-400 mt-1">Se genera alerta si la varianza supera este porcentaje</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Stock mínimo (unidades)</label>
              <input
                type="number"
                value={stockMin}
                onChange={(e) => setStockMin(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-400 mt-1">Alerta cuando un producto baje de este nivel</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Días antes de vencimiento</label>
              <input
                type="number"
                value={diasVencimiento}
                onChange={(e) => setDiasVencimiento(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-400 mt-1">Alerta de productos próximos a vencer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={16} />
          Restablecer valores por defecto
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: GREEN }}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
