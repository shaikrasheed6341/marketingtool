import {
    BarChart3, Target, Zap, Shield, Globe, Users,
} from 'lucide-react';

export const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
];

export const STATS = [
    { value: '14,000+', label: 'Active Campaigns' },
    { value: '$2.4B', label: 'Ad Spend Managed' },
    { value: '98.7%', label: 'Uptime SLA' },
    { value: '340%', label: 'Average ROAS Lift' },
];

export const FEATURES = [
    {
        icon: <BarChart3 className="w-7 h-7" />,
        title: 'Real-Time Analytics',
        description: 'Monitor every impression, click, and conversion as it happens. Deep-dive dashboards with custom KPIs keep your team aligned.',
        color: 'text-blue-500',
        bg: 'bg-blue-50',
    },
    {
        icon: <Target className="w-7 h-7" />,
        title: 'Precision Targeting',
        description: 'AI-driven audience segmentation ensures your message lands with the right people at exactly the right moment.',
        color: 'text-violet-500',
        bg: 'bg-violet-50',
    },
    {
        icon: <Zap className="w-7 h-7" />,
        title: 'Automated Optimization',
        description: 'Our engine continuously A/B tests creatives, bids, and placements — maximising ROAS while you sleep.',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
    },
    {
        icon: <Shield className="w-7 h-7" />,
        title: 'Brand Safety',
        description: 'Enterprise-grade content filters and fraud detection protect your brand from harmful placements and invalid traffic.',
        color: 'text-green-500',
        bg: 'bg-green-50',
    },
    {
        icon: <Globe className="w-7 h-7" />,
        title: 'Omnichannel Reach',
        description: 'Run unified campaigns across search, social, display, and CTV from a single, intuitive workspace.',
        color: 'text-cyan-500',
        bg: 'bg-cyan-50',
    },
    {
        icon: <Users className="w-7 h-7" />,
        title: 'Team Collaboration',
        description: 'Role-based access, shared dashboards, and approval workflows keep marketers, strategists, and finance in sync.',
        color: 'text-rose-500',
        bg: 'bg-rose-50',
    },
];

export const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Connect Your Channels',
        description: 'Sync Google Ads, Meta, TikTok, LinkedIn and dozens more with one-click OAuth integration.',
    },
    {
        step: '02',
        title: 'Set Your Goals',
        description: 'Define KPIs, budget caps, and target audiences. Our system automatically maps the best strategy.',
    },
    {
        step: '03',
        title: 'Launch & Automate',
        description: 'Publish multi-channel campaigns in seconds. Sit back while the engine optimises 24/7.',
    },
    {
        step: '04',
        title: 'Analyse & Scale',
        description: 'Use unified attribution reports to double down on winners and eliminate wasteful spend.',
    },
];

export const TESTIMONIALS = [
    {
        name: 'Priya Natarajan',
        role: 'VP of Growth, FinEdge',
        avatar: 'PN',
        rating: 5,
        text: "AdPlatform cut our cost-per-acquisition by 43% in just three months. The automated bidding and real-time analytics are simply unmatched.",
        color: 'from-blue-500 to-indigo-500',
    },
    {
        name: 'Marcus Webb',
        role: 'Head of Performance, ScaleUp Labs',
        avatar: 'MW',
        rating: 5,
        text: "We scaled from $50K to $800K in monthly ad spend without adding a single headcount to our media team. The AI optimisation is genuinely remarkable.",
        color: 'from-violet-500 to-purple-600',
    },
    {
        name: 'Sofia Reyes',
        role: 'CMO, Luminary Commerce',
        avatar: 'SR',
        rating: 5,
        text: "The omnichannel view alone is worth it. Finally, one place to see exactly how every dollar is performing across all our channels.",
        color: 'from-rose-500 to-pink-600',
    },
    {
        name: 'Daniel Park',
        role: 'Digital Marketing Director, NovaBrand',
        avatar: 'DP',
        rating: 5,
        text: "Brand safety features gave our legal team the confidence to dramatically increase our programmatic spend. ROAS jumped 2.8× within 60 days.",
        color: 'from-teal-500 to-green-500',
    },
    {
        name: 'Aisha Okafor',
        role: 'Founder, TrendPulse Agency',
        avatar: 'AO',
        rating: 5,
        text: "Managing 40+ client accounts used to be chaos. AdPlatform's team collaboration tools and white-label reporting transformed our agency operations overnight.",
        color: 'from-amber-500 to-orange-500',
    },
    {
        name: 'James Thornton',
        role: 'CTO, Retail Dynamics',
        avatar: 'JT',
        rating: 5,
        text: "The API is phenomenal. We built custom integrations in a week. Their engineering support team was responsive and genuinely knowledgeable. 10/10.",
        color: 'from-cyan-500 to-blue-500',
    },
];

export const PLANS = [
    {
        name: 'Starter',
        price: '$199',
        period: '/mo',
        description: 'Perfect for growing teams launching their first campaigns.',
        features: [
            'Up to $50K monthly ad spend',
            '3 connected ad channels',
            'Real-time dashboard',
            'Email support',
            '5 team members',
        ],
        cta: 'Start Free Trial',
        highlighted: false,
    },
    {
        name: 'Growth',
        price: '$599',
        period: '/mo',
        description: 'For performance teams scaling aggressively across channels.',
        features: [
            'Up to $500K monthly ad spend',
            'Unlimited ad channels',
            'AI optimisation engine',
            'Priority 24/7 support',
            'Unlimited team members',
            'Custom attribution',
            'White-label reports',
        ],
        cta: 'Get Started',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Dedicated infrastructure and SLAs for large organisations.',
        features: [
            'Unlimited ad spend',
            'Dedicated account manager',
            'SSO / SAML integration',
            'Custom SLA & uptime',
            'On-premise option',
            'API access',
            'Custom ML models',
        ],
        cta: 'Contact Sales',
        highlighted: false,
    },
];
