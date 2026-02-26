"use client";
import { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export default function EntryForm({ onAdd, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Misc',
    type: 'outflow'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    
    onAdd({ ...formData, id: Date.now(), date: new Date().toISOString() });
    setFormData({ description: '', amount: '', category: 'Misc', type: 'outflow' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-white/10 p-8 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-white">NEW <span className="text-lime-400">ENTRY</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'inflow'})}
                className={`p-4 rounded-2xl font-bold border ${formData.type === 'inflow' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-transparent text-slate-500'}`}
              >
                Inflow
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'outflow'})}
                className={`p-4 rounded-2xl font-bold border ${formData.type === 'outflow' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-slate-800 border-transparent text-slate-500'}`}
              >
                Outflow
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Description</label>
            <input
              type="text"
              required
              className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-lime-400"
              placeholder="Rent, Salary, Dinner..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Amount (₹)</label>
              <input
                type="number"
                required
                className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-lime-400"
                placeholder="₹0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Category</label>
              <select
                className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-lime-400 appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Food</option>
                <option>Rent</option>
                <option>Salary</option>
                <option>Invest</option>
                <option>Misc</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-lime-400 text-black font-black py-5 rounded-2xl mt-10 flex items-center justify-center gap-2 hover:bg-lime-300 transition-all">
            <PlusCircle size={20} /> COMMIT TO LEDGER
          </button>
        </form>
      </div>
    </div>
  );
}