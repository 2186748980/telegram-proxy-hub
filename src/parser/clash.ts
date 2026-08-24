import { NodeInfo } from '../types';

export function parseClash(text: string): NodeInfo[] {
  const nodes: NodeInfo[] = [];

  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (match) {
      nodes.push({
        name: match[1].trim(),
        type: 'unknown',
        supportedByTelegram: false
      });
    }
  }

  return nodes;
}
