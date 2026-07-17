"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { TerminalSquare, Trash2, Circle } from "lucide-react"
import { useSystem } from "../system-context"
import { processTerminalCommand, terminalCommandList } from "@/lib/terminal-commands"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
})

const QUICK_COMMANDS = ["help", "about", "skills", "projects", "contact"] as const

export default function Terminal() {
  const { terminalHistory, addTerminalEntry, clearTerminal } = useSystem()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  const runCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      if (!trimmed) return
      addTerminalEntry({ input: trimmed })
      processTerminalCommand(trimmed, { addTerminalEntry, clearTerminal })
      setHistory((prev) => [...prev.filter((c) => c !== trimmed), trimmed].slice(-50))
      setHistoryIndex(-1)
    },
    [addTerminalEntry, clearTerminal],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runCommand(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      clearTerminal()
    }
  }

  return (
    <section id="terminal" className="w-full pb-8">
      <div className="mx-auto max-w-6xl space-y-6 px-1 md:px-2">
        <motion.header {...fade()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-lime">CLI</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-brand-white md:text-3xl">Terminal</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-river-mist">
              Interactive shell profile. Type <span className="font-mono text-brand-lime">help</span> or use quick
              commands below.
            </p>
          </div>
          <div className="lab-glass flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs text-brand-river-mist sm:self-auto">
            <Circle className="h-2 w-2 fill-brand-lime text-brand-lime" />
            session active
          </div>
        </motion.header>

        <div className="grid gap-4 lg:grid-cols-4 lg:gap-5">
          <motion.div {...fade(0.06)} className="lab-glass overflow-hidden lg:col-span-3">
            <div className="flex items-center justify-between border-b border-brand-river-mist/10 bg-brand-midnight/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-lime/90" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-brand-river-mist">
                  <TerminalSquare className="h-3.5 w-3.5 text-brand-lime" />
                  moyen@control-lab ~ bash
                </div>
              </div>
              <button
                type="button"
                onClick={() => clearTerminal()}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-brand-river-mist transition-colors hover:bg-brand-forest/60 hover:text-brand-frost"
                title="Clear (or Ctrl+L)"
              >
                <Trash2 className="h-3.5 w-3.5" />
                clear
              </button>
            </div>

            <div
              ref={terminalRef}
              className="terminal-viewport max-h-[min(28rem,55vh)] min-h-[320px] overflow-y-auto bg-brand-midnight/80 p-4 font-mono text-sm leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {terminalHistory.map((entry, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  {entry.input && (
                    <div className="flex flex-wrap gap-x-2">
                      <span className="select-none text-brand-lime">❯</span>
                      <span className="text-brand-white">{entry.input}</span>
                    </div>
                  )}
                  {entry.output && (
                    <div
                      className={`mt-1 pl-4 ${
                        entry.isError
                          ? "text-red-400"
                          : entry.isSystem
                            ? "text-brand-river-mist/90"
                            : "text-brand-river-mist"
                      }`}
                    >
                      {entry.output}
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
                <span className="select-none text-brand-lime">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-w-0 flex-1 bg-transparent text-brand-white outline-none placeholder:text-brand-river-mist/40"
                  placeholder="enter command…"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
              </form>
            </div>
          </motion.div>

          <motion.aside {...fade(0.1)} className="space-y-4">
            <div className="lab-glass p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-river-mist">Quick run</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => runCommand(cmd)}
                    className="rounded-full border border-brand-river-mist/15 bg-brand-forest/40 px-3 py-1 font-mono text-xs text-brand-frost transition-colors hover:border-brand-lime/35 hover:text-brand-lime"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            <div className="lab-glass p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-river-mist">Shortcuts</p>
              <ul className="mt-3 space-y-2 text-xs text-brand-river-mist">
                <li>
                  <kbd className="rounded bg-brand-midnight px-1.5 py-0.5 font-mono text-brand-frost">↑</kbd>{" "}
                  <kbd className="rounded bg-brand-midnight px-1.5 py-0.5 font-mono text-brand-frost">↓</kbd> command
                  history
                </li>
                <li>
                  <kbd className="rounded bg-brand-midnight px-1.5 py-0.5 font-mono text-brand-frost">Ctrl</kbd>+
                  <kbd className="rounded bg-brand-midnight px-1.5 py-0.5 font-mono text-brand-frost">L</kbd> clear
                </li>
              </ul>
            </div>

            <div className="lab-glass p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-river-mist">Registry</p>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-brand-river-mist/80">
                {terminalCommandList.join(" · ")}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
