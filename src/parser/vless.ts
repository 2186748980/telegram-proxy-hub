import type { NodeInfo } from '../types';

export function parseVLESS(uri: string): NodeInfo | null {
  if (!uri.startsWith('vless://')) return null;
  return {
    name: 'VLESS',
    type: 'vless',
    raw: uri,
    supportedByTelegram: false
  };
}
