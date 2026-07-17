"use client"

import { useEffect, useMemo, useState } from "react"
import {
  motion,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion"
import { Briefcase, Calendar, Layers, Sparkles } from "lucide-react"
import { categoryAverage, labSkillCategories, type LabSkillItem } from "@/lib/skills-lab"

type SelectedSkill = LabSkillItem & { category: string }

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(labSkillCategories[0].category)
  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill | null>(null)

  const activeItems = useMemo(
    () => labSkillCategories.find((c) => c.category === activeCategory)?.items ?? [],
    [activeCategory],
  )

  useEffect(() => {
    setSelectedSkill(null)
  }, [activeCategory])

  const totalSkills = labSkillCategories.reduce((n, c) => n + c.items.length, 0)
  const overallAvg = useMemo(() => {
    const all = labSkillCategories.flatMap((c) => c.items)
    return Math.round(all.reduce((s, i) => s + i.level, 0) / all.length)
  }, [])

  return (
    <section id="skills" className="w-full pb-8">
      <div className="mx-auto max-w-6xl space-y-8 px-1 md:px-2">
        <motion.header {...fade()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-lime">Capabilities</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-brand-white md:text-3xl">Skills matrix</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-river-mist">
              Proficiency, experience, and project exposure across backend technologies.
            </p>
          </div>
          <div className="flex gap-3">
            <StatPill label="Skills tracked" value={String(totalSkills)} />
            <StatPill label="Overall avg" value={`${overallAvg}%`} highlight />
          </div>
        </motion.header>

        <motion.div {...fade(0.06)} className="lab-glass p-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {labSkillCategories.map((cat) => {
              const active = activeCategory === cat.category
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => setActiveCategory(cat.category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-lime text-brand-forest"
                      : "text-brand-river-mist hover:bg-brand-forest/60 hover:text-brand-frost"
                  }`}
                >
                  {cat.category}
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lab-glass lg:col-span-3 p-5 md:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-white">{activeCategory}</h2>
              <span className="text-xs text-brand-river-mist">{activeItems.length} skills</span>
            </div>
            <ul className="space-y-5">
              {activeItems.map((skill, index) => (
                <SkillRow
                  key={skill.name}
                  skill={skill}
                  index={index}
                  selected={selectedSkill?.name === skill.name}
                  onSelect={() => setSelectedSkill({ ...skill, category: activeCategory })}
                />
              ))}
            </ul>
          </motion.div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3 }}
                  className="lab-glass h-full p-5 md:p-6"
                >
                  <SkillDetail skill={selectedSkill} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lab-glass flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center"
                >
                  <div className="mb-4 rounded-2xl bg-brand-lime/10 p-4">
                    <Sparkles className="h-8 w-8 text-brand-lime" />
                  </div>
                  <p className="text-sm font-medium text-brand-frost">Select a skill</p>
                  <p className="mt-2 max-w-[220px] text-xs text-brand-river-mist">
                    Click any skill in the list to view proficiency, experience, and project count.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div {...fade(0.12)}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-river-mist">
            Category overview
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {labSkillCategories.map((category, index) => (
              <CategorySummaryCard
                key={category.category}
                category={category.category}
                average={categoryAverage(category)}
                skillCount={category.items.length}
                active={activeCategory === category.category}
                onSelect={() => setActiveCategory(category.category)}
                delay={index * 0.04}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatPill({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="lab-glass rounded-xl px-4 py-3 text-center">
      <p className="text-[10px] uppercase tracking-wider text-brand-river-mist">{label}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${highlight ? "text-brand-lime" : "text-brand-white"}`}>
        {value}
      </p>
    </div>
  )
}

