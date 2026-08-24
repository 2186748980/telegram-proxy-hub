export type NodeType = 'socks5'|'http'|'mtproto'|'ss'|'vmess'|'vless'|'trojan'|'hysteria2'|'tuic'|'wireguard'|'unknown';

export interface NodeInfo {
  id: string; name: string; type: NodeType; server: string; port: number;
  username?: string; password?: string; uuid?: string; cipher?: string; secret?: string;
  tls?: boolean; sni?: string; network?: string; path?: string; host?: string;
  raw?: Record<string, unknown>; telegramSupported: boolean; telegramUrl?: string;
}

export interface Env { SUBSCRIPTION_URL?: string; ADMIN_TOKEN?: string; CACHE_TTL?: string; }
