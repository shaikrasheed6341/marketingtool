import type { Campaign, CampaignStatus, PaginatedResponse, Job } from '../types';
import { delay, withSimulatedFailure } from '../lib/utils';
import { v4 as uuidv4 } from 'uuid';

// Seed data
let mockCampaigns: Campaign[] = Array.from({ length: 50 }).map((_, i) => ({
    id: uuidv4(),
    name: `Campaign Multi-Channel ${i + 1}`,
    status: ['Active', 'Paused', 'Draft', 'Completed'][Math.floor(Math.random() * 4)] as CampaignStatus,
    budget: Math.floor(Math.random() * 50000) + 1000,
    spent: Math.floor(Math.random() * 20000),
    startDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    endDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
    conversions: Math.floor(Math.random() * 1000),
    roas: Number((Math.random() * 5).toFixed(2)),
}));

export const fetchCampaigns = async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortField: keyof Campaign = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
    statusFilters: CampaignStatus[] = []
): Promise<PaginatedResponse<Campaign>> => {
    await delay(300 + Math.random() * 500); // simulate network latency

    let filtered = mockCampaigns;
    if (search) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (statusFilters.length > 0) {
        filtered = filtered.filter(c => statusFilters.includes(c.status));
    }

    filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return withSimulatedFailure(Promise.resolve({
        data: paginated,
        total: filtered.length,
        page,
        limit,
    }), 0.02); // 2% failure rate
};

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
    await delay(500);
    const campaign = mockCampaigns.find(c => c.id === id);
    if (!campaign) throw new Error("Campaign not found");
    return withSimulatedFailure(Promise.resolve({ ...campaign }));
};

export const updateCampaign = async (id: string, updates: Partial<Campaign>): Promise<Campaign> => {
    await delay(800);
    const idx = mockCampaigns.findIndex(c => c.id === id);
    if (idx === -1) throw new Error("Campaign not found");

    const updated = { ...mockCampaigns[idx], ...updates };
    mockCampaigns[idx] = updated;
    return withSimulatedFailure(Promise.resolve(updated));
};

export const updateCampaignStatus = async (id: string, status: CampaignStatus): Promise<Campaign> => {
    return updateCampaign(id, { status });
};

export const deleteCampaigns = async (ids: string[]): Promise<void> => {
    await delay(1000); // Deleting multiple might take longer
    mockCampaigns = mockCampaigns.filter(c => !ids.includes(c.id));
    return withSimulatedFailure(Promise.resolve());
};

// ----------------------------------------------------
// ----------------------------------------------------
// Mock Job Simulation
let mockJobs: Job[] = Array.from({ length: 8 }).map((_, i) => ({
    id: uuidv4(),
    name: [
        'Data Export - All Campaigns',
        'Generate Monthly Report',
        'Sync Audience Data Segment A',
        'Import Offline Conversions Q3',
        'Bulk Update Campaign Budgets',
        'Process Image Assets for Ad Network',
        'Re-calculate ROAS Metrics',
        'Audit Logging Cleanup'
    ][i] || `Background Task ${i + 1}`,
    status: ['Completed', 'Failed', 'Completed', 'Completed', 'Processing', 'Pending', 'Failed', 'Completed'][i] as any,
    progress: [100, 45, 100, 100, 75, 0, 12, 100][i],
    createdAt: new Date(Date.now() - Math.random() * 100000000).toISOString()
}));

export const initiateJob = async (name: string): Promise<Job> => {
    await delay(400);
    const newJob: Job = {
        id: uuidv4(),
        name,
        status: 'Pending',
        progress: 0,
        createdAt: new Date().toISOString()
    };
    mockJobs.push(newJob);

    // Simulate async job processing in memory
    simulateJobProcessing(newJob.id);

    return { ...newJob };
};

export const fetchJobs = async (): Promise<Job[]> => {
    await delay(200);
    // Sort by newest first
    return [...mockJobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const simulateJobProcessing = (id: string) => {
    setTimeout(() => {
        const job = mockJobs.find(j => j.id === id);
        if (job && job.status === 'Pending') {
            job.status = 'Processing';
            job.progress = 10;

            // Increment progress
            const interval = setInterval(() => {
                const j = mockJobs.find(j => j.id === id);
                if (!j) {
                    clearInterval(interval);
                    return;
                }

                j.progress += Math.floor(Math.random() * 20) + 10;

                if (j.progress >= 100) {
                    j.progress = 100;
                    // Provide a small chance of failure
                    j.status = Math.random() < 0.1 ? 'Failed' : 'Completed';
                    clearInterval(interval);
                }
            }, 1500);
        }
    }, 1000);
};
