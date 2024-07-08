// import { webpackBundler } from '@vuepress/bundler-webpack'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import { plumeTheme } from 'vuepress-theme-plume'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  // build config
  dest: 'dist/blog',
  base: '/blog/',

  // 请不要忘记设置默认语言
  lang: 'zh-CN',
  theme: plumeTheme({
     profile: {
      name: 'UncleDon',
      description: '末流三本的渲染爱好者',
      avatar: '/blogger.png',
      circle: true, // 是否为圆形头像
    },
    notes: {
      dir: '/notes/', // 声明所有笔记的目录
      link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
      notes: [
        {
          dir: 'renderer', // 声明笔记的目录，相对于 `notes.dir`
          link: '/renderer/', // 声明笔记的链接前缀
          sidebar: [ // 配置侧边栏
            {
              text: '渲染',
              icon: 'mdi:language-typescript', // 侧边栏图标
              items: ['renderer'] // 简化写法，主题会自动补全为 `renderer.md`
            }
          ]
        },
        {
          dir: 'physics',
          link: '/physics/',
          sidebar: [
            { text: '物理', items: ['physics'] }
          ]
        }
      ]
    }, // Notes
    footer: {
        message: '<p>合作联系V：UncleDon-0829 \t\t Power by VuePress & vuepress-theme-plume Copyright © 2021-present pengzhanbo',
        copyright: 'ICP证：<a href="https://beian.miit.gov.cn/">苏ICP备2024059295号-1</a>'
    }, // Footer
    social: [
        {icon: 'github', link: 'https://github.com/DYYYYYYYF'},
        {icon: 'bilibili', link: 'https://space.bilibili.com/14004754'},
    ] // Social
  }),
  // bundler: webpackBundler(),
  bundler: viteBundler(),
})
