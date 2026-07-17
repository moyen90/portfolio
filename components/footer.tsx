export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-2 bg-brand-midnight border-t border-brand-deep-forest">
      <div className="container mx-auto px-4 py-2">

        <div className="text-brand-river-mist text-sm text-center">&copy; {currentYear} Moyenul Islam. All rights reserved.</div>


      </div>
    </footer>
  )
}
