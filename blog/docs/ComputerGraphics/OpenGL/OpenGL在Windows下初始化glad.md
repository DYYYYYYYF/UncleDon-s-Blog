---
title: OpenGL在Windows下初始化glad
author: UncleDon
createTime: 2024/10/17 11:29:42
permalink: /article/o5b4zfcx/
tags:
  - Computer Graphics
  - OpenGL
---
网上查了很多资料，99%都是使用glfw来简化窗口创建的过程。但是我自己在开发的想使用Window窗口句柄创建基于平台的窗口时，没有找到初始化OpenGL接口的函数。

glfw：

```C++
if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)){	
    std::cout << Failed to initialize GLAD << std::endl;			
    return -1;	
}
```

直接使用glad加载：

```
if (!gladLoadGL()) {		
	std::cout << Failed to initialize GLAD << std::endl;			
	return -1;	
}
```

