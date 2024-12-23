import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { transactionId } = router.query;

  useEffect(() => {
    if (transactionId) {
      // Send success to main app
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
        }),
      });
    }
  }, [transactionId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Redirecting back to application...</p>
    </div>
  );
}