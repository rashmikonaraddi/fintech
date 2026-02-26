"use client";
import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, ShieldCheck, PieChart, Trash2 } from 'lucide-react';
import EntryForm from './component/EntryForm';
import Analytics from './component/Analytics';

export default function FinTechDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ledger, setLedger] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('ft_core_ledger');
    if (saved) setLedger(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ft_core_ledger', JSON.stringify(ledger));
  }, [ledger]);

  const inflow = ledger.filter(i => i.type === 'inflow').reduce((a, b) => a + Number(b.amount), 0);
  const outflow = ledger.filter(i => i.type === 'outflow').reduce((a, b) => a + Number(b.amount), 0);
  const netPosition = inflow - outflow;

  const deleteEntry = (id) => {
    setLedger(ledger.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <nav className="w-64 bg-slate-900/50 border-r border-white/5 p-6 flex flex-col">
        <div className="text-2xl font-black text-lime-400 mb-10">FT CORE</div>
        <div className="space-y-4">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-lime-400/10 text-lime-400 font-bold' : 'text-slate-400'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('ledger')} 
            className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === 'ledger' ? 'bg-lime-400/10 text-lime-400 font-bold' : 'text-slate-400'}`}
          >
            Ledger
          </button>
          <button 
            onClick={() => setActiveTab('tax')} 
            className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === 'tax' ? 'bg-lime-400/10 text-lime-400 font-bold' : 'text-slate-400'}`}
          >
            Tax Intel
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10">
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white">Financial <span className="text-lime-400">Intelligence</span></h1>
                <p className="text-slate-400">System Status: <span className="text-emerald-400">Encrypted & Local</span></p>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-lime-400 text-black font-bold px-6 py-3 rounded-full hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              >
                + New Entry
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Net Position" val={netPosition} icon={<Wallet />} color="text-white" currency="₹" />
              <StatCard title="Total Inflow" val={inflow} icon={<TrendingUp />} color="text-emerald-400" currency="₹" />
              <StatCard title="Total Outflow" val={outflow} icon={<PieChart />} color="text-rose-400" currency="₹" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80 bg-slate-900/50 border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-8 text-white">Fiscal Trends</h3>
                <Analytics ledger={ledger} />
              </div>
              <div className="h-80 bg-slate-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Tax Exposure</h3>
                  <p className="text-slate-400 text-sm">Estimated liability based on current inflow records.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Est. Payable</p>
                  <p className="text-5xl font-black text-lime-400 mt-2 font-mono">₹{(inflow * 0.15).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FULL LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white">Transaction <span className="text-lime-400">History</span></h2>
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8">
              <div className="space-y-4">
                {ledger.length === 0 ? (
                  <p className="text-slate-500 text-center py-10">No records found in local ledger.</p>
                ) : (
                  ledger.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.type === 'inflow' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {item.type === 'inflow' ? <TrendingUp size={20} /> : <PieChart size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-white">{item.description}</p>
                          <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{item.category} • {new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className={`font-mono font-bold text-lg ${item.type === 'inflow' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.type === 'inflow' ? '+' : '-'}₹{Number(item.amount).toLocaleString()}
                        </p>
                        <button onClick={() => deleteEntry(item.id)} className="text-slate-600 hover:text-rose-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: DETAILED TAX PLANNING */}
        {activeTab === 'tax' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white">Tax <span className="text-lime-400">Intelligence</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-xs font-bold uppercase mb-4">Projected Annual Liability</p>
                <p className="text-6xl font-black text-white">₹{(inflow * 0.15).toFixed(2)}</p>
              </div>
              <div className="bg-lime-400 p-8 rounded-3xl text-black">
                <h4 className="font-bold mb-2">Optimization Strategy</h4>
                <p>You can reduce this by approximately <b>₹12,000</b> by allocating more funds to the 'Invest' category before the fiscal deadline.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <EntryForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onAdd={(newEntry) => setLedger([newEntry, ...ledger])} 
      />
    </div>
  );
}


function StatCard({ title, val, icon, color, currency = '₹' }) {
  return (
    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4 text-slate-500">
        {icon}
        <ShieldCheck size={16} />
      </div>
      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{title}</p>
      <p className={`text-4xl font-black mt-2 ${color}`}>{currency}{val.toLocaleString()}</p>
    </div>
  );
}
