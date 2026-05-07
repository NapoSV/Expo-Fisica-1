import { motion } from 'framer-motion'

/**
 * Cromática y marcos coherentes para una expo frente al salón:
 * titular grande, línea corta para el equipo, escenario físico alto.
 */

export function PhosphorBadge({ children, tone = 'default' }) {
  const tones = {
    default: 'border-white/15 bg-white/[0.06] text-zinc-200',
    live: 'border-[color:var(--accent)]/40 bg-[color:var(--accent)]/[0.08] text-[color:var(--accent)]',
    warm: 'border-amber-400/35 bg-amber-500/[0.08] text-amber-100',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] ${tones[tone] ?? tones.default}`}
    >
      {children}
    </span>
  )
}

const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 22 } },
}

/**
 * @param {object} props
 * @param {string} props.kicker — Sección / módulo (micro, mono)
 * @param {string} props.title — Lo que ve el salón
 * @param {string} [props.caption] — Una línea de contexto; la charla la amplía
 * @param {React.ReactNode} [props.badges]
 * @param {React.ReactNode} [props.sidebar] — Fórmulas / recordatorios
 * @param {React.ReactNode} props.children — Simulador o bloque principal
 * @param {'left'|'right'} [props.sidebarPosition]
 */
export function AudienceSlide({
  kicker,
  title,
  caption,
  badges,
  sidebar,
  children,
  sidebarPosition = 'left',
  className = '',
}) {
  const aside = sidebar ? (
    <motion.aside
      variants={headerItem}
      className="panel-rail flex min-h-0 flex-col justify-start gap-4 rounded-[var(--r-panel)] p-6 md:p-8"
    >
      {sidebar}
    </motion.aside>
  ) : null

  const stage = (
    <motion.div
      variants={headerItem}
      className="stage-panel relative flex min-h-[min(58vh,720px)] min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--r-stage)] p-4 md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(105deg, transparent 48%, rgba(110,240,255,0.08) 50%, transparent 52%)`,
          }}
        />
      </div>
      <div className="relative z-[1] min-h-0 flex-1">{children}</div>
    </motion.div>
  )

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={headerStagger}
      className={`flex min-h-0 w-full min-w-0 flex-1 flex-col gap-8 lg:gap-10 ${className}`}
    >
      <header className="max-w-[min(75ch,calc(100vw-4rem))] space-y-3">
        <motion.div variants={headerItem} className="flex flex-wrap items-center gap-2">
          {badges}
        </motion.div>
        <motion.p
          variants={headerItem}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-zinc-500"
        >
          {kicker}
        </motion.p>
        <motion.h2
          variants={headerItem}
          className="break-words font-display text-[clamp(1.65rem,3.9vw,3.05rem)] font-extrabold leading-[1.08] tracking-[-0.03em]"
        >
          {title}
        </motion.h2>
        {caption ? (
          <motion.p variants={headerItem} className="max-w-[60ch] break-words text-lg italic leading-snug text-zinc-400 md:text-[1.2rem]">
            {caption}
          </motion.p>
        ) : null}
      </header>

      {sidebar ? (
        <motion.div variants={headerItem} className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {sidebarPosition === 'left' ? (
            <>
              <div className="min-h-0 lg:col-span-4">{aside}</div>
              <div className="min-h-0 lg:col-span-8">{stage}</div>
            </>
          ) : (
            <>
              <div className="min-h-0 lg:col-span-8">{stage}</div>
              <div className="min-h-0 lg:col-span-4">{aside}</div>
            </>
          )}
        </motion.div>
      ) : (
        <motion.div variants={headerItem} className="min-h-0 flex-1">
          {stage}
        </motion.div>
      )}
    </motion.div>
  )
}

/** Panel secundario: enunciados, listas cerradas — sin ordenar al equipo en segunda persona agresiva */
export function BoardPanel({
  eyebrow,
  title,
  children,
  tint = 'slate',
  className = '',
}) {
  const tints = {
    slate: 'border-white/[0.1] bg-white/[0.04]',
    amber: 'border-amber-400/30 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),transparent)]',
    fuchsia:
      'border-fuchsia-500/35 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),transparent)]',
  }
  return (
    <div
      className={`rounded-[var(--r-panel)] border p-6 md:p-8 ${tints[tint] ?? tints.slate} ${className}`}
    >
      {eyebrow ? (
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{eyebrow}</p>
      ) : null}
      {title ? <h3 className="font-display text-xl font-bold text-white md:text-2xl">{title}</h3> : null}
      <div className={title ? 'mt-5' : ''}>{children}</div>
    </div>
  )
}

export function SectionHeader({ kicker, title, caption, badges, className = '' }) {
  return (
    <header className={`max-w-[min(78ch,calc(100vw-4rem))] space-y-3 ${className}`}>
      {badges ? <div className="flex flex-wrap items-center gap-2">{badges}</div> : null}
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-zinc-500">{kicker}</p>
      <h2 className="break-words font-display text-[clamp(1.65rem,3.9vw,3.05rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
        {title}
      </h2>
      {caption ? (
        <p className="max-w-[60ch] break-words font-body text-lg italic leading-snug text-zinc-400 md:text-[1.2rem]">{caption}</p>
      ) : null}
    </header>
  )
}

export function DecoGridBg({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.22] ${className}`}
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(110,240,255,0.06), transparent 55%)
        `,
        backgroundSize: '48px 48px, 48px 48px, auto',
      }}
    />
  )
}
