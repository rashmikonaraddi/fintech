"use client";

export default function Analytics({ ledger }) {
  // Define the categories we want to track
  const categories = ['Food', 'Rent', 'Salary', 'Invest', 'Misc'];
  
  // Calculate total for each category
  const categoryData = categories.map(cat => {
    const total = ledger
      .filter(item => item.category === cat)
      .reduce((sum, item) => sum + Number(item.amount), 0);
    return { name: cat, value: total };
  });

  // Find the highest value to scale the bars (minimum 1 to avoid division by zero)
  const maxVal = Math.max(...categoryData.map(d => d.value), 1);

  return (
    <div className="h-full flex flex-col justify-end">
      <div className="flex items-end justify-between h-48 gap-3">
        {categoryData.map((item) => {
          // Calculate height percentage
          const heightPercent = (item.value / maxVal) * 100;

          return (
            <div key={item.name} className="flex-1 flex flex-col items-center group">
              {/* Tooltip on Hover */}
              <div className="opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-bold py-1 px-2 rounded mb-2 transition-all transform translate-y-2 group-hover:translate-y-0">
                ${item.value.toLocaleString()}
              </div>
              
              {/* The Bar */}
              <div 
                className="w-full bg-slate-800 border border-white/5 rounded-t-xl transition-all duration-700 ease-out hover:bg-lime-400 hover:shadow-[0_0_15px_rgba(163,230,53,0.4)]"
                style={{ height: `${heightPercent}%` }}
              ></div>
              
              {/* Label */}
              <span className="text-[10px] text-slate-500 mt-3 uppercase font-bold tracking-tighter">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}