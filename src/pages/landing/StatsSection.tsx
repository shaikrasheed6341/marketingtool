import { AnimateIn } from './AnimateIn';
import { STATS } from '../../services/data';

export function StatsSection() {
    return (
        <section className="bg-black py-14 border-y border-white/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((s, i) => (
                        <AnimateIn key={i} delay={i * 80}>
                            <div className="space-y-1">
                                <div className="text-4xl font-bold text-white">{s.value}</div>
                                <div className="text-sm text-gray-400 font-medium">{s.label}</div>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
