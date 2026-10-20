import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getSessionHistory } from '../data/attendanceService';
import { HistoryList } from '../presentation/HistoryList';
import { useSessionHistory } from '../presentation/useSessionHistory';

vi.mock('../data/attendanceService', () => ({ getSessionHistory: vi.fn() }));

const Harness = () => {
  const { status, sessions, reload } = useSessionHistory('demo-student');
  return <HistoryList status={status} sessions={sessions} onRetry={reload} />;
};

describe('AttendanceHistory, estado de error', () => {
  beforeEach(() => {
    vi.mocked(getSessionHistory).mockReset();
  });

  it('muestra el mensaje de error y vuelve a pedir los datos al reintentar', async () => {
    const mock = vi.mocked(getSessionHistory);
    mock.mockRejectedValueOnce(new Error('SIMULATED_FAILURE')).mockResolvedValueOnce([]);

    render(<Harness />);
    expect(await screen.findByText('No se pudo cargar el historial')).toBeTruthy();

    fireEvent.click(screen.getByText('Reintentar'));
    await waitFor(() => expect(mock).toHaveBeenCalledTimes(2));
    expect(await screen.findByText('Todavía no hay sesiones registradas')).toBeTruthy();
  });
});