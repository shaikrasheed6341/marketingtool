import React from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
            secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-sm',
            danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
            ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200'
        };

        const sizes = {
            sm: 'text-xs px-2.5 py-1.5 rounded',
            md: 'text-sm px-4 py-2 rounded-md',
            lg: 'text-base px-6 py-3 rounded-lg'
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
