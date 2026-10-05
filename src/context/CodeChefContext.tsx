import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GOKUL_PROFILE } from '../data/gokulData';
import { CodeChefLiveStats } from '../types';
import { fetchWithTimeout } from '../services/api';

interface CodeChefContextType {
  stats: CodeChefLiveStats;
  isSyncing: boolean;
  lastSyncedFormatted: string;
  refreshStats: () => Promise<void>;
}

const defaultStats: CodeChefLiveStats = {
  username: GOKUL_PROFILE.codechefStats.username,
  problemsSolved: GOKUL_PROFILE.codechefStats.problemsSolved,
  problemsSolvedNumber: parseInt(GOKUL_PROFILE.codechefStats.problemsSolved, 10) || 3482,
  rating: GOKUL_PROFILE.codechefStats.rating,
  highestRating: GOKUL_PROFILE.codechefStats.highestRating,
  stars: GOKUL_PROFILE.codechefStats.stars,
  division: GOKUL_PROFILE.codechefStats.division,
  globalRank: GOKUL_PROFILE.codechefStats.globalRank,
  countryRank: GOKUL_PROFILE.codechefStats.countryRank,
  dsaRating: GOKUL_PROFILE.codechefStats.dsaRating,
  dsaHighestRating: GOKUL_PROFILE.codechefStats.dsaHighestRating,
  dsaGlobalRank: GOKUL_PROFILE.codechefStats.dsaGlobalRank,
  dsaCountryRank: GOKUL_PROFILE.codechefStats.dsaCountryRank,
  league: GOKUL_PROFILE.codechefStats.league || 'Diamond League',
  profileUrl: GOKUL_PROFILE.codechefStats.profileUrl,
  lastSyncedAt: new Date().toISOString(),
  source: 'live'
};

const CodeChefContext = createContext<CodeChefContextType>({
  stats: defaultStats,
  isSyncing: false,
  lastSyncedFormatted: 'Just now',
  refreshStats: async () => {}
});

export const CodeChefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<CodeChefLiveStats>(defaultStats);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date>(new Date());

  const fetchLiveStats = useCallback(async (isManual = false) => {
    try {
      setIsSyncing(true);
      const url = isManual ? '/api/codechef-stats?refresh=true' : '/api/codechef-stats';
      const data = await fetchWithTimeout<any>(url, { timeoutMs: 7000 });
      if (data && (data.problemsSolved || data.rating || data.dsaRating)) {
        setStats(prev => ({
          ...prev,
          ...data,
          rating: typeof data.rating === 'number' ? data.rating : (parseInt(data.rating, 10) || prev.rating),
          highestRating: typeof data.highestRating === 'number' ? data.highestRating : (parseInt(data.highestRating, 10) || prev.highestRating),
          dsaRating: typeof data.dsaRating === 'number' ? data.dsaRating : (parseInt(data.dsaRating, 10) || prev.dsaRating),
          dsaHighestRating: typeof data.dsaHighestRating === 'number' ? data.dsaHighestRating : (parseInt(data.dsaHighestRating, 10) || prev.dsaHighestRating),
          globalRank: String(data.globalRank || prev.globalRank),
          countryRank: String(data.countryRank || prev.countryRank),
          dsaGlobalRank: String(data.dsaGlobalRank || prev.dsaGlobalRank),
          dsaCountryRank: String(data.dsaCountryRank || prev.dsaCountryRank),
          problemsSolved: String(data.problemsSolved || prev.problemsSolved),
          problemsSolvedNumber: Number(data.problemsSolvedNumber || data.problemsSolved || prev.problemsSolvedNumber),
          stars: data.stars || prev.stars,
          division: data.division || prev.division,
          league: data.league || prev.league,
          lastSyncedAt: data.lastSyncedAt || new Date().toISOString(),
          source: data.source || 'live'
        }));
        setLastSyncedTime(new Date());
      }
    } catch (err) {
      console.warn('Could not sync live CodeChef stats, using current cache:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchLiveStats(false);

    // Poll periodically every 60 seconds for live updates
    const interval = setInterval(() => {
      fetchLiveStats(false);
    }, 60000);

    // Also re-sync when tab gains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveStats(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchLiveStats]);

  const refreshStats = useCallback(async () => {
    await fetchLiveStats(true);
  }, [fetchLiveStats]);

  const lastSyncedFormatted = `Synced ${lastSyncedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

  return (
    <CodeChefContext.Provider value={{ stats, isSyncing, lastSyncedFormatted, refreshStats }}>
      {children}
    </CodeChefContext.Provider>
  );
};

export const useCodeChef = () => useContext(CodeChefContext);
