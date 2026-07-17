"use client"

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-brand-midnight" />
      <div
        className="absolute -top-[40%] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--brand-deep-forest)) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50vh] w-[50vw] opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle at 80% 80%, hsl(var(--brand-lime) / 0.12), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.35]" />
    </div>
  )
}
