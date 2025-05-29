---
title: Matplotlib基础及用法
author: UncleDon
createTime: 2024/07/25 13:55:28
permalink: /blog/blog/article/7fv4r4dm/
tags:
  - python
---
# matplotlib基础用法及简单设置

### 安装并导入matplotlib库

安装：

```shell
pip install matplotlib
```

如果安装失败可以尝试更换镜像源。

导入(表格)：库中还有其他模块可以导入，比如animation。

```python
import matplotlib.pyplot as plt
```

### 设置表格大小

这里的**width/height**单位皆为英寸（1英寸=100像素）。

```python
 fig = plt.figure(figsize=(width, height)
```

### 设置表格边距

边距设置范围为 0-1。

```python
plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
```
