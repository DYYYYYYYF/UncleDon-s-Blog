---
title: CMake基础使用方法及常用函数
author: UncleDon
createTime: 2024/08/08 15:24:27
permalink: /article/lmwj3hou/
tags:
  - C++
  - CMake
---
## 基础框架
假设只有一个main.cpp文件，那么CMake工程仅需要三件事。

项目名称 + Cmake版本  + 资源文件

```cmake
project ("Demo")
cmake_minimum_required(VERSION 3.8)
add_executable (Demo "main.cpp")
```

**project(name)**：工程名称

**cmake_minimum_required(VERSION no.)**：最低支持的CMake版本

**add_executable(project_name source_files)**：生成可执行文件

**add_library(project_name source_files)**：生成静态库

## 常用函数
set(param_name param_value)：设置变量

**param_name：**

- CMAKE_CXX_STANDARD：CPP版本

- EXECUTABLE_OUTPUT_PATH：程序输出目录

**include_directories(include_path)**：头文件路径

**aux_source_directory(source_path)**：资源文件路径，可以理解为存放.cpp文件的路径

**link_directories(lib_path)**：静态库路径

**target_link_libraries(project_name lib_name)**：向指定工程添加静态库文件

**add_subdirectory(sub_project_name)**：添加子工程

**message()**：命令行输出，用于调试

## 常用内置宏
**${PROJECT_SOURCE_DIR}**：当前工程绝对路径

**${CMAKE_BUILD_TYPE}**：当前生成类型。例：Release、Debug

## 自定义变量
**设置**：set(CUSTOM_VALUE value)

**使用**：${CUSTOM_VALUE }

## 完整示例：

```cmake
#工程名称
project ("Demo")
#CMake最低适配版本
cmake_minimum_required(VERSION 3.8)
#CPP版本
set(CMAKE_CXX_STANDARD 20)

#头文件路径
include_directories(./include)
#源文件路径 别名SRC
aux_source_directory(./sources SRC)
#生成可执行文件
add_executable (Demo "main.cpp" ${SRC})

#输出生成类型以及当前工程路径
message(${CMAKE_BUILD_TYPE})
message(${PROJECT_SOURCE_DIR})

#自定义变量
set(CUSTOM_VALUE "Custom Value")
message(${CUSTOM_VALUE})
```

完整功能可以查看CMake官方：https://cmake.org/documentation 

作者：[快乐大鸭脖](https://www.bilibili.com/read/cv33274091/?spm_id_from=333.999.0.0 )     出处：bilibili
