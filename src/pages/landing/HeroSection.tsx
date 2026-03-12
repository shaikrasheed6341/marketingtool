import { Link } from 'react-router-dom';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-black">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
            {/* Soft glow accents */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/75 text-sm font-medium mb-8 backdrop-blur-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Trusted by 3,000+ performance marketing teams
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
                    The Operating System<br />
                    <span className="text-gray-400">for Modern Advertising</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Unify every channel. Automate every optimisation. Scale your ROAS without scaling your team.
                    AdPlatform is the campaign intelligence layer your business has been missing.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/dashboard"
                        className="group flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-2xl font-semibold text-base hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                    >
                        Start for Free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="flex items-center gap-2.5 text-white/75 hover:text-white transition-colors text-base font-medium px-4 py-3.5">
                        <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                            <Play className="w-4 h-4 ml-0.5 fill-white text-white" />
                        </span>
                        Watch 2-min demo
                    </button>
                </div>

                {/* Scroll indicator */}
                <div className="mt-20 flex flex-col items-center gap-2 text-white/30 text-sm animate-bounce">
                    <span>Scroll to explore</span>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
        </section>
    );
}
