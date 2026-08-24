import type { NodeInfo } from '../types';

export function parseVMess(uri: string): NodeInfo | null {
  if (!uri.startsWith('vmess://')) return null;
  return {
    name: 'VMess',
    type: 'vmess',
    raw: uri,
    supportedByTelegram: false
  };
}
