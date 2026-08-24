import type { NodeInfo } from '../types';

export function parseTrojan(uri: string): NodeInfo | null {
  if (!uri.startsWith('trojan://')) return null;
  return {
    name: 'Trojan',
    type: 'trojan',
    raw: uri,
    supportedByTelegram: false
  };
}
