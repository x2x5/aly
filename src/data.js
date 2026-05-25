const topics = [
  {
    title: "Node.js 是什么",
    slides: [
      { content: "Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，让 JavaScript 可以在服务器端运行。" },
      { content: "特点：事件驱动、非阻塞 I/O、轻量高效，非常适合构建高性能的网络应用。" },
      { content: "应用场景：Web 服务器、API 服务、CLI 工具、实时通信应用等。" },
    ],
  },
  {
    title: "React 是什么",
    slides: [
      { content: "React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护。" },
      { content: "核心概念：组件化、虚拟 DOM、单向数据流、JSX 语法。" },
      { content: "React 采用声明式编程风格，让构建交互式 UI 变得更加简单和可预测。" },
      { content: "生态丰富：React Router、Redux、Next.js 等配套工具链完善。" },
    ],
  },
  {
    title: "Tailwind CSS",
    slides: [
      { content: "Tailwind CSS 是一个实用优先的 CSS 框架，通过组合原子化 class 来快速构建界面。" },
      { content: "优势：高度可定制、无需命名 CSS 类、内置响应式断点、暗色模式支持。" },
    ],
  },
  {
    title: "JavaScript 闭包",
    slides: [
      { content: "闭包是指函数能够记住并访问其词法作用域中的变量，即使该函数在其作用域之外执行。" },
      { content: "经典应用：数据私有化、柯里化、回调函数、防抖节流等。" },
    ],
  },
  {
    title: "Git 常用命令",
    slides: [
      { content: "git init / git clone / git add / git commit / git push — 基本工作流" },
      { content: "git branch / git checkout / git merge — 分支管理" },
      { content: "git rebase / git stash / git log / git diff — 进阶操作" },
    ],
  },
  {
    title: "HTTP 协议基础",
    slides: [
      { content: "HTTP 是超文本传输协议，基于请求-响应模型，无状态，运行在 TCP 之上。" },
      { content: "常见方法：GET（获取）、POST（创建）、PUT（更新）、DELETE（删除）。" },
      { content: "状态码分类：1xx 信息、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务器错误。" },
      { content: "HTTP/2 支持多路复用、头部压缩、服务器推送，显著提升性能。" },
      { content: "HTTPS = HTTP + SSL/TLS 加密，保证数据传输的安全性和完整性。" },
    ],
  },
]

export default topics
