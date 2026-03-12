import React, { useState, useEffect, useCallback } from 'react';
import { fetchCampaigns, updateCampaignStatus, deleteCampaigns } from '../../services/api';
import type { Campaign, CampaignStatus, PaginatedResponse } from '../../types';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/Badge';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, Filter, ChevronLeft, ChevronRight, TrendingUp, AlertCircle, Loader2, ArrowUpDown, ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export const CampaignList: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<PaginatedResponse<Campaign> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<keyof Campaign>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filters
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFilters, setStatusFilters] = useState<CampaignStatus[]>([]);

    // Bulk selection
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const debouncedSearch = useDebounce(search, 400);

    const loadCampaigns = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchCampaigns(page, 10, debouncedSearch, sortField, sortOrder, statusFilters);
            setData(res);
            // Don't clear selections on reload unless we want to, but it's safer to keep them or clear them.
        } catch (err: any) {
            setError(err.message || 'Failed to fetch campaigns');
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch, sortField, sortOrder, statusFilters]);

    useEffect(() => {
        loadCampaigns();
    }, [loadCampaigns]);

    // If search/sort/filter changes, reset page to 1
    useEffect(() => {
        setPage(1);
        setSelectedIds(new Set()); // Clear selection on filter/sort change
    }, [debouncedSearch, sortField, sortOrder, statusFilters]);

    const handleSort = (field: keyof Campaign) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: CampaignStatus) => {
        if (!data) return;
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';

        const prevData = { ...data };
        setData({
            ...data,
            data: data.data.map(c => c.id === id ? { ...c, status: newStatus } : c)
        });

        try {
            await updateCampaignStatus(id, newStatus);
        } catch (err) {
            setData(prevData);
            alert('Failed to update status');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} campaigns?`)) return;

        setLoading(true);
        try {
            await deleteCampaigns(Array.from(selectedIds));
            setSelectedIds(new Set());
            await loadCampaigns();
        } catch (err) {
            alert('Failed to delete campaigns');
            setLoading(false);
        }
    };

    const toggleSelectAll = () => {
        if (!data) return;
        if (selectedIds.size === data.data.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(data.data.map(c => c.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const totalPages = data ? Math.ceil(data.total / data.limit) : 0;
    const isAllSelected = data && data.data.length > 0 && selectedIds.size === data.data.length;

    const SortableHeader = ({ field, label, align = 'left' }: { field: keyof Campaign, label: string, align?: 'left' | 'right' | 'center' }) => (
        <th className={cn("px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors select-none", `text-${align}`)} onClick={() => handleSort(field)}>
            <div className={cn("flex items-center", align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : '')}>
                {label}
                <ArrowUpDown className={cn("w-3.5 h-3.5 ml-1.5", sortField === field ? "text-primary-500" : "text-slate-400 opacity-50")} />
            </div>
        </th>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Campaigns Overview</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage and track your active marketing campaigns.</p>
                </div>
                <Button>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Create Campaign
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search campaigns by name..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    {/* Multi-Filter Dropdown */}
                    <div className="relative">
                        <Button variant="secondary" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            <Filter className="w-4 h-4 mr-2" />
                            Status Filter {statusFilters.length > 0 && `(${statusFilters.length})`}
                            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl z-20 py-2">
                                    {['Active', 'Paused', 'Draft', 'Completed'].map((status) => (
                                        <label key={status} className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4 mr-3"
                                                checked={statusFilters.includes(status as CampaignStatus)}
                                                onChange={(e) => {
                                                    if (e.target.checked) setStatusFilters([...statusFilters, status as CampaignStatus]);
                                                    else setStatusFilters(statusFilters.filter(s => s !== status));
                                                }}
                                            />
                                            <span className="text-sm text-slate-700">{status}</span>
                                        </label>
                                    ))}
                                    {statusFilters.length > 0 && (
                                        <div className="border-t border-slate-100 mt-2 p-2">
                                            <Button variant="ghost" size="sm" className="w-full justify-center text-xs" onClick={() => setStatusFilters([])}>
                                                Clear Filters
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {selectedIds.size > 0 && (
                        <div className="flex items-center space-x-2 animate-in zoom-in-95">
                            <span className="text-sm font-medium text-slate-600 px-2">{selectedIds.size} selected</span>
                            <Button variant="secondary" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleBulkDelete}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white border text-sm border-slate-200 rounded-xl shadow-sm overflow-hidden relative min-h-[400px]">
                {error && (
                    <div className="absolute inset-x-0 top-0 p-4 bg-red-50 flex items-center text-red-700 border-b border-red-200 z-10">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span className="flex-1">{error}</span>
                        <Button variant="ghost" size="sm" onClick={loadCampaigns}>Retry</Button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                                <th className="px-6 py-4 whitespace-nowrap w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                                        checked={!!isAllSelected}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <SortableHeader field="name" label="Campaign Name" />
                                <SortableHeader field="status" label="Status" />
                                <SortableHeader field="budget" label="Budget" align="right" />
                                <SortableHeader field="spent" label="Spent" align="right" />
                                <SortableHeader field="roas" label="ROAS" align="right" />
                                <th className="px-6 py-4 whitespace-nowrap text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                            {loading && !data ? (
                                <tr>
                                    <td colSpan={7} className="h-64 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
                                    </td>
                                </tr>
                            ) : data?.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="h-64 text-center text-slate-500">
                                        No campaigns found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                data?.data.map((campaign) => (
                                    <tr key={campaign.id} className={cn("hover:bg-slate-50 transition-colors group", selectedIds.has(campaign.id) && "bg-primary-50 hover:bg-primary-50")}>
                                        <td className="px-6 py-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                                                checked={selectedIds.has(campaign.id)}
                                                onChange={() => toggleSelect(campaign.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            <button
                                                onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
                                                className="text-slate-900 hover:text-primary-600 transition-colors text-left flex flex-col"
                                            >
                                                <span>{campaign.name}</span>
                                                <span className="text-xs text-slate-500 font-normal mt-1 group-hover:text-primary-400">
                                                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                                                </span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={campaign.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums">
                                            ${campaign.budget.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums">
                                            ${campaign.spent.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums">
                                            <div className="flex items-center justify-end">
                                                <span className={cn("font-medium", campaign.roas > 2 ? 'text-green-600' : campaign.roas < 1 ? 'text-red-500' : '')}>
                                                    {campaign.roas.toFixed(2)}x
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleStatusToggle(campaign.id, campaign.status)}
                                                >
                                                    {campaign.status === 'Active' ? 'Pause' : 'Activate'}
                                                </Button>
                                                <Button variant="secondary" size="sm" onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}>
                                                    View
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium text-slate-900">{data ? (page - 1) * data.limit + 1 : 0}</span> to <span className="font-medium text-slate-900">{data ? Math.min(page * data.limit, data.total) : 0}</span> of <span className="font-medium text-slate-900">{data?.total || 0}</span> results
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={page <= 1 || loading}
                            onClick={() => setPage(page - 1)}
                            className="px-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm px-2 tabular-nums">Page {page} of {totalPages || 1}</span>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={page >= totalPages || loading}
                            onClick={() => setPage(page + 1)}
                            className="px-2"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {loading && data && (
                    <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center backdrop-blur-[1px]">
                        <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                    </div>
                )}
            </div>
        </div>
    );
};
