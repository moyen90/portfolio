import type { ReactNode } from "react"
import { projects } from "@/lib/projects"
import { contactInfo } from "@/lib/contact"

export type TerminalContext = {
  addTerminalEntry: (entry: {
    input?: string
    output?: string | ReactNode
    isError?: boolean
    isSystem?: boolean
  }) => void
  clearTerminal: () => void
}

const COMMANDS = [
  "help",
  "clear",
  "about",
  "skills",
  "projects",
  "contact",
  "github",
  "linkedin",
] as const

export const terminalCommandList = [...COMMANDS]

export function processTerminalCommand(raw: string, ctx: TerminalContext) {
  const command = raw.trim().toLowerCase()
  const { addTerminalEntry, clearTerminal } = ctx

  if (command === "help") {
    addTerminalEntry({
      output: (
        <div className="space-y-3">
          <p className="font-medium text-brand-frost">Available commands</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["help", "Show this list"],
              ["clear", "Clear the screen"],
              ["about", "Developer summary"],
              ["skills", "Tech stack overview"],
              ["projects", "Featured products"],
              ["contact", "Email & socials"],
              ["github", "Open GitHub"],
              ["linkedin", "Open LinkedIn"],
            ].map(([cmd, desc]) => (
              <div
                key={cmd}
                className="rounded-lg border border-brand-river-mist/10 bg-brand-midnight/40 px-3 py-2"
              >
                <span className="text-brand-lime">{cmd}</span>
                <span className="text-brand-river-mist"> — {desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    })
    return
  }

  if (command === "clear") {
    clearTerminal()
    return
  }

  if (command === "about") {
    addTerminalEntry({
      output: (
        <div className="space-y-2 rounded-lg border border-brand-river-mist/10 bg-brand-midnight/30 p-3">
          <p className="text-base font-semibold text-brand-white">Moyenul Islam</p>
          <p className="text-brand-lime text-sm">Backend Developer · 4+ years</p>
          <p className="text-sm text-brand-river-mist leading-relaxed">
            Builds scalable APIs, real-time services, and AI-enabled backends on Node.js, Express, MongoDB, and GCP.
          </p>
        </div>
      ),
    })
    return
  }

  if (command === "skills") {
    addTerminalEntry({
      output: (
        <div className="space-y-2 text-sm">
          <p className="font-medium text-brand-frost">Stack</p>
          {[
            ["Languages", "JavaScript, Python, SQL"],
            ["Frameworks", "Express.js, FastAPI, Flask"],
            ["Data", "MongoDB, PostgreSQL, Firebase"],
            ["Cloud", "GCP, Docker, CI/CD, Terraform"],
            ["APIs", "REST, WebSockets, microservices"],
            ["AI", "Generative AI integration, agentic workflows"],
          ].map(([k, v]) => (
            <p key={k}>
              <span className="text-brand-lime">{k}:</span>{" "}
              <span className="text-brand-river-mist">{v}</span>
            </p>
          ))}
        </div>
      ),
    })
    return
  }

  if (command === "projects") {
    addTerminalEntry({
      output: (
        <div className="space-y-3">
          <p className="text-sm font-medium text-brand-frost">Featured deployments</p>
          {projects.map((p) => (
            <div key={p.id} className="rounded-lg border border-brand-lime/20 border-l-2 border-l-brand-lime pl-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-brand-white">{p.name}</span>
                {p.status === "active" && (
                  <span className="rounded bg-brand-lime/15 px-1.5 py-0.5 text-[10px] uppercase text-brand-lime">
                    live
                  </span>
                )}
              </div>
              {p.highlight && <p className="mt-0.5 text-xs text-brand-lime/90">{p.highlight}</p>}
              <p className="mt-1 text-xs text-brand-river-mist leading-relaxed">{p.description}</p>
              {p.liveUrl && (
                <p className="mt-1 font-mono text-[10px] text-brand-river-mist/80">https://{p.liveUrl}</p>
              )}
            </div>
          ))}
        </div>
      ),
    })
    return
  }

  if (command === "contact") {
    addTerminalEntry({
      output: (
        <div className="space-y-1.5 text-sm">
          <p className="font-medium text-brand-frost">Contact</p>
          <p>
            <span className="text-brand-lime">Email</span> {contactInfo.email}
          </p>
          <p>
            <span className="text-brand-lime">Phone</span> {contactInfo.phone}
          </p>
          <p>
            <span className="text-brand-lime">Location</span> {contactInfo.location}
          </p>
          <p>
            <span className="text-brand-lime">GitHub</span> github.com/moyen90
          </p>
          <p>
            <span className="text-brand-lime">LinkedIn</span> linkedin.com/in/moyenul-islam-675204211
          </p>
        </div>
      ),
    })
    return
  }

  if (command === "github") {
    addTerminalEntry({ output: <span className="text-brand-river-mist">Opening GitHub…</span> })
    window.open("https://github.com/moyen90", "_blank")
    return
  }

  if (command === "linkedin") {
    addTerminalEntry({ output: <span className="text-brand-river-mist">Opening LinkedIn…</span> })
    window.open("https://www.linkedin.com/in/moyenul-islam-675204211/", "_blank")
    return
  }

  addTerminalEntry({
    output: (
      <span>
        Command not found: <span className="text-brand-frost">{command}</span>. Type{" "}
        <span className="text-brand-lime">help</span> for available commands.
      </span>
    ),
    isError: true,
  })
}
