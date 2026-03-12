import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for conditional tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Simulated latency helper
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random failure utility
export const withSimulatedFailure = <T>(promise: Promise<T>, failureRate: number = 0.05): Promise<T> => {
    return promise.then((res) => {
        if (Math.random() < failureRate) {
            throw new Error("Simulated network failure. Please try again.");
        }
        return res;
    });
};
