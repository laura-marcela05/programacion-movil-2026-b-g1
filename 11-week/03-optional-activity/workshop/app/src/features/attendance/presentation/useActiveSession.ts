import { useCallback, useEffect, useState } from 'react';
import { AttendanceApiError, getActiveSession, registerCheckIn } from '../data/attendanceService';
import type { ActiveSession } from '../domain/Session';

export type FormStatus = 'initializing' | 'initError' | 'noActiveSession' | 'active' | 'submitting';

export function useActiveSession(studentId: string) {
  const [status, setStatus] = useState<FormStatus>('initializing');
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [actionError, setActionError] = useState(false);
  const [conflict, setConflict] = useState(false);

  const load = useCallback(async () => {
    try {
      const found = await getActiveSession(studentId);
      setSession(found);
      setStatus(found ? 'active' : 'noActiveSession');
    } catch {
      setStatus('initError');
    }
  }, [studentId]);

  const reload = useCallback(async () => {
    setStatus('initializing');
    await load();
  }, [load]);

  useEffect(() => {
    void load();
  }, [load]);

  const checkIn = async () => {
    setActionError(false);
    setStatus('submitting');
    try {
      setSession(await registerCheckIn(studentId));
      setStatus('active');
    } catch (e) {
      if (e instanceof AttendanceApiError && e.status === 409) {
        setConflict(true);
        await reload();
      } else {
        setActionError(true);
        setStatus('noActiveSession');
      }
    }
  };

  return { status, session, actionError, conflict, closeConflict: () => setConflict(false), reload, checkIn };
}