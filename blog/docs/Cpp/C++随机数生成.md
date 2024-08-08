---
title: C++随机数生成
author: UncleDon
createTime: 2024/08/08 15:24:27
permalink: /article/xrbj66kp/
tags:
  - C++
  - random
---
## 摘要  

首先声明，C++生成随机数的方法有很多，但是在这里仅仅使用一种方式。第一次写专栏，就从一个简单但是用起来时很难想起来的功能做起。C++的随机数是一种伪随机，也就是说固定的种子（seed）一定会生成固定的目标值（target），这一点与函数如出一辙。

## 实现

**导入头文件 **:

```c++
#include <random>
```

**初始化种子:**

```c++
std::random_device m_seed;
```

这篇专栏中，我们使用最常见的一种随机数引擎mt19937（32bit），该引擎使用Mersenne Twister算法生成PRNG（伪随机数），库中还支持64bit随机数引擎mt19937_64。

**使用种子初始化随机数引擎**:

```c++
std::mt19937 m_mt19937 = std::mt19937(m_seed);
```

在这里如果使用的Windows可能存在报错——<font color=red>"generate"：不是"std::random_device"的成员'></font>。原因是VS的标准库中将该成员删除了，可以使用构造函数解决。

```c++
std::mt19937 m_mt19937 = std::mt19937(m_seed());
```

### 1. 均匀分布：

在均匀分布中，生成整数与实数的方法不同

**整数：**

```c++
int min = 0;
int max = 20;
std::uniform_int_distribution<int> distribution(min, max); 
```

**实数（这里使用的模版）：**

```c++
float fMin = 0.0f;
float fMax = 10.0f;
std::uniform_real_distribution<float> distribution(fMin, fMax);
```

### 2. 正态分布：

```c++
std::normal_distribution<> distribution(μ, standard_deviation)
```

当所有的准备都做好之后，就可以使用随机数引擎生成随机数了。

**生成：**

```c++
T random = static_cast<T>(distribution(m_mt19937));
```

**代码：**

```c++
#include <iostream>
#include <random>

int main()
{
	std::random_device m_seed;
	std::mt19937 m_mt19937 = std::mt19937(m_seed());

	int min = 0;
	int max = 20;
	//std::uniform_int_distribution<int> distribution(min, max);

	float fMin = 0.0f;
	float fMax = 10.0f;
	// std::uniform_real_distribution<float> distribution(fMin, fMax);

	float mean = 10.0f;
	float standard_deviation = 0.2f;
	 std::normal_distribution<> distribution(mean, standard_deviation);

	for (int i = 0; i < 10; i++) {
		float random = static_cast<float>(distribution(m_mt19937));
		std::cout << random << " ";
	}

	std::cout << std::endl;

	return 0;
}
```

作者：[快乐大鸭脖](https://www.bilibili.com/read/cv31060791/?spm_id_from=333.999.0.0)    出处：bilibili
