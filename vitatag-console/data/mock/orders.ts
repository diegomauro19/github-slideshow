export interface Order {
  id: string;
  fecha: string;
  sucursal: string;
  sucursalId: string;
  numPedido: string;
  referencia: string;
  descripcion: string;
  ubicacion: string;
  unidadesPedido: number;
  unidadesTotal: number;
  estado: 'Pendiente' | 'Entregado' | 'Parcial';
}

const sucursales = [
  { id: 'oli-laureles', name: 'Olivia Laureles' },
  { id: 'oli-viva', name: 'Olivia Viva Envigado' },
  { id: 'clap-laureles', name: 'Clap Laureles' },
  { id: 'oli-arkadia', name: 'Olivia Arkadia' },
  { id: 'oli-10b', name: 'Olivia 10b' },
];

const productos = [
  { ref: 'SOL-245', desc: 'Solomito x 5 und', ub: 'CDP Nevera 2' },
  { ref: 'PCH-301', desc: 'Pollo Pechuga x 10 und', ub: 'CDP Nevera 1' },
  { ref: 'BOL-136', desc: 'Salsa Bolognesa x 500g', ub: 'CDP Nevera 2' },
  { ref: 'QPR-578', desc: 'Queso Parmesano Rallado x 250g', ub: 'CDP Nevera 1' },
  { ref: 'SAL-890', desc: 'Salmón Fresco x kg', ub: 'CDP Nevera 1' },
  { ref: 'LSG-210', desc: 'Lasagna Porción x 350g', ub: 'CDP Nevera 2' },
  { ref: 'SPG-215', desc: 'Spaghetti Fresco x 500g', ub: 'CDP Nevera 1' },
  { ref: 'MPZ-510', desc: 'Masa Pizza x und', ub: 'CDP Nevera 2' },
  { ref: 'VCH-600', desc: 'Volcán de Chocolate x und', ub: 'CDP Nevera 2' },
  { ref: 'HUM-050', desc: 'Hummus x 500g', ub: 'CDP Nevera 1' },
  { ref: 'PMC-500', desc: 'Pan Multicereal x 6 und', ub: 'CDP Nevera 2' },
  { ref: 'TCN-525', desc: 'Tocineta Ahumada x kg', ub: 'CDP Nevera 1' },
  { ref: 'AGU-700', desc: 'Aguacate Hass x und', ub: 'CDP Nevera 1' },
  { ref: 'QDC-300', desc: 'Queso Doble Crema x kg', ub: 'CDP Nevera 1' },
  { ref: 'MNT-325', desc: 'Mantequilla sin sal x 500g', ub: 'CDP Nevera 1' },
  { ref: 'NAP-140', desc: 'Salsa Napolitana x 500g', ub: 'CDP Nevera 2' },
  { ref: 'PFM-800', desc: 'Pulpa Fresa-Mango x lt', ub: 'CDP Nevera 2' },
  { ref: 'RVC-200', desc: 'Ravioli de Carne x 500g', ub: 'CDP Nevera 2' },
  { ref: 'QCH-305', desc: 'Queso Cheddar Láminas x 500g', ub: 'CDP Nevera 1' },
  { ref: 'MIL-456', desc: 'Milanesa de Res x 6 und', ub: 'CDP Nevera 2' },
];

function generateOrders(): Order[] {
  const orders: Order[] = [];
  let id = 1;
  for (let d = 1; d <= 30; d++) {
    const day = d.toString().padStart(2, '0');
    for (const suc of sucursales) {
      const numProducts = 3 + Math.floor(Math.random() * 5);
      const shuffled = [...productos].sort(() => Math.random() - 0.5).slice(0, numProducts);
      for (const prod of shuffled) {
        const qty = 5 + Math.floor(Math.random() * 50);
        orders.push({
          id: `ord-${id++}`,
          fecha: `2026-03-${day}`,
          sucursal: suc.name,
          sucursalId: suc.id,
          numPedido: `PED-${(2600 + id).toString()}`,
          referencia: prod.ref,
          descripcion: prod.desc,
          ubicacion: prod.ub,
          unidadesPedido: qty,
          unidadesTotal: qty * (2 + Math.floor(Math.random() * 8)),
          estado: 'Pendiente',
        });
      }
    }
  }
  return orders;
}

export const orders = generateOrders();

export const ORDER_STATS = {
  total: 993,
  pendientes: 993,
  entregados: 0,
};

export const ordersByLocal = [
  { name: 'Clap Laureles', productos: 79650, unidades: 79650, estado: 'Pendientes' as const, fecha: '2026-03-12' },
  { name: 'Olivia Laureles', productos: 190, unidades: 318950, estado: 'Pendientes' as const, fecha: '2026-03-25' },
  { name: 'Olivia Viva Envigado', productos: 145, unidades: 245300, estado: 'Pendientes' as const, fecha: '2026-03-24' },
  { name: 'Olivia Arkadia', productos: 98, unidades: 156200, estado: 'Pendientes' as const, fecha: '2026-03-22' },
  { name: 'Olivia 10b', productos: 76, unidades: 124500, estado: 'Pendientes' as const, fecha: '2026-03-20' },
];
