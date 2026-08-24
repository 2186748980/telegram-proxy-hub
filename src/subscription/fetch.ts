export interface Env {
  SUBSCRIPTION_URL?: string;
}

export async function fetchSubscription(env: Env): Promise<string> {
  if (!env.SUBSCRIPTION_URL) {
    throw new Error('SUBSCRIPTION_URL is missing');
  }

  const response = await fetch(env.SUBSCRIPTION_URL, {
    headers: {
      'User-Agent': 'Telegram-Proxy-Hub/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`subscription request failed: ${response.status}`);
  }

  return await response.text();
}
