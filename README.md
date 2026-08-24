# Telegram Proxy Hub 2.0

一个以 Cloudflare Worker 为控制面、可选 Android/Termux 本地 Agent 为数据面的订阅管理项目。

## 设计原则

Cloudflare Worker **不运行 Xray/sing-box**，也不会把 VLESS/VMess/Trojan/Hysteria2/TUIC 伪装成 Telegram 原生代理。Worker 负责安全读取机场订阅、解析、去重、缓存、展示和导出；真正的协议转发由用户设备上的 sing-box/V2RayDAR/MTProxyAutoSwitch 等本地运行时完成。

这一区分是项目能否稳定工作的关键。

## 功能

- Cloudflare Workers 部署，无 VPS 要求
- `SUBSCRIPTION_URL` Secret 保存机场订阅
- Clash/Mihomo YAML、Base64、常见 share-link 输入
- VLESS / VMess / Trojan / SS / Hysteria2 / TUIC 等节点识别
- SOCKS5 / MTProto 原生 Telegram Deep Link
- `/api/subscription` 输出本地 Agent 可消费的 share-links
- `/api/config` 输出候选节点元数据
- Worker Cache，默认 10 分钟
- 手机优先网页
- `/api/refresh` 管理刷新
- 不把机场 token 写进 Git

## API

- `GET /` Web 控制台
- `GET /api/health` 健康检查
- `GET /api/nodes` 全部解析节点
- `GET /api/telegram` 仅原生 Telegram 节点
- `GET /api/subscription` Base64 编码的 share-links
- `GET /api/config` 给本地 Agent 的候选节点
- `GET /api/refresh` 清缓存并重新抓取；设置 `ADMIN_TOKEN` 后需要 `Authorization: Bearer ...`

## Cloudflare 配置

在 Worker → Settings → Variables and Secrets 添加 Secret：

`SUBSCRIPTION_URL`：机场订阅 URL。

可选：

`ADMIN_TOKEN`：刷新接口管理令牌。

普通变量：

`CACHE_TTL`：缓存秒数，默认 600。

## Cloudflare 部署

```bash
npm install
npx wrangler deploy
```

GitHub 集成时构建/部署命令使用：

```text
npx wrangler deploy
```

不要使用 `npm run build`，因为 Worker 由 Wrangler 完成打包。

## Android / Termux

Cloudflare Worker 本身不能执行 sing-box/Xray。因此，如果机场只有 VLESS、VMess、Trojan、Hysteria2 等协议，需要在 Android 上运行一个代理核心。

推荐的成熟路线是使用 V2RayDAR 或 sing-box：

1. Worker 提供 `/api/subscription`。
2. 本地 Agent 获取并验证节点。
3. Agent 使用 sing-box 实际连接节点。
4. Agent 暴露本机 SOCKS5，例如 `127.0.0.1:27910`。
5. Telegram 使用 SOCKS5。

V2RayDAR 已提供订阅抓取、解析、sing-box 主动验证、节点排序、持续 SOCKS5 和 Telegram 一键 SOCKS 链接等能力；其项目本身是 AGPL-3.0，请按其许可证使用。见：
https://github.com/411A/V2RayDAR

MTProxyAutoSwitch 提供 Telegram 专用的本地代理/自动选路以及 sing-box 订阅模式；其项目本身使用 GPL 系列许可证，请按其许可证使用。见：
https://github.com/pengvench/MTProxyAutoSwitch

subconverter-ng 提供成熟的多协议订阅解析/转换思路，支持 Clash.Meta、sing-box、Surge、Shadowrocket 等多种目标；其项目为 GPL-3.0-or-later。见：
https://github.com/Jungley8/subconverter-ng

本仓库没有复制这些项目的 GPL/AGPL 源代码；只采用公开项目验证过的架构思路，并通过 HTTP/API 与本地 Agent 解耦。

## 安全

绝对不要把真实机场 URL/token 写进：

- GitHub
- README
- `.env` 被提交的文件
- 前端 JavaScript
- 日志

如果订阅 token 曾经公开过，建议在机场后台重新生成。

## 限制

Telegram 原生客户端直接支持 SOCKS5/MTProto。VLESS、VMess、Trojan、Hysteria2、TUIC 等不能被 Worker 直接转换成“Telegram 原生代理”。需要本地代理核心实际运行这些协议，再向 Telegram 提供 SOCKS5/MTProto。

## License

本项目自己的代码建议采用 MIT。第三方项目保持各自原许可证，不作为本项目源码的一部分。
