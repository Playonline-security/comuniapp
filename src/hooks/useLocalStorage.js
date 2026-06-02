import { useCallback, useState } from 'react';
import { loadState, saveState } from '../services/storage';

export function useLocalStorage() {
  const [state, setState] = useState(() => loadState());

  const persist = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  return [state, persist];
}
