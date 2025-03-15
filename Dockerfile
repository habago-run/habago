FROM node:22-alpine

# 设置工作目录
WORKDIR /app
# 复制项目文件
COPY . .
# 安装 pnpm
RUN npm install -g pnpm
# 安装依赖
RUN pnpm install --frozen-lockfile
# 构建项目
RUN pnpm build
# 暴露端口
EXPOSE 3001

# 启动项目
CMD ["pnpm", "start"]