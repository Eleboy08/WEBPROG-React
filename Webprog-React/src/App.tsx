import Guestbook from './components/Guestbook';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background Glow Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      {/* Top Navigation */}
      <nav className="p-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-mono font-bold tracking-tighter text-white">
            HEINRICH<span className="text-blue-500">.</span>TOBIAS
          </h1>
          <div className="space-x-8 text-sm font-medium text-slate-400">
            <a href="#guestbook" className="hover:text-white transition">Guestbook</a>
          </div>
        </div>
      </nav>

      {/* Main Profile Header */}
      <main className="container mx-auto px-6 py-20">
        <header className="max-w-3xl mb-24">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Building secure, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">scalable web solutions.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            BSCS-SF Student at Asia Pacific College. Focused on full-stack web development, 
            IoT systems, and cybersecurity.
          </p>
          <div className="flex flex-wrap gap-3">
             <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">Web Development</span>
             <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">Cybersecurity</span>
             <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">Embedded Systems</span>
          </div>
        </header>

        {/* Guestbook Component Integration */}
        <section id="guestbook" className="scroll-mt-32">
          <Guestbook />
        </section>
      </main>
    </div>
  );
}