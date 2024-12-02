import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { WatchlistItem } from '../../types/watchlist';

interface AddTradeModalProps {
  onClose: () => void;
  onAdd: (trade: WatchlistItem) => void;
}

export default function AddTradeModal({ onClose, onAdd }: AddTradeModalProps) {
  const [formData, setFormData] = useState({
    type: 'Cross-Sector',
    longName: '',
    longSector: '',
    shortName: '',
    shortSector: '',
    rationale: '',
    expectedReturn: '',
    riskScore: '',
    status: 'Watching'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trade: WatchlistItem = {
      id: Date.now().toString(),
      type: formData.type as WatchlistItem['type'],
      longPosition: {
        name: formData.longName,
        sector: formData.longSector
      },
      shortPosition: {
        name: formData.shortName,
        sector: formData.shortSector
      },
      rationale: formData.rationale,
      expectedReturn: parseFloat(formData.expectedReturn),
      riskScore: parseFloat(formData.riskScore),
      dateAdded: new Date().toISOString().split('T')[0],
      status: formData.status as WatchlistItem['status']
    };
    onAdd(trade);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
      <div className="modal-content p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold uppercase tracking-wider">Add New Trade</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Trade Type
              </label>
              <select
                className="input-field w-full"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="Cross-Sector">Cross-Sector</option>
                <option value="Cross-Sector-Constituent">Cross-Sector-Constituent</option>
                <option value="Intra-Sector">Intra-Sector</option>
              </select>
            </div>
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Status
              </label>
              <select
                className="input-field w-full"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="Watching">Watching</option>
                <option value="Ready">Ready</option>
                <option value="Hold">Hold</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Long Position Name
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.longName}
                onChange={(e) => setFormData({ ...formData, longName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Long Position Sector
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.longSector}
                onChange={(e) => setFormData({ ...formData, longSector: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Short Position Name
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Short Position Sector
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={formData.shortSector}
                onChange={(e) => setFormData({ ...formData, shortSector: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
              Trade Rationale
            </label>
            <textarea
              className="input-field w-full"
              rows={3}
              value={formData.rationale}
              onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Expected Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="input-field w-full"
                value={formData.expectedReturn}
                onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-wider text-gray-400 mb-1">
                Risk Score (1-10)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                className="input-field w-full"
                value={formData.riskScore}
                onChange={(e) => setFormData({ ...formData, riskScore: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-4 py-2"
            >
              Add Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}