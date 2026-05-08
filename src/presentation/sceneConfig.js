/** Secciones alineadas a los 7 expositores del PDF PropuestaExpoFisica */
export const PART_LABELS = {
  expo1: 'Expositor 1 · Segunda Ley e Inercia',
  expo2: 'Expositor 2 · Diagrama de Cuerpo Libre',
  expo3: 'Expositor 3 · Catálogo de Fuerzas',
  expo4: 'Expositor 4 · Unidades SI y Ejes',
  expo5: 'Expositor 5 · Fuerzas en Ángulo y Equilibrio',
  expo6: 'Expositor 6 · Sistema Horizontal con Fricción',
  expo7: 'Expositor 7 · Plano Inclinado y Cierre',
}

export const SCENES = [
  { id: 'cover',         title: 'Portada',                                    part: 'expo1', innerSteps: 1 },
  { id: 'inercia',       title: 'Segunda Ley e Inercia',                      part: 'expo1', innerSteps: 1 },
  { id: 'massRace',      title: 'Misma fuerza, distinta masa',                part: 'expo1', innerSteps: 1 },
  { id: 'dcl',           title: 'DCL y Modelo de Partícula',                  part: 'expo2', innerSteps: 1 },
  { id: 'forcesCatalog', title: 'Catálogo de Fuerzas Mecánicas',              part: 'expo3', innerSteps: 1 },
  { id: 'unitsAxes',     title: 'Unidades SI y Descomposición en Ejes',       part: 'expo4', innerSteps: 1 },
  { id: 'angledForces',  title: 'Fuerzas en Ángulo y Equilibrio Mecánico',    part: 'expo5', innerSteps: 1 },
  { id: 'netForce',      title: 'Equilibrio vertical y rozamiento horizontal', part: 'expo5', innerSteps: 1 },
  { id: 'exoVertical',   title: 'Ejercicio — Equilibrio vertical',            part: 'expo6', innerSteps: 1 },
  { id: 'exoFriction',   title: 'Ejercicio — Sistema horizontal con fricción', part: 'expo6', innerSteps: 1 },
  { id: 'exoInclined',   title: 'Ejercicio — Plano inclinado',                part: 'expo7', innerSteps: 1 },
  { id: 'exoCentripetal',title: 'Ejercicio — Fuerza centrípeta',              part: 'expo7', innerSteps: 1 },
  { id: 'realWorld',     title: 'Aplicación — Frenado y Segunda Ley',         part: 'expo7', innerSteps: 1 },
  { id: 'outro',         title: 'Cierre',                                     part: 'expo7', innerSteps: 1 },
]

export const TOTAL_INNER = SCENES.reduce((acc, s) => acc + s.innerSteps, 0)
