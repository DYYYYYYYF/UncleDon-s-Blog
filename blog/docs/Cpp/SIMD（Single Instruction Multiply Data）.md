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

|                        | 加                                      | 减                                      | 乘                                          | 除            |
| ---------------------- | --------------------------------------- | --------------------------------------- | ------------------------------------------- | ------------- |
| 单精度浮点数（float）  | _mm256_add_ps                           | _mm256_sub_ps                           | _mm256_mul_ps                               | _mm256_div_ps |
| 双精度浮点数（double） | _mm256_add_pd                           | _mm256_sub_pd                           | _mm256_mul_pd                               | _mm256_div_pd |
| 整数（int）            | \_mm256_add_epi32` 或 `_mm256_add_epi64 | \_mm256_sub_epi32` 或 `_mm256_sub_epi64 | \_mm256_mullo_epi32` 或 `_mm256_mullo_epi64 |               |

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