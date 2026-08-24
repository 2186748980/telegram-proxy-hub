export function decodeBase64Subscription(input: string): string {
  try {
    const cleaned = input.trim().replace(/\s+/g, '');
    return atob(cleaned);
  } catch {
    return input;
  }
}

export function detectSubscriptionFormat(content: string) {
  const text = content.trim();

  if (text.includes('proxies:') || text.includes('proxy-groups:')) {
    return 'clash';
  }

  if (text.startsWith('ss://') || text.startsWith('vmess://') || text.startsWith('vless://') || text.startsWith('trojan://')) {
    return 'uri';
  }

  return 'unknown';
}
