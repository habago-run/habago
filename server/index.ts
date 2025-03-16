import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import next from "next";
import { PrismaClient, Plugin, Route } from "@prisma/client";
import httpProxy from "http-proxy";

const app = next({ dev: false, dir: "../admin" });
const handle = app.getRequestHandler();
const proxy = httpProxy.createProxyServer();
const prisma = new PrismaClient();
let plugins: Plugin[] = [];

async function start() {
  await loadPlugins();
  await app.prepare();
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl: UrlWithParsedQuery = parse(req.url as string, true);
    console.log("access received:", parsedUrl.pathname);

    const proxyHistory = req.headers["x-proxy-history"];
    let matchingRoute = proxyHistory
      ? null
      : findMatchingRoute(plugins, parsedUrl);
    if (matchingRoute) {
      // 找到匹配的 route，转发请求到 plugin 提供的 server
      const target = `http://${matchingRoute.server}`;
      // 检查请求头中是否已经包含当前要代理的服务器地址
      const proxyHistory = req.headers["x-proxy-history"] as string | undefined;
      if (proxyHistory && proxyHistory.includes(matchingRoute.server)) {
        console.error("Circular proxy detected:", matchingRoute.server);
        res.statusCode = 500;
        res.end("Circular proxy detected");
      } else {
        // 更新请求头中的代理历史记录
        const newProxyHistory = proxyHistory
          ? `${proxyHistory},${matchingRoute.server}`
          : matchingRoute.server;
        req.headers["x-proxy-history"] = newProxyHistory;

        proxy.web(req, res, { target }, (err: Error) => {
          console.error("Proxy error:", err);
          res.statusCode = 500;
          res.end("Proxy error");
        });
      }
    } else {
      // 没有找到匹配的 route，使用 handle 处理请求
      handle(req, res, parsedUrl);
    }
  })
    .on("error", (err: Error) => {
      console.error("server error:", err.message);
      process.exit(1);
    })
    .listen(3001, () => {
      console.log("server started on http://localhost:3001");
    });
}

async function loadPlugins() {
  plugins = await prisma.plugin.findMany({
    include: {
      routes: true,
    },
  });
  console.log("loaded plugins:", plugins);
}

function findMatchingRoute(
  plugins: Plugin[],
  parsedUrl: UrlWithParsedQuery
): { server: string; route: Route } | null {
  for (const plugin of plugins) {
    // @ts-ignore
    for (const route of plugin.routes) {
      if (route.path === parsedUrl.pathname) {
        return {
          server: plugin.server,
          route: route,
        };
      }
    }
  }
  return null;
}

start();
