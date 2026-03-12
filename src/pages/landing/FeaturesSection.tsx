import { AnimateIn } from './AnimateIn';
import { FEATURES } from '../../services/data';

export function FeaturesSection() {
    return (
        <section id="features" className="py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-sm font-semibold text-black uppercase tracking-widest mb-3">
                            Platform Features
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                            Everything you need to win
                        </h2>
                        <p className="text-lg text-gray-500">
                            From first impression to final conversion, AdPlatform covers every stage of the campaign lifecycle.
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((f, i) => (
                        <AnimateIn key={i} delay={i * 80}>
                            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 bg-white cursor-default">
                                <div className={`inline-flex p-3 rounded-xl ${f.bg} ${f.color} mb-5`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
