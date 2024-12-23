import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { transactionId } = req.body;

  try {
    // Verify with MoonPay API
    const verification = await fetch(
      `https://api.moonpay.com/v4/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Api-Key ${process.env.MOONPAY_SECRET_KEY}`,
        },
      }
    );

    const transaction = await verification.json();

    if (transaction.status === 'completed') {
      // Send back to main app's callback
      await fetch(process.env.MAIN_APP_CALLBACK_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'completed',
          transactionId,
          // Add other necessary data
        }),
      });
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}