export default function HeroBanner() {
  return (
    <div className="relative w-full z-10">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Backend Developer <span className="text-emerald-500">Extraordinaire</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Building robust, scalable, and efficient backend systems that power modern applications. Specializing in
            Express.js, MongoDB, PostgreSQL, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-md transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
