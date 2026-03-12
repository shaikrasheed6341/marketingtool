import React from 'react';
import { cn } from '../lib/utils';
import type { CampaignStatus } from '../types';

interface BadgeProps {
    status: CampaignStatus;
    className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className }) => {
    const styles: Record<CampaignStatus, string> = {
        Active: 'bg-green-100 text-green-800 border-green-200',
        Paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Draft: 'bg-slate-100 text-slate-800 border-slate-200',
        Completed: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    return (
        <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border', styles[status], className)}>
            {status}
        </span>
    );
};
