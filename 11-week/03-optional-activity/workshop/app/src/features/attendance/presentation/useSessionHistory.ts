import { useCallback, useEffect, useState } from 'react';
import { getSessionHistory } from '../data/attendanceService';
import type { Session } from '../domain/Session';

export type HistoryStatus = 'loading' | 'ready' | 'empty' | 'error';

export function useSessionHistory(studentId: string) {
  const [status, setStatus] = useState<HistoryStatus>('loading');
  const [sessions, setSessions] = useState<Session[]>([]);

  const load = useCallback(async () => {
    try {
      const data = await getSessionHistory(studentId);
      setSessions(data);
      setStatus(data.length === 0 ? 'empty' : 'ready');
    } catch {
      setStatus('error');
    }
  }, [studentId]);

  const reload = useCallback(async () => {
    setStatus('loading');
    await load();
  }, [load]);

  useEffect(() => {
    void load();
  }, [load]);

  return { status, sessions, reload };
}