# 计算机图形学面试题汇总(持续更新)

## 前言

面试的问题每个人都不相同，这里我只记录作者本人被问到过的相关图形学问题。在实际的面试过程中，各位需要结合自己的简历将简历中的各项技能以及各个项目加强复习，面试官主要还是以简历为主，除开基础的通用知识以外并不太会刻意刁难你（简历中没有出现的知识点）。

## 图形学

#### Q：PBR基础理论。

A: 

[理论 - LearnOpenGL CN (learnopengl-cn.github.io)](https://learnopengl-cn.github.io/07 PBR/01 Theory/#_1)

[光照 - LearnOpenGL CN (learnopengl-cn.github.io)](https://learnopengl-cn.github.io/07 PBR/02 Lighting/)

#### Q: 描述一下Blinn-Phong和Phong光照模型。

A:

**Blinn-Phong**：

该模型能够简单地描述物体表面对光的吸收和反射，使物体表面呈现出不同的明暗程度，但其不是最真实的一种反射光模型。

**引入该模型的原因：**它能够用尽量简单的数学原理尽可能解释物体表面呈现出不同颜色及明暗程序的原因。

**现实世界中的三种光照：**

- 「高光」：物体完全反射光源照射到表面的光照到人眼
- 「漫反射光」：物体朝着任意方向反射相同亮度的光照到人眼
- 「环境光」：物体表面完全背对光源，但其它物体反射光照照射到该物体表面上，再通过该物体反射光照到人眼

Bling-Phong 模型可以近似地模拟漫反射光照，但不完全准确。

**漫反射光**

漫反射光是物体表面向四面八方反射相同强度的能量，所以：无论从哪个视角看同一个点，都应该呈现出相同的颜色。

每一个着色点能接受的光能量：
$$
cos\theta=l\dot \quad n
$$
能量衰减：
$$
l^24\Pi I=r^24\Pi I^\prime =>I^2=\frac{I}{r^2}
$$
摄像机接收: 
$$
L_d=k_d(I/r^2) max(0, n\dot \quad l)
$$
$k_d$值为物体表面的漫反射系数，值越大能够反射的光能量越大（吸收的能量越多）。

**高光**

过计算反射光线向量$R$和视角$V$的接近程度来确定看到的高光强度，但是：在计算机中计算反射向量R的计算量非常大。所以，Blinn-Phong光照模型提出使用另一种计算方法：**半程向量**。

半程向量计算方式：
$$
h=v_0 + r_0
$$
比对法向量$n$和半程向量$h$的接近程度，用角度$α$表示：
$$
cosa=\frac{n\dot\quad h}{|n||h|} = n \dot \quad h
$$
由于$cosα∈[0,1]$可以表示物体表面该点反射的高光强度，所以我们可以得到计算高光的公式：
$$
L_s=K_s(\frac{I}{r^2})max(0,cosa)^p=K_s(\frac{I}{r^2})max(0, n\dot \quad h)^p
$$
依旧表示物体表面该点对光的吸收率，在计算机中用RGB值表示。

**环境光**

在 Blinn-Phong 模型中，举出了一个非常大胆的假设：物体表面接收到的各种环境光都是相同强度的。环境光与光源的角度无关，与观察角度也无关，所以它是一个常数。
$$
L_a=K_aI_a
$$
**两者区别：**

Blinn-Phong模型能够更好的表现高光效果，但是相对的计算量也变大了。

#### Q：已知入射角和法线，如何计算出反射向量？

A：

![img](https://i-blog.csdnimg.cn/blog_migrate/b01abff556616785fbfd904ee8648c37.png)
$$
R = 2P - I \\
P = I + S \\
S = \frac{-I \dot \quad N}{|N|^2} \dot \quad N\\
因为N为单位向量: S=-I\dot \quad N^2\\
R = 2I + 2S - I = I + 2S = I - 2I\dot \quad N^2
$$

#### Q：PBD是什么？

A：基于物理的模拟PBD（Position Based Dynamics）算法是一种用于模拟物体的物理行为和运动的算法。其核心思想是离散化物体的运动方程，将其分解为一系列迭代步骤，每一步都用来更新物体的位置和速度。这些迭代步骤可以模拟多种物理现象，包括弹性、碰撞、液体流动等。

#### Q：如何渲染字体？

A：引擎中支持Bitmap和System Font两种形式的字体，Bitmap实际上是一个位图，某一个区块的像素点能够代表一个有效信息，通过**.fnt**文件读取对应字体的偏移量获取信息；System Font使用**.ttf .ttc**格式的系统字体。

## Vulkan API

#### Q：在Vulkan中有哪几种同步机制？

A：

Fence：用于同步渲染队列与CPU之间的同步，有**signaled**和**unsignaled**两种状态。

Semaphore：用于渲染队列每次提交的一批命令之间的同步，与Fence一样有**signaled**和**unsignaled**两种状态。

Fence用于阻塞CPU知道Queue中的命令执行结束（GPU与CPU之间的同步），Semaphore用于不同命令提交之间的同步（GPU与GPU之间的同步）。

#### Q：DX中没有Subpass的概念，那么Vulkan中Subpass有什么作用？有哪些特别之处？

A：

## C/C++基础

#### Q：malloc是一次系统调用吗？

A：不是。实际上malloc只是一个库函数，底层调用mmap()系统调用或brk()系统调用。
