import {
  HeroReactivePanel,
  RocketThrustLab,
  FormulaMassAccelLab,
  NetForceVectorsLab,
  FreeBodyInteractiveLab,
  FrictionRailLab,
  RealWorldSwitcherLab,
  ConclusionRecapLab,
} from './PhysicsLabs.jsx'

/** Orden igual que `sections.slice(1)` — cada derecha es un laboratorio con controles accesibles desde proyector o táctil */
const LAB_BY_SECTION_INDEX = [
  RocketThrustLab,
  FormulaMassAccelLab,
  NetForceVectorsLab,
  FreeBodyInteractiveLab,
  FrictionRailLab,
  RealWorldSwitcherLab,
  ConclusionRecapLab,
]

export default function PhysicsPresentation() {
  const sections = [
    {
      title: 'Las fuerzas que mueven el mundo',
      subtitle: 'Segunda Ley de Newton y Diagramas de Cuerpo Libre',
      content: 'GP2-FIS1 · Universidad Evangélica de El Salvador',
    },
    {
      title: '¿Por qué los objetos aceleran?',
      subtitle: 'Todo cambia cuando una fuerza actúa.',
      content:
        'Automóviles, cohetes, atletas y máquinas responden a fuerzas que gobiernan el movimiento. Con el empuje y la masa visibles, la aceleración aparece de inmediato en el modelo.',
    },
    {
      title: 'La Segunda Ley de Newton',
      subtitle: 'La fuerza neta produce aceleración.',
      formula: 'F = m · a',
      content:
        'Desliza el bloque modelo con el ratón o el táctil sobre un riel horizontal sin roce. Al soltar, la animación obedece a F y m: la velocidad cambia porque se integra numéricamente a = F ÷ m.',
    },
    {
      title: 'Fuerza Neta',
      subtitle: 'Las fuerzas compiten entre sí.',
      content:
        'La resultante indica qué efecto predomina en ese instante. Si la suma se anula sobre el modelo en un eje, ese eje queda en equilibrio para las condiciones supuestas.',
    },
    {
      title: 'Diagramas de Cuerpo Libre',
      subtitle: 'El idioma de la mecánica.',
      content:
        'Cada botón activa o apaga una fuerza sobre el cuerpo aislado; el diagrama muestra sólo las interacciones elegidas en ese momento.',
    },
    {
      title: 'Laboratorio guiado sobre el riel',
      subtitle: 'Caja modelo con roce',
      content:
        'Misma mesa en pantalla con masa, empuje y rozamiento regulables: se coloca la caja con el puntero y, al soltar, el empuje compite con la fricción para la masa fijada en el deslizador.',
    },
    {
      title: 'Aplicaciones rápidas',
      subtitle: 'La física vuelve repetible en otros mundos.',
      content:
        'Ejemplos en pestañas: curva con frenado, escenario eléctrico, cohete, salto y un modelo de impulso lineal, todos bajo la misma segunda ley.',
    },
    {
      title: 'Conclusión',
      subtitle: 'Síntesis: fuerza neta y trayectoria siguen las mismas reglas en todos los casos vistos.',
      content:
        'Para cerrar: la fuerza neta iguala masa por aceleración (en un marco inercial). Con masa fija, mayor fuerza neta implica mayor magnitud de aceleración en la dirección de la resultante.',
    },
  ]

  return (
    <div className="overflow-x-hidden bg-[var(--lab-bg-deep)] font-sans text-white">
      <style>{`
        .hero-shell {
          background:
            radial-gradient(ellipse 140% 80% at 8% -10%, rgba(83, 217, 199, 0.18), transparent 42%),
            radial-gradient(circle at 94% 18%, rgba(247, 208, 154, 0.12), transparent 38%),
            linear-gradient(168deg, #0a1018 0%, #05060b 92%);
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glass-panel {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 32px 80px -40px rgba(83, 217, 199, 0.25);
        }
        .floating {
          animation: floatHero 9s ease-in-out infinite;
        }
        @keyframes floatHero {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-shell relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 md:px-12">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-[18%] h-72 w-72 rounded-full bg-[color:rgb(83_217_199_/0.12)] blur-3xl md:left-[14%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[10%] right-[8%] h-72 w-72 rounded-full bg-[color:rgb(247_208_154_/0.1)] blur-3xl md:right-[12%]"
        />

        <div className="relative z-10 grid w-full max-w-7xl gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-16">
          <div className="space-y-8 text-center md:text-left floating">
            <div className="inline-flex rounded-full glass-panel px-6 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[var(--lab-accent-soft)]">
              GP2-FIS1
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white md:text-7xl lg:text-[4.95rem]">
              Las fuerzas
              <span className="mt-3 block bg-gradient-to-r from-[var(--lab-accent)] via-teal-200 to-[var(--lab-warm)] bg-clip-text text-transparent md:mt-1">
                que mueven el mundo
              </span>
            </h1>
            <p className="mx-auto max-w-xl font-serif text-xl italic text-white/[0.78] md:mx-0 md:text-[1.375rem]">
              Segunda Ley de Newton con laboratorios táctiles: cada gesto muestra el vínculo entre fuerza neta, masa observada y aceleración al instante.
            </p>
            <div className="glass-panel mx-auto rounded-[1.75rem] p-8 text-lg text-white/88 md:mx-0 md:max-w-lg">
              <p>{sections[0].content}</p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-lg justify-center md:mx-0 md:justify-end">
            <div className="w-full animate-[fadeHero_1.05s_ease_forwards]" style={{ animationDelay: '0.12s', opacity: 0 }}>
              <HeroReactivePanel />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeHero {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* SECTIONS + LABS */}
      {sections.slice(1).map((section, index) => {
        const Lab = LAB_BY_SECTION_INDEX[index]
        return (
          <section
            key={`${section.title}-${index}`}
            className="relative flex min-h-screen items-center px-6 py-[6.25rem] md:px-12"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_96%_60%_at_54%_-4%,rgba(83,217,199,0.09),transparent_62%),linear-gradient(to_bottom,#040508,#090b12_62%,#040508)]"
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
              <div className="grid gap-14 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:items-start md:gap-16">
                <div className="space-y-7">
                  <div className="inline-flex rounded-full glass-panel px-5 py-[0.4rem] font-mono text-[0.645rem] font-semibold uppercase tracking-[0.28em] text-[var(--lab-accent-soft)]">
                    Física 1 · interactivo
                  </div>
                  <h2 className="font-display text-[2.625rem] font-bold leading-[1.04] tracking-[-0.035em] text-white md:text-6xl lg:text-[3.92rem]">
                    {section.title}
                  </h2>
                  <p className="font-serif text-2xl italic text-[var(--lab-accent)] md:text-[1.65rem]">{section.subtitle}</p>

                  {section.formula ? (
                    <div className="glass-panel mx-auto rounded-[2.25rem] p-10 text-center md:mx-0 md:inline-block md:px-14">
                      <div className="font-display bg-gradient-to-br from-teal-200 via-white to-teal-100 bg-clip-text text-[2.985rem] font-black leading-none tracking-tighter text-transparent md:text-[min(17vw,4.8rem)]">
                        {section.formula}
                      </div>
                    </div>
                  ) : null}

                  <p className="max-w-2xl text-lg leading-[1.7] text-white/[0.78]">{section.content}</p>
                </div>

                <div className="flex justify-center md:justify-end md:pt-6">{Lab ? <Lab /> : null}</div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
