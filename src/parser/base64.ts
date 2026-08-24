import { NodeInfo } from '../types';

export function parseBase64Subscription(text: string): NodeInfo[] {
  const nodes: NodeInfo[] = [];

  try {
    const decoded = atob(text.trim());
    for (const line of decoded.split(/\r?\n/)) {
      if (!line.includes('://')) continue;

      const protocol = line.split('://')[0];
      nodes.push({
        name: protocol + ' node',
        type: protocol,
        raw: line,
        supportedByTelegram: protocol.toLowerCase() === 'socks'
      });
    }
  } catch {}

  return nodes;
}
