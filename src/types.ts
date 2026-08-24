export type NodeType =
  | 'socks5'
  | 'mtproto'
  | 'ss'
  | 'vmess'
  | 'vless'
  | 'trojan'
  | 'hysteria2'
  | 'unknown';

export interface NodeInfo {
  name: string;
  type: NodeType;
  server?: string;
  port?: number;
  username?: string;
  password?: string;
  uuid?: string;
  raw?: string;
  supportedByTelegram: boolean;
  telegramUrl?: string;
}
