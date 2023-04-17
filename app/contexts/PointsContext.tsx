import React, { useCallback } from 'react';

const initialTeams = {
  'Team 1': {
    color: 'bg-blue-500',
    points: 0,
  },
  'Team 2': {
    color: 'bg-red-500',
    points: 0,
  },
  'Team 3': {
    color: 'bg-yellow-500',
    points: 0,
  },
};

export type Teams = typeof initialTeams;

type PointsContextType = {
  teams: Teams;
  updatePoints: (team: keyof Teams, points: number) => void;
};

const PointsContext = React.createContext<PointsContextType | null>(null);

export function usePoints() {
  const context = React.useContext(PointsContext);
  if (!context) {
    throw new Error('useSharedData must be used within a SharedDataContextProvider');
  }
  return context;
}

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = React.useState(initialTeams);

  const updatePoints = useCallback((team: keyof typeof teams, points: number) => {
    setTeams((cp) => ({ ...cp, [team]: { ...cp[team], points: cp[team].points + points } }));
  }, []);

  const value = React.useMemo(() => {
    return { teams, updatePoints };
  }, [teams, updatePoints]);
  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
}
