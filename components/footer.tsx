export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-2 bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-2">

        <div className="text-gray-400 text-sm text-center">&copy; {currentYear} Moyenul Islam. All rights reserved.</div>


      </div>
    </footer>
  )
}
