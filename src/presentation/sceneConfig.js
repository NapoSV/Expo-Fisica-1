/** Partes alineadas a la estructura 5 + 10 + 5 min (intro / desarrollo / cierre) */
export const PART_LABELS = {
  intro: 'Introducción teórica',
  theory: 'Desarrollo del tema',
  practice: 'Ejercicios resueltos',
  closing: 'Aplicación y cierre',
}

/** Una vista por bloque · narración en vivo desde este tablero. */
export const SCENES = [
  { id: 'cover', title: 'Inicio', part: 'intro', innerSteps: 1 },
  { id: 'motion', title: 'Movimiento y fuerza', part: 'intro', innerSteps: 1 },
  { id: 'massRace', title: 'Misma fuerza, distinta masa', part: 'intro', innerSteps: 1 },
  { id: 'secondLaw', title: 'Segunda Ley de Newton', part: 'theory', innerSteps: 1 },
  { id: 'netForce', title: 'Fuerza neta y equilibrio', part: 'theory', innerSteps: 1 },
  { id: 'dcl', title: 'Diagrama de cuerpo libre', part: 'theory', innerSteps: 1 },
  { id: 'exoVertical', title: 'Ejercicio — Equilibrio vertical', part: 'practice', innerSteps: 1 },
  { id: 'exoFriction', title: 'Ejercicio — Fricción horizontal', part: 'practice', innerSteps: 1 },
  { id: 'exoCentripetal', title: 'Ejercicio — Fuerza centrípeta', part: 'practice', innerSteps: 1 },
  { id: 'realWorld', title: 'Aplicación — Frenado', part: 'closing', innerSteps: 1 },
  { id: 'outro', title: 'Cierre', part: 'closing', innerSteps: 1 },
]

export const TOTAL_INNER = SCENES.reduce((acc, s) => acc + s.innerSteps, 0)
