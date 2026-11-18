import type { Comida } from '../services/comidasApi';

export interface DiaResumen {
  dia: string; // aaaa-mm-dd
  comidas: Comida[];
}

function claveDia(fecha: Date, zonaHoraria?: string): string {
  const partes = new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: zonaHoraria,
  }).formatToParts(fecha);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? '';
  return `${valor('year')}-${valor('month')}-${valor('day')}`;
}

// Devuelve siempre 7 días (del más antiguo al de hoy). Los días sin comidas
// quedan con la lista vacía; las comidas más viejas o con fecha inválida se ignoran.
export function agruparPorDia(comidas: Comida[], hoy: Date, zonaHoraria?: string): DiaResumen[] {
  const dias: DiaResumen[] = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date(hoy.getTime() - i * 24 * 60 * 60 * 1000);
    dias.push({ dia: claveDia(fecha, zonaHoraria), comidas: [] });
  }

  for (const c of comidas) {
    const fecha = new Date(c.fecha);
    if (Number.isNaN(fecha.getTime())) continue;
    const destino = dias.find((d) => d.dia === claveDia(fecha, zonaHoraria));
    if (destino) destino.comidas.push(c);
  }
  return dias;
}