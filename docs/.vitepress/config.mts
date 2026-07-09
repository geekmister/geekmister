import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/geekmister/',
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
      message: "",
      copyright: '© 2026 Geekmister 版权所有 | <a href="https://beian.miit.gov.cn/" style="text-decoration: none;" target="_blank" rel="noreferrer noopener">粤ICP备2024321281号</a>',
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
