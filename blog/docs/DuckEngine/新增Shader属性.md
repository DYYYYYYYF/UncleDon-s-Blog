---
title: 新增Shader属性
author: UncleDon
createTime: 2024/07/09 22:56:42
permalink: /article/1eb66uk9/
tags:
  - DuckEngine
---
## 修改.scfg文件

Assets/Shaders目录下找到需要修改的Shader配置文件，新增对应参数。

#### 参数类型

| 名称      | 说明                             |
| --------- | -------------------------------- |
| attribute | Shader中通过location定位取值。   |
| uniform   | Shader中通过Uniform Buffer取值。 |

#### 值类型

| 名称    | 说明                            |
| ------- | ------------------------------- |
| float   | 浮点型。                        |
| vec2    | 二维向量。                      |
| vec3    | 三维向量。                      |
| vec4    | 四维向量。                      |
| mat4    | 4x4矩阵。                       |
| u8/i8   | 无/有符号char型。(8bit)         |
| u16/i16 | 无/有符号short型。(16bit)       |
| u32/i32 | 无/有符号int型。(32bit)         |
| samp    | 纹理贴图。（仅在uniform中生效） |

#### 作用域

| 名称 | 说明           |
| ---- | -------------- |
| 0    | global全局。   |
| 1    | instance实例。 |
| 2    | local本地。    |

##### 例：

1. attribute=vec3,in_position
2. uniform=mat4,0,projection

## CPP文件增加参数

#### Shader.hpp

struct MaterialShaderUniformLocations中增加对应参数，用于存放shader中location。

#### MaterialSystem.cpp

MaterialSystem::Initialize()：初始化location为INVALID_ID_U16。

MaterialSystem::AcquireFromConfig()：请求材质对应shader中location。

MaterialSystem::ApplyGlobal()：参数列表中新增对应类型参数并在对应材质中使用该值。（临时，后期需要修改应用方法）
