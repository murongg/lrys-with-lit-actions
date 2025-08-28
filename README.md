
## 环境依赖

- Node.js 18+ 或 Bun

## 安装

```bash
# 安装依赖
bun install
# 或
npm install
```

## 环境配置

创建 `.env` 文件：

```env
PRIVATE_KEY=private key
```

## 使用方法

### 构建项目

```bash
bun run build
```

### 基础加密解密示例

```bash
bun run dev:simple
```

功能：
- 加密字符串 "Hello World"
- 输出密文和哈希值
- 解密数据并显示结果

### 加密并上传到去中心化存储

```bash
bun run dev:with-upload
```

功能：
- 加密数据
- 上传到 Irys 去中心化存储网络
- 从存储中下载数据
- 解密并验证数据完整性
