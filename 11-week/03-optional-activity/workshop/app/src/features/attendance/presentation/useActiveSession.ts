import { useCallback, useEffect, useState } from 'react';
import { AttendanceApiError, getActiveSession, registerCheckIn, registerCheckOut } from '../data/attendanceService';
import type { ActiveSession, MuscleGroup, Session } from '../domain/Session';

export type FormStatus = 'initializing' | 'initError' | 'noActiveSession' | 'active' | 'submitting' | 'checkoutForm' | 'closing' | 'completed';

export function useActiveSession(studentId: string) {
  const [status, setStatus] = useState<FormStatus>('initializing');
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [actionError, setActionError] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [selected, setSelected] = useState<MuscleGroup[]>([]);
  const [done, setDone] = useState<Session | null>(null);
  const [saved, setSaved] = useState(false);

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

  const openCheckout = () => {
    setActionError(false);
    setSelected([]);
    setStatus('checkoutForm');
  };

  const toggleGroup = (group: MuscleGroup) =>
    setSelected((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]));

  const cancelCheckout = () => {
    setSelected([]);
    setActionError(false);
    setStatus('active');
  };

  const submitCheckout = async () => {
    if (!session || selected.length === 0) return;
    setActionError(false);
    setStatus('closing');
    try {
      setDone(await registerCheckOut(session.id, selected));
      setSaved(true);
      setStatus('completed');
    } catch (e) {
      if (e instanceof AttendanceApiError && e.status === 409) {
        setConflict(true);
        await reload();
      } else {
        setActionError(true);
        setStatus('checkoutForm');
      }
    }
  };

  return {
    status, session, selected, done, saved, actionError, conflict,
    closeConflict: () => setConflict(false),
    closeSaved: () => setSaved(false),
    reload, checkIn, openCheckout, toggleGroup, cancelCheckout, submitCheckout,
  };
}