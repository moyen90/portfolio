import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-river-mist/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-brand-river-mist md:flex-row md:px-6">
        <p>© {new Date().getFullYear()} Moyenul Islam</p>
        <div className="flex gap-6">
          <Link href="/lab" className="transition-colors hover:text-brand-lime">
            Control Lab
          </Link>
          <a href="mailto:dev.moyenislam@gmail.com" className="transition-colors hover:text-brand-lime">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
