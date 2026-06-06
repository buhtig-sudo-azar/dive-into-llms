'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useProgressStore } from '@/store/progress-store';
import { useEffect } from 'react';

export default function Home() {
  const _hydrate = useProgressStore(s => s._hydrate);

  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

  return <AppShell />;
}
