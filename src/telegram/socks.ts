export function createSocksLink(server: string, port: number, username = '', password = '') {
  const params = new URLSearchParams({
    server,
    port: String(port)
  });

  if (username) params.set('user', username);
  if (password) params.set('pass', password);

  return `https://t.me/socks?${params.toString()}`;
}
