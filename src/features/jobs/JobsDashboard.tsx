import React, { useState, useEffect } from 'react';
import { fetchJobs, initiateJob } from '../../services/api';
import type { Job } from '../../types';
import {
    Loader2, CheckCircle2, XCircle, Clock, Plus,
    RefreshCw, Briefcase, BarChart2, Zap, AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

/* ────── STATUS CONFIG ────── */
const STATUS_CONFIG = {
    Completed: {
        bar: 'bg-emerald-500',
        pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        accent: 'border-l-emerald-500',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        glow: 'shadow-emerald-100',
    },
    Failed: {
        bar: 'bg-red-500',
        pill: 'bg-red-50 text-red-700 border-red-200',
        accent: 'border-l-red-500',
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        glow: 'shadow-red-100',
    },
    Processing: {
        bar: 'bg-blue-500',
        pill: 'bg-blue-50 text-blue-700 border-blue-200',
        accent: 'border-l-blue-500',
        icon: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
        glow: 'shadow-blue-100',
    },
    Pending: {
        bar: 'bg-slate-300',
        pill: 'bg-slate-50 text-slate-600 border-slate-200',
        accent: 'border-l-slate-300',
        icon: <Clock className="w-5 h-5 text-slate-400" />,
        glow: '',
    },
};

/* ────── SUMMARY BAR ────── */
function SummaryBar({ jobs }: { jobs: Job[] }) {
    const counts = {
        Completed: jobs.filter((j) => j.status === 'Completed').length,
        Processing: jobs.filter((j) => j.status === 'Processing').length,
        Pending: jobs.filter((j) => j.status === 'Pending').length,
        Failed: jobs.filter((j) => j.status === 'Failed').length,
    };

    const metrics = [
        { label: 'Total Jobs', value: jobs.length, icon: <Briefcase className="w-4 h-4" />, color: 'text-slate-700' },
        { label: 'Completed', value: counts.Completed, icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-600' },
        { label: 'Running', value: counts.Processing, icon: <BarChart2 className="w-4 h-4" />, color: 'text-blue-600' },
        { label: 'Pending', value: counts.Pending, icon: <Zap className="w-4 h-4" />, color: 'text-amber-600' },
        { label: 'Failed', value: counts.Failed, icon: <AlertCircle className="w-4 h-4" />, color: 'text-red-600' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {metrics.map((m) => (
                <div key={m.label} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
                    <div className={cn('flex-shrink-0', m.color)}>{m.icon}</div>
                    <div>
                        <div className={cn('text-xl font-bold', m.color)}>{m.value}</div>
                        <div className="text-xs text-slate-500 font-medium">{m.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ────── JOB CARD ────── */
function JobCard({ job }: { job: Job }) {
    const cfg = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.Pending;

    return (
        <div
            className={cn(
                'bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border-l-4',
                cfg.accent,
                job.status === 'Completed' || job.status === 'Failed' ? '' : 'ring-1 ring-inset ring-blue-50'
            )}
        >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug truncate" title={job.name}>
                        {job.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1 truncate">#{job.id.split('-')[0].toUpperCase()}</p>
                </div>
                <div className="flex-shrink-0 mt-0.5">{cfg.icon}</div>
            </div>

            {/* Progress */}
            <div className="px-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border', cfg.pill)}>
                        {job.status}
                    </span>
                    <span className="text-xs font-bold tabular-nums text-slate-700">{job.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={cn('h-full rounded-full transition-all duration-700', cfg.bar)}
                        style={{ width: `${Math.min(Math.max(job.progress, 0), 100)}%` }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50 mt-auto flex justify-between items-center">
                <span className="text-xs text-slate-400">
                    {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-xs text-slate-400">
                    {new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}

/* ────── PAGE ────── */
export const JobsDashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const loadJobs = async () => {
        setIsRefreshing(true);
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        loadJobs();
        const interval = setInterval(loadJobs, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSimulate = async () => {
        const names = [
            'Audience Sync — Q2 Segment',
            'Conversion Import — Offline Events',
            'Budget Rebalance — APAC Campaigns',
            'Creative Asset Processing',
            'Attribution Recalculation',
        ];
        const name = names[Math.floor(Math.random() * names.length)];
        await initiateJob(name);
        loadJobs();
    };

    const FILTER_OPTIONS = ['All', 'Processing', 'Pending', 'Completed', 'Failed'];
    const filtered = statusFilter === 'All' ? jobs : jobs.filter((j) => j.status === statusFilter);

    return (
        <div className="space-y-8 pb-16 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Background Jobs</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Real-time view of system tasks and asynchronous operations.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadJobs}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
                        Refresh
                    </button>
                    <button
                        onClick={handleSimulate}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-700 transition-colors shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Simulate Job
                    </button>
                </div>
            </div>

            {/* Summary Metrics */}
            {!loading && <SummaryBar jobs={jobs} />}

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
                {FILTER_OPTIONS.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setStatusFilter(opt)}
                        className={cn(
                            'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                            statusFilter === opt
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        )}
                    >
                        {opt}
                        {opt !== 'All' && (
                            <span className="ml-1.5 opacity-60">
                                {jobs.filter((j) => j.status === opt).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Loading skeleton */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-44 rounded-2xl bg-slate-100 animate-pulse border-l-4 border-l-slate-200" />
                    ))}
                </div>
            )}

            {/* Job Cards Grid */}
            {!loading && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filtered.length === 0 && (
                <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-2xl">
                    <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-base font-semibold text-slate-800">No jobs found</h3>
                    <p className="text-sm text-slate-400 mt-1">
                        {statusFilter !== 'All' ? `No ${statusFilter.toLowerCase()} jobs at the moment.` : 'No background jobs have been run yet.'}
                    </p>
                </div>
            )}
        </div>
    );
};
