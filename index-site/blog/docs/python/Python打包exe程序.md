---
title: Python打包exe程序
author: UncleDon
createTime: 2025/04/11 09:17:09
permalink: /article/8d7t3sfs/
tags:
  - python
---

## 安装pyinstaller

官网：["https://pyinstaller.org/"]("https://pyinstaller.org/")

安装pyinstaller包。

```sh
pip install pyinstaller
```

验证版本。

```sh
pyinstaller --version
```

打包。

```
pyinstaller your_application.py
```

# 可选参数（常用）

| 参数                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| -D                     | 文件夹模式。在打包完成后生成一个文件夹，其中包含一个exe文件和一个包含若干依赖文件的文件夹（默认）。 |
| -F                     | 单文件模式。在打包完成后只会生成一个单独的exe文件。          |
| -p DIR<br />-paths DIR | 提供一个路径进行搜索并且导入里面的模块（不同的路径使用路径分隔符os.pathsep分隔开，或者多次使用这个参数）。 |
| -c                     | 打包程序运行后出现一个黑色的控制台窗口（默认）。             |
| -w                     | 打包程序运行后隐藏控制台窗口。                               |
| --uac-admin            | 启动打包后的程序时申请以管理员模式运行（仅Windows）。        |
| -i ICON_FILE           | 设置打包后程序的图标（只能.ico格式）。                       |
| --splash PNG_FILE      | 在程序启动加载时播放图片。                                   |

例: 

````sh
pyinstaller -w -i logo.ico -F application.py
````

## 关于pyi_splash

如果使用了**--splash **那么在代码的开头需要手动关闭启动显示界面。

```python
import pyi_splash      			# 编写时请忽视包不存在，pyinstaller打包时会自动把包写入到程序，不会报错
pyi_splash.update_text(text)	# 更新显示的文本
pyi_splash.close() 				#关闭界面
```

