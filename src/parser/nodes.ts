import type { NodeInfo } from '../types';

export function emptyNode(name: string, type: NodeInfo['type']): NodeInfo {
  return {
    name,
    type,
    supportedByTelegram: false
  };
}

export function telegramSupported(node: NodeInfo): boolean {
  return node.type === 'socks5' || node.type === 'mtproto';
}
