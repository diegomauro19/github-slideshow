'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-2xl px-6"
      >
        {/* Logo */}
        <div className="mb-12">
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight">
            Winter
          </h2>
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight">
            Kpital<span className="text-sm align-super ml-0.5">®</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />

        {/* Title */}
        <h1 className="font-heading text-2xl md:text-3xl font-semibold mb-4 text-white/90">
          Simulador de Impacto Operativo
        </h1>
        <p className="text-white/60 text-lg mb-3">
          Lorax × Winter Kpital
        </p>
        <p className="text-white/40 text-sm mb-12 max-w-md mx-auto">
          Herramienta interactiva para evaluar el impacto económico de las
          soluciones propuestas para Mystic Foods
        </p>

        {/* CTA */}
        <Link href="/simulador">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent hover:bg-accent/90 text-white font-heading font-semibold text-lg px-10 py-4 rounded-xl shadow-lg shadow-accent/20 transition-colors"
          >
            Iniciar Simulación
          </motion.button>
        </Link>

        {/* Footer note */}
        <p className="mt-16 text-white/25 text-xs">
          Documento confidencial · Preparado exclusivamente para Mystic Foods · 2026
        </p>
      </motion.div>
    </div>
  );
}
