import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';

export default function EnquiryManage({ enquiries = [], onUpdateEnquiryStatus, onDeleteEnquiry }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Sorting & Pagination States
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search, Filter & Sort Data Table Pipeline
  const filteredAndSortedEnquiries = useMemo(() => {
    return enquiries
      .filter((enq) => {
        const matchesSearch =
          (enq.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (enq.phone || '').includes(searchTerm) ||
          (enq.email && (enq.email || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
          (enq.subject || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let aVal = a[sortField] || '';
        let bVal = b[sortField] || '';

        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [enquiries, searchTerm, statusFilter, sortField, sortOrder]);

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedEnquiries.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const paginatedEnquiries = filteredAndSortedEnquiries.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Client Name',
      'Phone Number',
      'Email Address',
      'Enquired Subject / Product',
      'Client Message',
      'Reference Image URL',
      'Date Received',
      'Status'
    ];
    
    const rows = enquiries.map(e => {
      const name = `"${(e.name || '').replace(/"/g, '""')}"`;
      const phone = `"${(e.phone || '').replace(/"/g, '""')}"`;
      const email = `"${(e.email || '').replace(/"/g, '""')}"`;
      const subject = `"${(e.subject || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const message = `"${(e.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const image = `"${(e.image || '').replace(/"/g, '""')}"`;
      
      let dateVal = e.date || '';
      if (!dateVal && e.createdAt) {
        dateVal = new Date(e.createdAt).toISOString().slice(0, 10);
      }
      const date = `"${dateVal}"`;
      const status = `"${(e.status || 'Pending').replace(/"/g, '""')}"`;

      return [name, phone, email, subject, message, image, date, status];
    });

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `divine_creations_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Enquiry Management / CRM</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track client submissions, process lead status, and manage corporate sales pipeline.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md w-full">
          <input
            type="text"
            placeholder="Search leads by name, phone, email, subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Status Filters & Rows Selector */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Pending', 'Converted', 'Hold', 'Lost'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#0a0e26] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#cca040] cursor-pointer"
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={25}>25 Rows</option>
            <option value={50}>50 Rows</option>
          </select>
        </div>
      </div>

      {/* Lead Interactive Data Table Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider">
                <th
                  onClick={() => handleSort('name')}
                  className="pb-3.5 font-bold pl-2 cursor-pointer hover:text-slate-700 transition-colors"
                >
                  Client Detail {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleSort('phone')}
                  className="pb-3.5 font-bold cursor-pointer hover:text-slate-700 transition-colors"
                >
                  Contact Info {sortField === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleSort('subject')}
                  className="pb-3.5 font-bold hidden md:table-cell cursor-pointer hover:text-slate-700 transition-colors"
                >
                  Requirement {sortField === 'subject' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="pb-3.5 font-bold hidden lg:table-cell cursor-pointer hover:text-slate-700 transition-colors"
                >
                  Date {sortField === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="pb-3.5 font-bold text-center cursor-pointer hover:text-slate-700 transition-colors"
                >
                  Status {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="pb-3.5 font-bold text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs text-slate-600 font-medium">
              {paginatedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">No leads found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map((enq) => (
                  <tr key={enq._id || enq.id} className="hover:bg-slate-50/60 transition-colors">

                    {/* Client name */}
                    <td className="py-4 pl-2">
                      <div className="font-bold text-slate-900">{enq.name}</div>
                      {enq.company && <div className="text-[10px] text-slate-400 font-semibold">{enq.company}</div>}
                    </td>

                    {/* Contact details */}
                    <td className="py-4">
                      <div className="font-bold text-slate-700">{enq.phone}</div>
                      {enq.email && <div className="text-slate-400 font-semibold text-[10px] mt-0.5">{enq.email}</div>}
                    </td>

                    {/* Requirement subject */}
                    <td className="py-4 hidden md:table-cell">
                      <div className="font-semibold text-slate-800 line-clamp-1">{enq.subject}</div>
                      {enq.message && <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{enq.message}</div>}
                    </td>

                    {/* Date */}
                    <td className="py-4 text-slate-400 font-semibold hidden lg:table-cell">{enq.date || 'Today'}</td>

                    {/* Interactive Status Dropdown */}
                    <td className="py-4 text-center">
                      <select
                        value={enq.status}
                        onChange={(e) => onUpdateEnquiryStatus(enq._id || enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border-0 focus:outline-none cursor-pointer ${
                          enq.status === 'Converted' ? 'bg-emerald-50 text-emerald-600' :
                          enq.status === 'Lost' ? 'bg-rose-50 text-rose-600' :
                          enq.status === 'Hold' ? 'bg-purple-50 text-purple-600' :
                          'bg-amber-50 text-amber-600'
                        }`}
                      >
                        <option value="Pending" className="bg-white text-amber-600 font-bold">Pending</option>
                        <option value="Converted" className="bg-white text-emerald-600 font-bold">Converted</option>
                        <option value="Hold" className="bg-white text-purple-600 font-bold">Hold</option>
                        <option value="Lost" className="bg-white text-rose-600 font-bold">Lost</option>
                      </select>
                    </td>

                    {/* Action View & Delete Buttons */}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Delete Enquiry?',
                              text: `Are you sure you want to delete this enquiry lead from "${enq.name}"?`,
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#cca040',
                              cancelButtonColor: '#ef4444',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                onDeleteEnquiry(enq._id || enq.id);
                              }
                            });
                          }}
                          className="p-1.5 bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-red-200 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Data Table Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-4 mt-4 gap-3">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Showing {filteredAndSortedEnquiries.length > 0 ? (activePage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(activePage * itemsPerPage, filteredAndSortedEnquiries.length)} of {filteredAndSortedEnquiries.length} leads
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage(activePage - 1)}
              disabled={activePage === 1}
              className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              return (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => setCurrentPage(pNum)}
                  className={`px-3 py-1.5 border text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activePage === pNum
                      ? 'border-[#EE3A57] bg-[#EE3A57] text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage(activePage + 1)}
              disabled={activePage === totalPages}
              className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry Detail Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-left relative">

            {/* Header / Close */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Enquiry Details</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Divine Creations CRM Lead
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Status Update Dropdown */}
              <div className="bg-[#faf8f5]/80 rounded-xl p-4 space-y-2 border border-[#cca040]/15">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Pipeline Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => {
                    onUpdateEnquiryStatus(selectedEnquiry._id || selectedEnquiry.id, e.target.value);
                    setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value });
                  }}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none"
                >
                  <option value="Pending">Pending (Needs Call)</option>
                  <option value="Hold">On Hold</option>
                  <option value="Converted">Won / Converted</option>
                  <option value="Lost">Lost / Cancelled</option>
                </select>
              </div>

              {/* Details Body */}
              <div className="space-y-5 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Client Name</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedEnquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedEnquiry.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <span className="text-xs font-semibold text-slate-600 mt-0.5 block">{selectedEnquiry.email || 'N/A'}</span>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100" />

                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Subject / Product</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedEnquiry.subject}</span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Message / Specification Notes</span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100 mt-1">
                    {selectedEnquiry.message || 'No additional message provided.'}
                  </p>
                </div>

                {selectedEnquiry.image && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Attached Reference Image</span>
                    <a
                      href={selectedEnquiry.image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#cca040] font-bold hover:underline inline-flex items-center gap-1.5 block mt-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View full image in new tab
                    </a>
                    <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 shadow-xs max-h-64 bg-slate-50 flex items-center justify-center">
                      <img
                        src={selectedEnquiry.image}
                        alt="Client uploaded reference design"
                        className="max-h-64 max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="space-y-3 pt-6 border-t border-slate-100 mt-6">
              <a
                href={`https://wa.me/${(selectedEnquiry.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${selectedEnquiry.name}!%20We%20received%20your%20enquiry%20regarding%20"${selectedEnquiry.subject}"%20at%20Divine%20Creations.%20Our%20experts%20would%20like%20to%20discuss...`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#20bb5a] hover:bg-[#25d366] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
                </svg>
                Contact on WhatsApp
              </a>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-full py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Back to Enquiries
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
