import { useCallback, useEffect, useState } from 'react';
import { AttendanceApiError, getSessionDetail } from '../data/attendanceService';
import type { Session } from '../domain/Session';

export type DetailStatus = 'loading' | 'ready' | 'notFound' | 'error';

export function useSessionDetail(studentId: string, sessionId: string) {
  const [status, setStatus] = useState<DetailStatus>('loading');
  const [session, setSession] = useState<Session | null>(null);

  const load = useCallback(async () => {
    try {
      setSession(await getSessionDetail(studentId, sessionId));
      setStatus('ready');
    } catch (e) {
      setStatus(e instanceof AttendanceApiError && e.status === 404 ? 'notFound' : 'error');
    }
  }, [studentId, sessionId]);

  const reload = useCallback(async () => {
    setStatus('loading');
    await load();
  }, [load]);

  useEffect(() => {
    void load();
  }, [load]);

  return { status, session, reload };
}