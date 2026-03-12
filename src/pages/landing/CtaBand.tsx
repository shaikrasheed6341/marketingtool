import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Award } from 'lucide-react';
import { AnimateIn } from './AnimateIn';

export function CtaBand() {
    return (
        <section className="py-28 bg-black relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(255,255,255,.05) 0%, transparent 60%)`,
                }}
            />
            <AnimateIn>
                <div className="relative max-w-3xl mx-auto px-4 text-center">
                    <Award className="w-12 h-12 text-white/20 mx-auto mb-6" />
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
                        Ready to transform your ad performance?
                    </h2>
                    <p className="text-lg text-gray-400 mb-10">
                        Join 3,000+ teams already scaling profitably with AdPlatform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/dashboard"
                            className="group flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl active:scale-95"
                        >
                            Start Free — 14 Days{' '}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="mailto:sales@adplatform.io"
                            className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors border border-white/20 px-8 py-3.5 rounded-2xl font-medium hover:bg-white/10"
                        >
                            <Mail className="w-4 h-4" /> Talk to Sales
                        </a>
                    </div>
                </div>
            </AnimateIn>
        </section>
    );
}
