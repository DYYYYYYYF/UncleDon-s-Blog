首先说明我崩溃的前提：

使用malloc开辟一段空间，并且该空间内存在std::vector<>成员变量，在push_back()时发生该错误（仅在Debug模式下会崩溃，因为Release模式下这段代码是跳过的）。

解决方案：

我这里仅仅开辟了一段空间并置0，并为调用构造。 

```c++
haderConfig* ResourceData = (ShaderConfig*)Memory::Allocate(sizeof(ShaderConfig),MemoryType::eMemory_Type_Resource);
// 必须有下面这一行来调用其构造函数
ResourceData = new(ResourceData)ShaderConfig();
```

作者：[快乐大鸭脖]( https://www.bilibili.com/read/cv34594049/?spm_id_from=333.999.0.0 )    出处：bilibili