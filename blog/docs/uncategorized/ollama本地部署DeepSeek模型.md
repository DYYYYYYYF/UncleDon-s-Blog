# 1.安装Ollama

进入**ollama**[官网](https://ollama.com/)下载客户端，会根据用户系统下载对应程序（官网不需要梯子，但是下载需要，因为本质上是从Github上Download下来）。

![dd240916a5f3ad27e6081319363093c](assets\Ollama_official_page.png)

**PS：**有个很烦人的事情，那就是Windows系统默认安装C盘并且无法修改，不过好在程序不大所以问题不大。

# 2.下载模型

安装好之后到ollama官网搜索DeepSeek，可以找到deepseek-r1模型。

![76deea4f66947095c85025923daf361](assets\Ollama_model_deepseek-r1.png)

在这里选择使用的模型版本，本人**RTX4060ti**跑32b还是有点吃力的，所以如果各位还请根据显卡算力量力而行，不然分析的时间是真的非常长。

# 3.运行模型

选择好版本之后，复制右侧的内容到命令行中回车运行即可。

![ac1791aa75759b75fcbbeedbb644754](assets\Ollama_deepseek-r1_cmd.png)

命令行可以通过**Win+R**键输入**cmd**唤出。

# 4. Ollama常用指令

| 指令           | 作用                                                   |
| -------------- | ------------------------------------------------------ |
| ollama list    | 查看本地已下载的模型。                                 |
| ollama run xxx | 运行xxx模型，模型名称可以复制**ollama list**中的名称。 |

