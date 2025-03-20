import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import next from "next";
import { PrismaClient, Plugin, Route } from "@prisma/client";
import { RequestHandler } from "next/dist/server/next";

const prisma = new PrismaClient();
const plugins: Map<string, Plugin> = new Map();
const handles: Map<string, RequestHandler> = new Map();

async function start() {
  await loadPlugins();
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl: UrlWithParsedQuery = parse(req.url as string, true);
    let matchingRoute = findMatchingRoute(plugins, parsedUrl);
    if (matchingRoute) {
      console.log("accessing plugin:", matchingRoute.name);
      const handle = handles.get(matchingRoute.name);
      handle!(req, res, parsedUrl);
    } else {
      console.log("accessing fallback to admin");
      const handle = handles.get("admin");
      handle!(req, res, parsedUrl);
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
  const appPrepareJobs: Promise<any>[] = [];
  (
    await prisma.plugin.findMany({
      include: {
        routes: true,
      },
    })
  ).forEach((plugin) => {
    const name = plugin.name.toLowerCase();
    plugins.set(name, plugin);
    const app = next({ dev: false, dir: `../plugins/${name}` });
    appPrepareJobs.push(app.prepare());
    const handle = app.getRequestHandler();
    handles.set(name, handle);
  });
  await Promise.all(appPrepareJobs);
}

function findMatchingRoute(
  plugins: Map<string, Plugin>, // 修改参数类型为 Map
  parsedUrl: UrlWithParsedQuery
): { name: string; route: Route } | null {
  // 遍历 Map 的 values
  for (const plugin of plugins.entries()) {
    // @ts-ignore
    for (const route of plugin[1].routes) {
      // 添加路径匹配逻辑增强
      if (
        route.path === parsedUrl.pathname ||
        parsedUrl.pathname?.startsWith(route.path + "/")
      ) {
        return {
          name: plugin[0],
          route: route,
        };
      }
    }
  }
  return null;
}

start();
