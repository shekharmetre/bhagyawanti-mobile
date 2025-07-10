// app/(auth)/payment/success/page.tsx
import { Suspense } from 'react';
import PaymentPage from './payment-page';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment status...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
