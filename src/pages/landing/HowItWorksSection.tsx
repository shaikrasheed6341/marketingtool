import { AnimateIn } from './AnimateIn';
import { HOW_IT_WORKS } from '../../services/data';

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-sm font-semibold text-black uppercase tracking-widest mb-3">
                            How It Works
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                            Up and running in minutes
                        </h2>
                        <p className="text-lg text-gray-500">
                            No complex setup. No lengthy onboarding. Just connect, configure, and launch.
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connector line on desktop */}
                    <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                    {HOW_IT_WORKS.map((step, i) => (
                        <AnimateIn key={i} delay={i * 100}>
                            <div className="relative flex flex-col items-center text-center p-6">
                                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-bold mb-5 shadow-lg z-10 relative">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
