import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { contractId, amount, engagementId, callbackUrl } = router.query;

  useEffect(() => {
    if (contractId && amount) {
      const script = document.createElement('script');
      script.src = 'https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js';
      script.async = true;

      script.onload = () => {
        const moonpaySdk = (window as any).MoonPayWebSdk.init({
          flow: "buy",
          environment: "sandbox",
          variant: "overlay",
          params: {
            apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY,
            baseCurrencyCode: "eth", // for testing
            baseCurrencyAmount: amount,
            walletAddress: contractId,
            quoteCurrencyCode: "usd",
            lockAmount: "true",
            lockWalletAddress: "true",
            redirectURL: '/success'
          }
        });

        moonpaySdk.show();
      };

      document.body.appendChild(script);
    }
  }, [contractId, amount]);

  return (
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
}