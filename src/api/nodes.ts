import type { NodeInfo } from '../types';

export function telegramOnly(nodes: NodeInfo[]): NodeInfo[] {
  return nodes.filter((node) => node.supportedByTelegram);
}

export function responseNodes(nodes: NodeInfo[]) {
  return {
    count: nodes.length,
    nodes
  };
}
