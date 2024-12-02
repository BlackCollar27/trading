import React, { useState } from 'react';
import { Eye, Plus, Filter } from 'lucide-react';
import WatchListItem from './WatchListItem';
import AddTradeModal from './AddTradeModal';
import type { WatchlistItem } from '../../types/watchlist';

export default function WatchList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: '1',
      type: 'Cross-Sector',
      longPosition: {
        name: 'Technology ETF',
        sector: 'Technology'
      },
      shortPosition: {
        name: 'Utilities ETF',
        sector: 'Utilities'
      },
      rationale: 'Tech sector showing strength vs defensive utilities',
      expectedReturn: 8.5,
      riskScore: 3.2,
      dateAdded: '2024-03-15',
      status: 'Watching'
    }
  ]);

  const addToWatchlist = (trade: WatchlistItem) => {
    setWatchlist([...watchlist, trade]);
    setIsAddModalOpen(false);
  };

  const filteredList = filter === 'all' 
    ? watchlist 
    : watchlist.filter(item => item.status === filter);

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Eye className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Watch List</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="input-field text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Trades</option>
              <option value="Watching">Watching</option>
              <option value="Ready">Ready</option>
              <option value="Hold">Hold</option>
            </select>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2"
          >
            <Plus className="w-4 h-4" />
            Add Trade
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredList.map((item) => (
          <WatchListItem key={item.id} item={item} />
        ))}
      </div>

      {isAddModalOpen && (
        <AddTradeModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addToWatchlist}
        />
      )}
    </div>
  );
}