import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCampaignById, updateCampaign, initiateJob } from '../../services/api';
import type { Campaign } from '../../types';
import { useDropzone } from 'react-dropzone';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/Button';
import { Loader2, ArrowLeft, UploadCloud, AlertTriangle, File as FileIcon, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StatusBadge } from '../../components/Badge';

type TabType = 'overview' | 'assets' | 'performance';

export const CampaignDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Load campaign
    useEffect(() => {
        if (!id) return;
        let mounted = true;
        setLoading(true);
        fetchCampaignById(id)
            .then(data => {
                if (mounted) {
                    setCampaign(data);
                    setFormData({ name: data.name, budget: data.budget.toString(), status: data.status });
                }
            })
            .catch(err => {
                if (mounted) setError(err.message || 'Failed to load campaign');
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => { mounted = false; };
    }, [id]);

    // ----------------------------------------------------
    // Overview Tab State
    const [formData, setFormData] = useState({ name: '', budget: '', status: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        if (!campaign) return;
        const unsaved = formData.name !== campaign.name ||
            formData.budget !== campaign.budget.toString() ||
            formData.status !== campaign.status;
        setHasUnsavedChanges(unsaved);
    }, [formData, campaign]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaign || !id) return;

        setIsSaving(true);
        try {
            const updated = await updateCampaign(id, {
                name: formData.name,
                budget: parseFloat(formData.budget),
                status: formData.status as any
            });
            setCampaign(updated);
            setHasUnsavedChanges(false);
        } catch (err: any) {
            alert(err.message || "Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    // Prevent navigation if unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    // ----------------------------------------------------
    // Assets Tab State
    const [files, setFiles] = useState<{ name: string, progress: number, status: 'uploading' | 'completed' | 'error' }[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(f => ({ name: f.name, progress: 0, status: 'uploading' as const }));
        setFiles(prev => [...prev, ...newFiles]);

        // Initiate job for each file upload
        for (const file of acceptedFiles) {
            try {
                // We create a background job to track the upload progress globally as well
                await initiateJob(`Upload Asset: ${file.name}`);
            } catch (e) {
                // ignore
            }
        }

        // Simulate local progress for the UI
        newFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 30) + 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress: 100, status: Math.random() < 0.1 ? 'error' : 'completed' } : f));
                } else {
                    setFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress } : f));
                }
            }, 500);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // ----------------------------------------------------
    // Performance Tab Data
    const mockChartData = Array.from({ length: 7 }).map((_, i) => ({
        day: `Day ${i + 1}`,
        clicks: Math.floor(Math.random() * 500) + 100,
        conversions: Math.floor(Math.random() * 50) + 5
    }));

    // ----------------------------------------------------
    // Render

    if (loading) return (
        <div className="flex h-full items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
    );

    if (error || !campaign) return (
        <div className="p-8 text-center text-red-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-bold">{error || "Campaign Not Found"}</h2>
            <Button className="mt-4" onClick={() => navigate('/')}>Back to Campaigns</Button>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto w-full pb-16">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <div className="flex items-center space-x-3">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{campaign.name}</h2>
                        <StatusBadge status={campaign.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Campaign ID: {campaign.id}</p>
                </div>
            </div>

            {hasUnsavedChanges && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">You have unsaved changes. Don't forget to save before leaving.</span>
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {(['overview', 'assets', 'performance'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize",
                                activeTab === tab
                                    ? "border-primary-500 text-primary-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                {activeTab === 'overview' && (
                    <form onSubmit={handleSave} className="max-w-xl space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Total Budget ($)</label>
                            <input
                                required
                                type="number"
                                min="100"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setFormData({ name: campaign.name, budget: campaign.budget.toString(), status: campaign.status })}
                                disabled={!hasUnsavedChanges || isSaving}
                            >
                                Discard Changes
                            </Button>
                            <Button type="submit" disabled={!hasUnsavedChanges || isSaving}>
                                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Save Configuration
                            </Button>
                        </div>
                    </form>
                )}

                {activeTab === 'assets' && (
                    <div className="space-y-6">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all",
                                isDragActive ? "border-primary-500 bg-primary-50" : "border-slate-300 hover:border-primary-400 hover:bg-slate-50"
                            )}
                        >
                            <input {...getInputProps()} />
                            <UploadCloud className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                Drag & drop campaign assets here, or <span className="text-primary-600">click to browse</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG, GIF, MP4 (Max 50MB)</p>
                        </div>

                        {files.length > 0 && (
                            <div className="mt-8 space-y-4">
                                <h4 className="text-sm font-semibold text-slate-900">Upload Process</h4>
                                {files.map((file, i) => (
                                    <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-3">
                                                <FileIcon className="w-5 h-5 text-slate-400" />
                                                <span className="text-sm font-medium text-slate-700">{file.name}</span>
                                            </div>
                                            {file.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                            {file.status === 'error' && <span className="text-xs font-bold text-red-500">Failed</span>}
                                            {file.status === 'uploading' && <span className="text-xs font-medium text-primary-600 tabular-nums">{file.progress}%</span>}
                                        </div>
                                        {file.status !== 'error' ? (
                                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                                                <div
                                                    className={cn("h-full transition-all duration-300", file.status === 'completed' ? "bg-green-500" : "bg-primary-500")}
                                                    style={{ width: `${file.progress}%` }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-xs text-red-500 mt-2">Network error while uploading.</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                                <p className="text-sm font-medium text-slate-500">Total Spent</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">${campaign.spent.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                                <p className="text-sm font-medium text-slate-500">Conversions</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{campaign.conversions.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                                <p className="text-sm font-medium text-slate-500">ROAS</p>
                                <p className={cn("text-2xl font-bold mt-1", campaign.roas >= 2 ? "text-green-600" : "text-slate-900")}>
                                    {campaign.roas.toFixed(2)}x
                                </p>
                            </div>
                        </div>

                        <div className="h-80 w-full mt-8 border border-slate-100 rounded-xl p-4 pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="clicks"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="conversions"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
