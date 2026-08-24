export interface Env {
  SUBSCRIPTION_URL?: string;
}

function telegramSocks(server: string, port: string, user = '', pass = '') {
  const params = new URLSearchParams({ server, port });
  if (user) params.set('user', user);
  if (pass) params.set('pass', pass);
  return `https://t.me/socks?${params.toString()}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, service: 'telegram-proxy-hub' });
    }

    if (url.pathname === '/api/nodes') {
      return Response.json({
        nodes: [],
        message: 'Parser module will populate nodes.'
      });
    }

    return new Response(`
      <html>
      <head><title>Telegram Proxy Hub</title></head>
      <body>
      <h1>Telegram Proxy Hub</h1>
      <p>Cloudflare Worker is running.</p>
      <p>Telegram links are generated only for real SOCKS5/MTProto nodes.</p>
      </body>
      </html>
    `, { headers: { 'content-type': 'text/html;charset=UTF-8' }});
  }
};
