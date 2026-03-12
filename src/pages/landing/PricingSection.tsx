import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { AnimateIn } from './AnimateIn';
import { PLANS } from '../../services/data';

export function PricingSection() {
    return (
        <section id="pricing" className="py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-sm font-semibold text-black uppercase tracking-widest mb-3">
                            Pricing
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-lg text-gray-500">
                            Start free for 14 days. No credit card required.
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {PLANS.map((plan, i) => (
                        <AnimateIn key={i} delay={i * 100}>
                            <div
                                className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${plan.highlighted
                                    ? 'bg-black text-white shadow-2xl scale-105 ring-2 ring-black'
                                    : 'bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1'
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <h3
                                        className={`text-lg font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-black'
                                            }`}
                                    >
                                        {plan.name}
                                    </h3>
                                    <p
                                        className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'
                                            }`}
                                    >
                                        {plan.description}
                                    </p>
                                    <div className="flex items-end gap-1 mb-8">
                                        <span
                                            className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-black'
                                                }`}
                                        >
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span
                                                className={`text-base mb-1 ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'
                                                    }`}
                                            >
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm">
                                                <CheckCircle
                                                    className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-gray-300' : 'text-black'
                                                        }`}
                                                />
                                                <span
                                                    className={
                                                        plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                                                    }
                                                >
                                                    {f}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    to="/dashboard"
                                    className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${plan.highlighted
                                        ? 'bg-white text-black hover:bg-gray-100 shadow-lg'
                                        : 'bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
