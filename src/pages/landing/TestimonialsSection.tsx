import { Star } from 'lucide-react';
import { AnimateIn } from './AnimateIn';
import { TESTIMONIALS } from '../../services/data';

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-sm font-semibold text-black uppercase tracking-widest mb-3">
                            Customer Stories
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                            Loved by performance teams
                        </h2>
                        <p className="text-lg text-gray-500">
                            Don't take our word for it. Here's what marketers built on AdPlatform say.
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <AnimateIn key={i} delay={i * 70}>
                            <div className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-7 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                <StarRating count={t.rating} />
                                <p className="mt-4 text-gray-700 text-sm leading-relaxed flex-1">"{t.text}"</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                                    >
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-black">{t.name}</div>
                                        <div className="text-xs text-gray-500">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
