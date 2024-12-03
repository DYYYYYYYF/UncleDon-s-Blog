---
title: SIMD（Single Instruction Multiply Data）
author: UncleDon
createTime: 2024/12/02 23:39:21
permalink: /article/0n2cenuw/
---
## AVX

### 定义：

| 类型                   | 定义                |
| ---------------------- | ------------------- |
| 单精度浮点数（float）  | \_\_m128 / __m256   |
| 双精度浮点数（double） | \_\_m128d / __m256d |
| 整数（int）            | \_\_m128i / __m256i |

> 对于常用的四维向量来说，常用的对照（列出来的不固定，可以根据需要自己进行甄别使用**128bit**或**256bit**）：

Vector(float * 4)：

```c++
alignas(16) __m128 data;
float x, y, z, w;
```

Vector(double * 4):

```c++
alignas(16) __m256d data;
double x, y, z, w;
```

### 指令：

注：整数类型需要AVX2才能够支持。

|                        | 加                                      | 减                                      | 乘                                          | 除            |
| ---------------------- | --------------------------------------- | --------------------------------------- | ------------------------------------------- | ------------- |
| 单精度浮点数（float）  | _mm256_add_ps                           | _mm256_sub_ps                           | _mm256_mul_ps                               | _mm256_div_ps |
| 双精度浮点数（double） | _mm256_add_pd                           | _mm256_sub_pd                           | _mm256_mul_pd                               | _mm256_div_pd |
| 整数（int）            | \_mm256_add_epi32` 或 `_mm256_add_epi64 | \_mm256_sub_epi32` 或 `_mm256_sub_epi64 | \_mm256_mullo_epi32` 或 `_mm256_mullo_epi64 |               |

**补充：**

| 名称                                                 | 作用                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| _mm_hadd_ps()                                        | 水平相加<br />假设有 Vec4(x, y,z,w)<br />则执行之后的结果为：[x + y, z + w]<br />执行两次后：[x + y + z + w] |
| _mm256_hadd_ps()                                     | 同上，用于256bit计算。                                       |
| _mm_set_ps(float a, float b,float c, float d)        | 创建一个\_\_128类型的值，传入四个浮点类型。(a, b, c, d)      |
| _mm_set1_ps(float a)                                 | 创建一个\_\_128类型的值，传入一个浮点类型。(a, a, a, a)      |
| _mm_load_ps(float* a)                                | 用于将 4 个 32 位浮点数从内存加载到 128 位（`__m128`）的 SIMD 寄存器中。 |
| _mm_shuffle_ps(\_\_m128 a, __m128 b, const int mask) | `a`：第一个输入寄存器（`__m128`）。<br />`b`：第二个输入寄存器（`__m128`）。如果你只想对一个寄存器进行 shuffle，可以传递相同的寄存器。<br />`mask`：一个掩码值，它指定了从 `a` 和 `b` 寄存器中选择哪些元素，以及它们如何被重新排列。掩码是一个 32 位整数，但只使用低 8 位，每 2 位指定一个浮点数的源索引。<br />**掩码解释：**<br />每个 2 位的组合表示一个元素的索引，取值范围是 `[0, 1, 2, 3]`。 |
| _mm_cvtss_f32(__m128 a)                              | 将a转换为float类型值。                                       |

## NEON

### 对照表

| AVX           | NEON        |
| ------------- | ----------- |
| __m128        | float32x4_t |
| __m256        | float32x8_t |
| __m128d       | float64x2_t |
| __m256d       | float64x4_t |
| _mm_add_ps    | vaddq_f32   |
| _mm_mul_ps    | vmulq_f32   |
| _mm256_set_pd | vld1q_f64   |
| _mm256_add_pd | vaddq_f64   |
| _mm256_mul_pd | vmulq_f64   |



## 检测CPU是否支持

### MSVC：

```c++
#if defined(_MSC_VER)
#include <intrin.h>  
inline void cpuid(int info[4], int function_id) {
	__cpuid(info, function_id);
}

inline bool is_sse_supported() {
	int info[4];
	cpuid(info, 1);
	return (info[3] & (1 << 25)) != 0;  // SSE bit
}

inline bool is_sse2_supported() {
	int info[4];
	cpuid(info, 1);
	return (info[3] & (1 << 26)) != 0;  // SSE2 bit
}

inline bool is_avx_supported() {
	int info[4];
	cpuid(info, 1);
	return (info[2] & (1 << 28)) != 0;  // AVX bit
}

inline bool is_avx2_supported() {
	int info[4];
	cpuid(info, 7);
	return (info[1] & (1 << 5)) != 0;  // AVX2 bit
}

#define SIMD_SUPPORTED_AVX		is_avx_supported()
#define SIMD_SUPPORTED_AVX2		is_avx2_supported()
#define SIMD_SUPPORTED_SSE		is_avx2_supported()
#define SIMD_SUPPORTED_SSE2		is_sse2_supported()
#endif
```

### MacOS（M1 arm芯片版本）：

``` 
#if defined(__AVX2__)
#define SIMD_SUPPORTED_AVX2
#elif defined(__SSE2__)
#define SIMD_SUPPORTED_SSE2
#elif defined(__SSE__)
#define SIMD_SUPPORTED_SSE
#elif defined(__AVX__)
#define SIMD_SUPPORTED_AVX
#elif defined(__ARM_NEON)
#define SIMD_SUPPORTED_NEON
#endif
```

## 