# Telegram Proxy Hub

Cloudflare Workers based Telegram proxy helper.

## Features

- Cloudflare Worker only
- Airport subscription stored in Worker Secret
- Parse subscription data
- Generate Telegram Deep Links only for supported protocols
- Mobile friendly UI

## Important

Telegram native proxy supports SOCKS5 and MTProto.

This project does NOT convert VLESS/VMess/Trojan/Hysteria2 into fake Telegram proxies.

## Deploy

```bash
npm install
wrangler secret put SUBSCRIPTION_URL
wrangler deploy
```
