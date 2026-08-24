export function telegramMtproto(server: string, port: number, secret: string) {
  const params = new URLSearchParams({
    server,
    port: String(port),
    secret
  });

  return `https://t.me/proxy?${params.toString()}`;
}
