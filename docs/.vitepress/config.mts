import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "极客先生",
  description: "个人博客，记录学习和生活的点滴",
  locales: {
    root: {
      label: "中文",
      lang: "zh-cn",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "程序员漫画", link: "/programmer-comics" },
      {
        text: "人工智能",
        items: [
          {
            text: "技术教程",
            link: "/artificial-intelligence/technical-tutorial/index",
          },
          { text: "热点新闻", link: "/artificial-intelligence/hot-news" },
        ],
      },
      { text: "博客", link: "/zh-cn/blog" },
    ],
    sidebar: {
      "/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      "/programmer-comics": { text: "程序员漫画", link: "/programmer-comics" },
      "/artificial-intelligence/technical-tutorial/index": [
        {
          text: "技术教程",
          items: [
            {
              text: "Google机器学习",
              link: "/artificial-intelligence/technical-tutorial/google-machine-learning/index",
            },
          ],
        },
      ],
      "/artificial-intelligence/technical-tutorial/google-machine-learning/index":
        [
          {
            text: "Google机器学习",
            items: [
              {
                text: "基础篇",
                items: [
                  {
                    text: "机器学习简介",
                    link: "/artificial-intelligence/technical-tutorial/google-machine-learning/introduction-to-machine-learning",
                  },
                ],
              },
            ],
          },
        ],
    },
    footer: {
      message: `
        <div style="display:flex;align-items:center;gap:16px;justify-content:center;flex-wrap:wrap;">
          <img src="/wechat-official-account-qrcode.jpg" alt="扫码关注公众号" width="132" />
          <div style="min-width:180px;line-height:1.6;">
            <strong>关注公众号</strong><br />
            扫码获取最新学习资源和更新。
          </div>
        </div>
      `,
      copyright: "© 2026 Geekmister",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
