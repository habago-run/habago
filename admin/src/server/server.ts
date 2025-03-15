import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const app = next({ dev: false });
const handle = app.getRequestHandler();

// 在这里可以添加服务器启动前的操作
console.log('准备启动服务器...', process.env.NODE_ENV);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url as string, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log('> 服务器已启动，监听端口 3000');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});