import { useState } from 'react';
import { Outlet, NavLink, Link, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Bell, Menu, Rocket, Activity, Briefcase, ChevronLeft } from 'lucide-react';
import { cn } from './lib/utils';
import { JobSimulationWidget } from './features/jobs/JobSimulationWidget';
import LandingPage from './pages/LandingPage';
import { CampaignList } from './features/campaigns/CampaignList';
import { CampaignDetail } from './features/campaigns/CampaignDetail';
import { JobsDashboard } from './features/jobs/JobsDashboard';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Campaigns', end: true },
    { to: '/dashboard/jobs', icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', end: false },
    { to: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', end: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden backdrop-blur-sm transition-all"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col border-r border-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">AdPlatform</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Back to Marketing Site */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="font-medium">All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <JobSimulationWidget />
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <button className="relative p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              <Bell className="w-5 h-5" />
            </button>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-slate-200 hover:ring-slate-400 transition-all">
              JS
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 scroll-smooth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full min-h-full flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <CampaignList /> },
      { path: 'campaigns/:id', element: <CampaignDetail /> },
      { path: 'jobs', element: <JobsDashboard /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