function SkillRow({
  skill,
  index,
  selected,
  onSelect,
}: {
  skill: LabSkillItem
  index: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-xl border p-4 text-left transition-colors ${
          selected
            ? "border-brand-lime/40 bg-brand-forest/50"
            : "border-brand-river-mist/10 bg-brand-midnight/20 hover:border-brand-lime/25 hover:bg-brand-forest/30"
        }`}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-medium text-brand-frost">{skill.name}</span>
          <SkillLevelBadge level={skill.level} />
        </div>
        <SkillProgressBar level={skill.level} animateKey={`${skill.name}-${index}`} />
        <div className="mt-2 flex gap-4 text-[11px] text-brand-river-mist">
          <span>{skill.years} yrs</span>
          <span>{skill.projects} projects</span>
        </div>
      </button>
    </li>
  )
}

function SkillLevelBadge({ level }: { level: number }) {
  return (
    <span className="rounded-full bg-brand-lime/10 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-brand-lime">
      {level}%
    </span>
  )
}

function SkillProgressBar({ level, animateKey }: { level: number; animateKey: string }) {
  const spring = useSpring(0, { stiffness: 55, damping: 22, mass: 0.6 })
  const width = useTransform(spring, (v) => `${Math.max(0, Math.min(100, v))}%`)

  useEffect(() => {
    spring.set(0)
    const t = requestAnimationFrame(() => spring.set(level))
    return () => cancelAnimationFrame(t)
  }, [level, animateKey, spring])

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-brand-forest/80">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-brand-lime/70 to-brand-lime"
        style={{ width }}
      />
    </div>
  )
}

function SkillDetail({ skill }: { skill: SelectedSkill }) {
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-wider text-brand-lime">{skill.category}</p>
      <h2 className="mt-2 text-xl font-semibold text-brand-white">{skill.name}</h2>

      <div className="mt-6 flex items-center gap-4">
        <div
          className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-brand-lime/30 bg-brand-forest/60"
          style={{
            background: `conic-gradient(hsl(var(--brand-lime)) ${skill.level * 3.6}deg, hsl(var(--brand-forest)) 0deg)`,
          }}
        >
          <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-xl bg-brand-deep-forest/95">
            <span className="text-lg font-bold tabular-nums text-brand-lime">{skill.level}%</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-brand-river-mist">
          Production-ready proficiency with hands-on delivery across multiple shipped products.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <DetailStat icon={Calendar} label="Experience" value={`${skill.years} years`} />
        <DetailStat icon={Briefcase} label="Projects" value={skill.projects} />
        <DetailStat icon={Layers} label="Category" value={skill.category.split(" ")[0]} className="col-span-2" />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs text-brand-river-mist">Proficiency scale</p>
        <SkillProgressBar level={skill.level} animateKey={`detail-${skill.name}`} />
        <div className="mt-1 flex justify-between text-[10px] text-brand-river-mist/80">
          <span>Learning</span>
          <span>Expert</span>
        </div>
      </div>
    </>
  )
}

function DetailStat({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: typeof Calendar
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={`rounded-xl border border-brand-river-mist/10 bg-brand-midnight/25 p-3 ${className}`}>
      <Icon className="mb-2 h-4 w-4 text-brand-lime" />
      <p className="text-[10px] uppercase tracking-wider text-brand-river-mist">{label}</p>
      <p className="mt-1 text-sm font-medium text-brand-frost">{value}</p>
    </div>
  )
}

function CategorySummaryCard({
  category,
  average,
  skillCount,
  active,
  onSelect,
  delay,
}: {
  category: string
  average: number
  skillCount: number
  active: boolean
  onSelect: () => void
  delay: number
}) {
  const spring = useSpring(0, { stiffness: 50, damping: 24 })
  const barHeight = useTransform(spring, (v) => `${v}%`)

  useEffect(() => {
    spring.set(average)
  }, [average, spring])

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`lab-glass flex flex-col p-4 text-left transition-colors ${
        active ? "ring-1 ring-brand-lime/40" : "hover:border-brand-lime/20"
      }`}
    >
      <p className="line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-snug text-brand-frost">{category}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-brand-white">{average}%</p>
      <p className="text-[10px] text-brand-river-mist">{skillCount} skills · avg</p>
      <div className="relative mt-4 h-16 overflow-hidden rounded-lg bg-brand-forest/60">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t bg-gradient-to-t from-brand-lime/80 to-brand-lime/30"
          style={{ height: barHeight }}
        />
      </div>
    </motion.button>
  )
}
