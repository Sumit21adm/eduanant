import { motion } from 'framer-motion';
import { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, CreditCard, Bus, UserCog, Settings, Search, Plus, Download, ChevronDown, CheckCircle2, Moon, RotateCcw, Sparkles, PieChart, TrendingUp, IndianRupee } from 'lucide-react';

// ─── Shared UI Components ────────────────────────────────────────────────────

export function TopBar() {
    return (
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1d24]">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-black">EA</span>
                    </div>
                    <span className="font-bold text-xs text-gray-800 dark:text-gray-100 hidden sm:block">EduAnant Academy</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                    <span className="text-[9px] font-semibold text-gray-600 dark:text-gray-300">APR 2026 - MAR 2027</span>
                    <span className="text-[8px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2.5 mr-1">
                    <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                    <Moon className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SideBar({ activeId }: { activeId: string }) {
    const nav = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'admissions', icon: Users, label: 'Student Mgmt' },
        { id: 'academics', icon: GraduationCap, label: 'Academics' },
        { id: 'fees', icon: CreditCard, label: 'Finance' },
        { id: 'transport', icon: Bus, label: 'Transport' },
        { id: 'staff', icon: UserCog, label: 'Staff Mgmt' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="w-14 shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#15181e] flex flex-col hidden md:flex items-center py-4">
            <div className="flex-1 flex flex-col gap-4 w-full px-2">
                {nav.map(n => {
                    const isActive = activeId === n.id || (activeId === 'reports' && n.id === 'fees');
                    return (
                        <div key={n.id} title={n.label} className={`flex items-center justify-center w-10 h-10 mx-auto rounded-xl transition-colors cursor-pointer ${isActive ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                            <n.icon className={`w-5 h-5 ${isActive ? 'fill-blue-500/10' : ''}`} />
                        </div>
                    );
                })}
            </div>
            <div className="mt-auto w-10 h-10 mx-auto rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">EA</span>
            </div>
        </div>
    );
}

// ─── Screen Simulations ──────────────────────────────────────────────────────

function DashboardSim() {
    return (
        <div className="p-4 flex flex-col gap-4 h-full bg-gray-50 dark:bg-[#111318]">
            <div className="grid grid-cols-4 gap-3">
                {[
                    { l: 'Active Students', v: '1,250', sub: '+15 this month', i: Users, c: 'text-blue-500' },
                    { l: 'Attendance', v: '95%', sub: '1,187 present today', i: CheckCircle2, c: 'text-green-500' },
                    { l: "Today's Collection", v: '₹15,000', sub: '₹2,500,000 this month', i: IndianRupee, c: 'text-orange-500' },
                    { l: 'Month Collection', v: '₹2,500,000', sub: 'Financial trend', i: TrendingUp, c: 'text-blue-500' },
                ].map(k => (
                    <div key={k.l} className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                        <div className={`w-10 h-10 rounded-full ${k.c.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                            <k.i className={`w-5 h-5 ${k.c}`} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-semibold">{k.l}</p>
                            <p className={`text-xl font-bold ${k.c}`}>{k.v}</p>
                            <p className="text-[8px] text-gray-400">{k.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 flex-1 min-h-0">
                <div className="flex-[2] bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Attendance Trend</span>
                        </div>
                        <span className="text-[10px] border px-2 py-1 rounded bg-gray-50 dark:bg-gray-800 text-gray-500">This Week ▼</span>
                    </div>
                    <div className="flex-1 border-b border-l border-gray-100 dark:border-gray-800 relative">
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />
                        <div className="absolute bottom-[-15px] w-full flex justify-between px-2 text-[8px] text-gray-400">
                            <span>Apr 20</span><span>Apr 21</span><span>Apr 22</span><span>Apr 23</span><span>Apr 24</span><span>Apr 25</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Student Demographics</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="w-24 h-24 rounded-full border-[12px] border-emerald-400 border-t-blue-500 border-r-blue-500 transform rotate-45" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 text-[9px] font-semibold text-gray-500 mt-4">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm"/>Female</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-sm"/>Male</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdmissionsSim() {
    return (
        <div className="p-4 flex flex-col gap-4 h-full bg-gray-50 dark:bg-[#111318]">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Student Admissions</h2>
                    <p className="text-[10px] text-gray-500">Manage student admissions and records</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-sm"><Download className="w-3.5 h-3.5"/> Export</button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm"><Plus className="w-3.5 h-3.5"/> New Admission</button>
                </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                {[
                    { l: 'Active in Session', v: '1,250', i: Users, c: 'text-green-500' },
                    { l: 'Alumni / Passed Out', v: '3,500', i: Users, c: 'text-orange-500' },
                    { l: 'Archived Students', v: '12', i: Users, c: 'text-red-500' },
                    { l: "Today's Birthdays", v: '3', i: Users, c: 'text-blue-500' },
                ].map(k => (
                    <div key={k.l} className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                        <div className={`w-10 h-10 rounded-full ${k.c.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                            <k.i className={`w-5 h-5 ${k.c}`} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-semibold">{k.l}</p>
                            <p className={`text-xl font-bold ${k.c}`}>{k.v}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex gap-2 shadow-sm">
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400">Search by name or ID...</span>
                </div>
                {['Class', 'Section', 'Student Type', 'Status (Active)'].map(f => (
                    <div key={f} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-xs text-gray-600 font-medium">
                        {f} <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                ))}
            </div>

            <div className="flex-1 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-500 uppercase">
                    <span>Photo</span><span>Student ID</span><span className="col-span-2">Name</span><span>Class</span><span>Phone</span><span>Status</span>
                </div>
                <div className="flex-1 overflow-hidden">
                    {[
                        { id: '1001', n: 'Jane Doe', c: 'XII-Science-A', p: '+1 555-0100' },
                        { id: '1002', n: 'John Smith', c: 'XII-Science-A', p: '+1 555-0101' },
                        { id: '1003', n: 'Alex Johnson', c: 'XII-Com-A', p: '+1 555-0102' },
                    ].map(s => (
                        <div key={s.id} className="grid grid-cols-7 gap-2 p-3 border-b border-gray-50 items-center text-xs text-gray-700">
                            <div><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">{s.n[0]}</div></div>
                            <span className="font-semibold">{s.id}</span>
                            <span className="col-span-2 font-bold text-gray-900">{s.n}</span>
                            <span>{s.c}</span>
                            <span>{s.p}</span>
                            <div><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 font-bold text-[9px]">Active</span></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FeeCollectionSim() {
    return (
        <div className="p-4 flex flex-col gap-4 h-full bg-gray-50 dark:bg-[#111318]">
            <div className="flex gap-4 border-b border-gray-200 pb-2">
                <span className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-2">Fee Collection</span>
                <span className="text-sm font-semibold text-gray-500 pb-2">Financial History</span>
            </div>
            
            <div className="flex gap-4 flex-1">
                <div className="flex-[2] flex flex-col gap-4">
                    <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
                        <div className="flex gap-3 mb-4">
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-500 mb-1">Session</p>
                                <div className="p-2 border rounded text-xs text-gray-700 bg-gray-50">APR 2026 - MAR 2027</div>
                            </div>
                            <div className="flex-[2]">
                                <p className="text-[10px] text-gray-500 mb-1">Search Student</p>
                                <div className="p-2 border rounded text-xs text-gray-700 bg-white flex justify-between">Alex Johnson (1003) - XII-Com-A <ChevronDown className="w-4 h-4"/></div>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mb-4 flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mt-0.5">i</div>
                            <div>
                                <p className="text-sm font-bold text-blue-900">Alex Johnson</p>
                                <p className="text-xs text-blue-700">Class: XII-Com-A | Parent: Michael Johnson</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="grid grid-cols-4 gap-2 bg-gray-50 p-2 text-[10px] font-bold text-gray-500 uppercase border-b">
                                <span className="col-span-2">Fee Type</span><span>Amount</span><span className="text-right">Net Amount</span>
                            </div>
                            <div className="p-2">
                                <div className="inline-block px-2 py-0.5 bg-blue-500 text-white text-[9px] font-bold rounded mb-2">Apr 2026</div>
                                <div className="grid grid-cols-4 gap-2 text-xs items-center mb-2">
                                    <span className="col-span-2 font-semibold text-gray-700">Tuition Fee</span>
                                    <div className="border rounded p-1.5 text-gray-700">₹ 3000</div>
                                    <span className="text-right font-bold text-gray-900">₹3,000</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-xs items-center">
                                    <span className="col-span-2 font-semibold text-gray-700">Development Fee</span>
                                    <div className="border rounded p-1.5 text-gray-700">₹ 1500</div>
                                    <span className="text-right font-bold text-gray-900">₹1,500</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 border-t flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">PAYMENT MODES</span>
                                <span className="text-sm font-black text-blue-600">Total: ₹4,500</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                        <p className="font-bold text-gray-800 mb-1">Fee Summary</p>
                        <div className="bg-blue-500 text-white p-3 rounded-lg flex flex-col justify-center">
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wide">Total Net Fee</p>
                            <p className="text-xl font-black">₹4,500</p>
                        </div>
                        <div className="bg-emerald-500 text-white p-3 rounded-lg flex flex-col justify-center">
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wide">Total Paid</p>
                            <p className="text-xl font-black">₹0</p>
                        </div>
                        <div className="bg-red-500 text-white p-3 rounded-lg flex flex-col justify-center relative overflow-hidden">
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wide">Outstanding Dues</p>
                            <p className="text-xl font-black">₹4,500</p>
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 rounded text-[9px] font-bold">REQUIRED</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeeReportsSim() {
    return (
        <div className="p-4 flex flex-col gap-4 h-full bg-gray-50 dark:bg-[#111318]">
            <div className="flex gap-4 border-b border-gray-200 pb-2 overflow-x-auto">
                {['Daily Collection', 'Outstanding Dues', 'Bill Record', 'Bill Discounts', 'Fee Analysis', 'Alumni Dues'].map((t, i) => (
                    <span key={t} className={`text-sm whitespace-nowrap ${i === 4 ? 'font-bold text-blue-600 border-b-2 border-blue-600' : 'font-semibold text-gray-500'} pb-2`}>{t}</span>
                ))}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center justify-between">
                <div className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 bg-gray-50">Filter by Class ▼</div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-blue-600"><Download className="w-3.5 h-3.5"/> Export Excel</button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                    { l: 'Net Demanded', v: '₹9,000,000', c: 'text-blue-500' },
                    { l: 'Collected (Bills)', v: '₹5,500,000', c: 'text-green-500' },
                    { l: 'Other Collections', v: '₹500,000', c: 'text-blue-400' },
                    { l: 'Pending (Unpaid)', v: '₹3,000,000', c: 'text-red-500' },
                    { l: 'Total Discounts', v: '₹50,000', c: 'text-orange-500' },
                ].map(k => (
                    <div key={k.l} className="bg-white border border-gray-200 rounded-xl p-3 min-w-[140px] shadow-sm shrink-0">
                        <p className={`text-[10px] font-bold ${k.c} mb-1 flex items-center gap-1`}><div className={`w-1.5 h-1.5 rounded-full ${k.c.replace('text-', 'bg-')}`}/> {k.l}</p>
                        <p className={`text-sm font-black ${k.c}`}>{k.v}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 flex-1 min-h-0">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
                    <p className="text-xs font-bold text-gray-800 mb-4">Collection Overview</p>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-[16px] border-red-500 border-l-green-500 border-t-green-500 relative transform -rotate-12" />
                    </div>
                    <div className="flex justify-center gap-3 text-[8px] font-semibold text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-sm"/>Collected: ₹5.5M</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm"/>Pending: ₹3.0M</span>
                    </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
                    <p className="text-xs font-bold text-gray-800 mb-4">Fee Distribution by Frequency</p>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-[16px] border-green-500 border-r-orange-400 relative transform rotate-45" />
                    </div>
                    <div className="flex justify-center gap-3 text-[8px] font-semibold text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-sm"/>Yearly: ₹4.5M</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-sm"/>Monthly: ₹1.0M</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SCREENS = [
    { id: 'dashboard', label: 'Live Dashboard', desc: 'Real-time KPIs, fee trends, attendance summary — the first thing you see every morning.', sim: DashboardSim },
    { id: 'admissions', label: 'Student Admissions', desc: 'Manage active students, alumni, generate reports, and process new enrollments easily.', sim: AdmissionsSim },
    { id: 'fees', label: 'Fee Collection', desc: 'Search student → see pending dues → collect payment → print PDF receipt. All in under 2 minutes.', sim: FeeCollectionSim },
    { id: 'reports', label: 'Fee Reports', desc: 'Analyze collection trends, outstanding dues, and discounts in an intuitive dashboard.', sim: FeeReportsSim },
];

export default function ProductDemoSection() {
    const [active, setActive] = useState(0);
    const screen = SCREENS[active];
    const SimComponent = screen.sim;

    return (
        <section id="demo" className="py-24 relative overflow-x-clip">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-main/8 dark:bg-primary-main/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest border border-primary-main/20 mb-5">
                        <Sparkles className="w-3.5 h-3.5" /> Live Product Preview
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 leading-tight">
                        See it working.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-main to-secondary-main">Right here. Right now.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">These are real screens from EduAnant — not mockups. This is exactly what your admin, teachers, and students will use every day.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Feature Selectors */}
                    <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0">
                        {SCREENS.map((s, i) => (
                            <motion.button key={s.id} onClick={() => setActive(i)} whileHover={{ x: 4 }}
                                className={`flex flex-col p-4 rounded-2xl border text-left transition-all duration-300 min-w-[200px] lg:min-w-0 ${i === active ? 'bg-white dark:bg-[#1a1d24] border-primary-main/50 shadow-lg ring-1 ring-primary-main/20' : 'bg-gray-50/50 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 hover:border-primary-main/30'}`}>
                                <h3 className={`font-black text-sm mb-1 ${i === active ? 'text-primary-main' : 'text-gray-800 dark:text-gray-200'}`}>{s.label}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed hidden sm:block">{s.desc}</p>
                            </motion.button>
                        ))}
                    </div>

                    {/* App Window */}
                    <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                        className="lg:col-span-9 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white shadow-2xl shadow-blue-900/5">
                        
                        {/* Browser Chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#15181e] border-b border-gray-200 dark:border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="ml-4 flex-1 flex justify-center">
                                <div className="flex items-center gap-2 bg-white dark:bg-[#1a1d24] text-gray-500 text-[10px] px-6 py-1.5 rounded-full border border-gray-200 dark:border-white/10 font-mono w-full max-w-sm">
                                    app.eduanant.cloud/{screen.id}
                                </div>
                            </div>
                        </div>

                        {/* App Layout */}
                        <div className="flex h-[480px]">
                            <SideBar activeId={screen.id} />
                            <div className="flex-1 flex flex-col min-w-0">
                                <TopBar />
                                <div className="flex-1 overflow-hidden relative">
                                    <SimComponent />
                                    {/* Overlay Gradient to fade out bottom */}
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-50 dark:from-[#111318] to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
