export interface NodeInfo {
  name: string;
  type: string;
  server?: string;
  port?: number;
  username?: string;
  password?: string;
  raw?: string;
  supportedByTelegram: boolean;
  telegramUrl?: string;
}
