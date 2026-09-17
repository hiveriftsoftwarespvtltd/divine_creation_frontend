import React from 'react';

export default function Dashboard({ enquiries, products, onTabChange }) {
  const totalEnquiries = enquiries.length;
  const pendingLeads = enquiries.filter(e => e.status === 'Pending').length;
  const wonLeads = enquiries.filter(e => e.status === 'Converted').length;
  const totalProducts = products.length;

  // Dynamic monthly stats based on real enquiries dates (Last 7 Months)
  const getMonthlyTrend = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trends = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      trends.push({
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
        monthLabel: monthNames[d.getMonth()],
        count: 0
      });
    }

    enquiries.forEach(enq => {
      let enqDate = null;
      if (enq.createdAt) {
        enqDate = new Date(enq.createdAt);
      } else if (enq.date) {
        enqDate = new Date(enq.date);
      }

      if (enqDate && !isNaN(enqDate.getTime())) {
        const enqYear = enqDate.getFullYear();
        const enqMonth = enqDate.getMonth();
        
        const match = trends.find(t => t.year === enqYear && t.monthIndex === enqMonth);
        if (match) {
          match.count++;
        }
      }
    });

    return trends.map(t => ({
      month: t.monthLabel,
      count: t.count
    }));
  };

  const monthlyStats = getMonthlyTrend();

  // SVG Chart Dimensions
  const chartHeight = 120;
  const chartWidth = 320;
  const maxVal = Math.max(...monthlyStats.map(s => s.count), 1);

  // Get recent 5 enquiries
  const recentEnquiries = [...enquiries].reverse().slice(0, 5);

  return (
    <div className="space-y-8 text-slate-800">
      
      {/* Page Title & Intro */}
      <div className="text-left">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Dashboard Overview</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Real-time summary of leads, custom enquiries, and active products.
        </p>
      </div>

      {/* Grid: Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stat 1: Total Leads */}
        <div className="bg-white border border-[#cca040]/10 hover:border-[#cca040]/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-3xl font-black font-serif text-slate-900">{totalEnquiries}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Submitted Forms</p>
          </div>
        </div>

        {/* Stat 2: Pending Enquiries */}
        <div className="bg-white border border-[#cca040]/10 hover:border-[#cca040]/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Leads</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-3xl font-black font-serif text-slate-900">{pendingLeads}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Needs Response</p>
          </div>
        </div>

        {/* Stat 3: Won/Converted Leads */}
        <div className="bg-white border border-[#cca040]/10 hover:border-[#cca040]/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Converted Leads</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-3xl font-black font-serif text-emerald-600">{wonLeads}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Outcome: Won</p>
          </div>
        </div>

        {/* Stat 4: Active Products */}
        <div className="bg-white border border-[#cca040]/10 hover:border-[#cca040]/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Products</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-3xl font-black font-serif text-slate-900">{totalProducts}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Catalog Listings</p>
          </div>
        </div>

      </div>

      {/* Grid: Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Leads Chart Card */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs text-left">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Monthly Enquiries Trend</h3>
          
          <div className="flex items-end justify-between h-[150px] pt-4 border-b border-slate-100">
            {monthlyStats.map((stat, idx) => {
              // Calculate percentage height
              const heightPct = Math.max((stat.count / maxVal) * 100, 8);
              return (
                <div key={idx} className="flex flex-col items-center flex-grow group relative">
                  {/* Tooltip */}
                  <span className="absolute -top-6 bg-slate-800 text-white text-[10px] font-bold py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {stat.count} Leads
                  </span>
                  
                  {/* Bar */}
                  <div
                    className="w-8 sm:w-10 bg-slate-200 group-hover:bg-[#cca040] transition-colors rounded-t-md"
                    style={{ height: `${(heightPct / 100) * chartHeight}px` }}
                  />
                  
                  {/* Label */}
                  <span className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">
                    {stat.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs text-left flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5">Quick Management</h3>
            
            <div className="space-y-3">
              {/* Add Product Shortcut */}
              <button
                onClick={() => onTabChange('products')}
                className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-left rounded-xl transition-all flex items-center gap-3.5 group"
              >
                <span className="p-2 bg-[#cca040]/10 text-[#cca040] rounded-lg shrink-0 transition-colors group-hover:bg-[#cca040] group-hover:text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Add New Product</h4>
                  <p className="text-text-xs text-slate-400 font-medium mt-1">Upload title, image, and details</p>
                </div>
              </button>

              {/* Manage Enquiries Shortcut */}
              <button
                onClick={() => onTabChange('enquiries')}
                className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-left rounded-xl transition-all flex items-center gap-3.5 group"
              >
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Process Leads</h4>
                  <p className="text-text-xs text-slate-400 font-medium mt-1">Check new emails and WhatsApps</p>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
            Log active: Today at 6:10 PM
          </div>
        </div>

      </div>

      {/* Section: Recent Submissions */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs text-left">
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-6 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Enquiries</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Latest leads requesting quotes.</p>
          </div>
          <button
            onClick={() => onTabChange('enquiries')}
            className="text-[#cca040] hover:text-[#b5892b] text-xs font-extrabold uppercase tracking-wider transition-colors self-start sm:self-auto"
          >
            View All Enquiries &rarr;
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider">
                <th className="pb-3.5 font-bold">Client Name</th>
                <th className="pb-3.5 font-bold">Phone Number</th>
                <th className="pb-3.5 font-bold hidden md:table-cell">Subject</th>
                <th className="pb-3.5 font-bold hidden sm:table-cell">Date Received</th>
                <th className="pb-3.5 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400 text-xs font-semibold">
                    No enquiries received yet.
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="border-b border-slate-50/50 hover:bg-slate-50/30 text-xs text-slate-600 font-medium">
                    <td className="py-4 text-slate-900 font-bold">{enq.name}</td>
                    <td className="py-4 text-slate-700 font-bold">{enq.phone}</td>
                    <td className="py-4 text-slate-500 hidden md:table-cell">{enq.subject}</td>
                    <td className="py-4 text-slate-400 hidden sm:table-cell">{enq.date}</td>
                    <td className="py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        enq.status === 'Converted' ? 'bg-emerald-50 text-emerald-600' :
                        enq.status === 'Lost' ? 'bg-rose-50 text-rose-600' :
                        enq.status === 'Hold' ? 'bg-purple-50 text-purple-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
