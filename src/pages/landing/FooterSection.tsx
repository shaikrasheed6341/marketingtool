import { Rocket, Twitter, Linkedin, Github, TrendingUp, Clock } from 'lucide-react';

const FOOTER_COLUMNS = [
    { heading: 'Product', links: ['Features', 'Integrations', 'Changelog', 'Roadmap'] },
    { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { heading: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
];

const SOCIALS = [
    { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
    { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' },
    { icon: <Github className="w-4 h-4" />, href: 'https://github.com' },
];

export function FooterSection() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">AdPlatform</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            The intelligent campaign management platform for teams serious about performance marketing.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {SOCIALS.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {FOOTER_COLUMNS.map((col, i) => (
                        <div key={i} className="space-y-4">
                            <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
                            <ul className="space-y-3">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} AdPlatform, Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>All systems operational</span>
                        <Clock className="w-4 h-4 ml-3" />
                        <span>99.98% uptime last 90 days</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
