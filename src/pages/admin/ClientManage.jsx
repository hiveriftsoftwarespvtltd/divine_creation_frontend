import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ClientManage({ clients, onAddClient, onDeleteClient }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const openAddForm = () => {
    setName('');
    setLogoUrl('');
    setLogoFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      Swal.fire({ title: 'Client Name Required', text: 'Please specify the client name', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }
    if (!logoFile && !logoUrl.trim()) {
      Swal.fire({ title: 'Logo Required', text: 'Please upload a file or specify a logo image URL', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    if (logoFile) {
      formData.append('logo', logoFile);
    } else {
      formData.append('logo', logoUrl.trim());
    }

    onAddClient(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Clients Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Add, update, or remove client logos displayed in the 'Our Clients' section.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Client
        </button>
      </div>

      {/* Main Grid: Client Cards */}
      {clients.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 font-semibold text-xs shadow-xs">
          No clients found. Click 'Add New Client' to start!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {clients.map((client) => (
            <div
              key={client._id || client.id}
              className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between p-4 min-h-[160px]"
            >
              {/* Logo Area */}
              <div className="w-full flex-grow flex items-center justify-center p-2 relative bg-slate-50 rounded-xl overflow-hidden min-h-[100px]">
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-h-16 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Delete Button overlay */}
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Remove Client?',
                      text: `Are you sure you want to remove "${client.name}" from your clients?`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#cca040',
                      cancelButtonColor: '#ef4444',
                      confirmButtonText: 'Yes, remove them!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDeleteClient(client._id || client.id);
                      }
                    });
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/95 backdrop-blur-xs border border-red-50 hover:bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                  title="Remove Client"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Name Details */}
              <h4 className="text-slate-700 text-center text-[11px] font-bold mt-3 leading-tight tracking-wide border-t border-slate-50 pt-2 shrink-0">
                {client.name}
              </h4>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 text-left border border-slate-100">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-serif text-lg sm:text-xl font-black text-slate-900">Add New Client</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input: Client Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Border Security Force (BSF)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#cca040] focus:bg-white transition-all font-medium text-slate-800"
                />
              </div>

              {/* Upload choice 1: File upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Upload Logo Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setLogoFile(e.target.files[0]);
                    setLogoUrl(''); // reset text input if file selected
                  }}
                  className="w-full text-xs font-medium text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or specify URL</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Upload choice 2: Logo URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Logo Image URL</label>
                <input
                  type="url"
                  placeholder="http://example.com/logo.png"
                  disabled={!!logoFile}
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#cca040] focus:bg-white transition-all font-medium text-slate-800 disabled:opacity-50"
                />
              </div>

              {/* Actions row */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-[#cca040] hover:bg-[#bfa054] text-white shadow-xs transition-colors cursor-pointer"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
