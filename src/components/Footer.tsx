import React from 'react';
import { cn } from '../lib/utils';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className={cn('bg-slate-900 text-slate-300 py-8', 'border-t border-slate-800')}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">© {new Date().getFullYear()} AdPlatform. All rights reserved.</div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://github.com/shaikrasheed6341" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
