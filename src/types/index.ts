export type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Completed';

export interface Campaign {
    id: string;
    name: string;
    status: CampaignStatus;
    budget: number;
    spent: number;
    startDate: string;
    endDate: string;
    conversions: number;
    roas: number; // Return on Ad Spend
}

export type JobStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed';

export interface Job {
    id: string;
    name: string;
    status: JobStatus;
    progress: number;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
