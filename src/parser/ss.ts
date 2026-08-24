import type { NodeInfo } from '../types';

export function parseSS(uri: string): NodeInfo | null {
  if (!uri.startsWith('ss://')) return null;
  return {
    name: 'Shadowsocks',
    type: 'ss',
    raw: uri,
    supportedByTelegram: false
  };
}
