'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApiMutation } from '@/hooks/api/secureapi';

// You can fix or adjust these lat/lng/radius values as per your needs or from props/context
const LAT = 12.959744;
const LNG = 77.6208384;
const RADIUS = 1500;

export default function Test() {
  const [shops, setShops] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending ,data} = useApiMutation({
    endpoint: "/geo/api/shops",
    onSuccess: (data: any) => {
      setShops(data);
      setError(null);
    },
    onError: (err: any) => {
        console.log(err,"soemtin werro")
      setError(err?.message || "Something went wrong");
      setShops(null);
    }
  });

  // Fetch on mount
useEffect(() => {
  const formData = new FormData();
  formData.append('lat', String(LAT));
  formData.append('lng', String(LNG));
  formData.append('radius', String(RADIUS));

  mutate({lat:LAT,lng:LNG});
}, [mutate]);

const handleRefetch = useCallback(() => {
  const formData = new FormData();
  formData.append('lat', String(LAT));
  formData.append('lng', String(LNG));
  formData.append('radius', String(RADIUS));

  mutate(formData);
}, [mutate]);

  return (
    <div>
      <button onClick={handleRefetch} disabled={isPending}>
        {isPending ? "Loading..." : "Refetch Shops"}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h1>Shop Data:</h1>
      {!shops && !error && !isPending && <p>No data yet.</p>}

      {shops && (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(shops, null, 2)}
        </pre>
      )}
    </div>
  );
}
