---
title: VisualStudio修改文件编码
author: UncleDon
createTime: 2024/11/04 10:32:29
permalink: /article/slqb42am/
tags:
  - Utils
---
查看文件中有没有高级保存选项。

![微信图片_20241104095304](./assets/VS_File_AdvanceSave.png)

如果存在**高级保存选项**但是图标为灰色，则点击需要更改的文件后再查看。如果没有这个选项栏则继续。

打开工具->自定义：

![微信图片_20241104095331](./assets/VS_Tools_Custom.png)

在自定义模块->命令中，选择菜单栏中的文件后单机添加命令。

在添加命令窗口中，将类别切换为文件，在命令中寻找高级保存选项后保存。

![微信图片_20241104095433](./assets/VS_Tools_Custom_window.png)

做完之后再操作第一步就可以看到了。
