import React, { useState, useEffect } from 'react';
import { fetchJobs } from '../../services/api';
import type { Job } from '../../types';
import { Loader2, CheckCircle2, XCircle, Clock, ChevronDown, List } from 'lucide-react';
import { cn } from '../../lib/utils';

export const JobSimulationWidget: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let mounted = true;

        const pollJobs = async () => {
            try {
                const data = await fetchJobs();
                if (mounted) {
                    setJobs(data);
                }
            } catch (e) {
                // Ignore polling errors
            }
        };

        pollJobs();
        const interval = setInterval(pollJobs, 2000); // Poll every 2 seconds

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    const activeJobs = jobs.filter(j => j.status === 'Pending' || j.status === 'Processing');
    const recentJobs = jobs.slice(0, 5); // Show last 5 jobs

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
                {activeJobs.length > 0 ? (
                    <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                ) : (
                    <List className="w-4 h-4 text-slate-500" />
                )}
                <span className="text-sm font-medium text-slate-700">
                    {activeJobs.length > 0 ? `${activeJobs.length} Active Jobs` : 'Jobs'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in">
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 text-sm">Recent Background Jobs</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {recentJobs.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-slate-500">
                                    No recent jobs
                                </div>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {recentJobs.map(job => (
                                        <li key={job.id} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="font-medium text-sm text-slate-700">{job.name}</span>
                                                {job.status === 'Completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                {job.status === 'Failed' && <XCircle className="w-4 h-4 text-red-500" />}
                                                {job.status === 'Pending' && <Clock className="w-4 h-4 text-slate-400" />}
                                                {job.status === 'Processing' && <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />}
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-500",
                                                            job.status === 'Completed' ? "bg-green-500" :
                                                                job.status === 'Failed' ? "bg-red-500" :
                                                                    "bg-primary-500"
                                                        )}
                                                        style={{ width: `${job.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-slate-500 w-8 tabular-nums text-right">
                                                    {job.progress}%
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-400">
                                                {job.status}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
