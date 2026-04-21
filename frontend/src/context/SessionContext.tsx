import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Profile, ResultsResponse } from '../types';

interface SessionState {
  profile: Profile | null;
  socioeconomicAnswers: Record<string, string>;
  testAnswers: Record<string, number>;
  results: ResultsResponse | null;
  setProfile: (profile: Profile) => void;
  setSocioeconomicAnswers: (answers: Record<string, string>) => void;
  setTestAnswers: (answers: Record<string, number>) => void;
  setResults: (results: ResultsResponse | null) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionState | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socioeconomicAnswers, setSocioeconomicAnswers] = useState<Record<string, string>>({});
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ResultsResponse | null>(null);

  const value = useMemo(
    () => ({
      profile,
      socioeconomicAnswers,
      testAnswers,
      results,
      setProfile,
      setSocioeconomicAnswers,
      setTestAnswers,
      setResults,
      resetSession: () => {
        setProfile(null);
        setSocioeconomicAnswers({});
        setTestAnswers({});
        setResults(null);
      }
    }),
    [profile, socioeconomicAnswers, testAnswers, results]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession debe usarse dentro de SessionProvider');
  return context;
}
