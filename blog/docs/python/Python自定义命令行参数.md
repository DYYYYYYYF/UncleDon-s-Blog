想要实现该功能需要使用到 argparse 库，通过库名也可以了解到该库是用来解析命令行数据的。

First，我们先编写一个最基础的框架出来。

```python
import argparse
parser = argparse.ArgumentParser()
args = parser.parse_args()
```

上面代码加入了三行，这些实际上并不会对运行有任何影响，它仅仅是实例化一个命令行解析器并解析命令行参数。然而此时我们还有没有添加任何可选参数，有且仅有 --help（-h） 参数可以使用。到此位置，你已经可以添加一个自定义命令行可选参数并且能够应付大多数情况。

Then，我们添加一个自定义的可选参数。

```python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--path', '-p')
args = parser.parse_args()
print(args)
```

这时我们添加了一个自定义可选参数 --path（-p），运行后可以发现能够顺利拿到传入的参数，并且可以通过 --help（-h）参数查看到自定义参数。

```shell
$ python .\ConsumeList.py --path ./test.txt
Namespace(path='./test.txt')
```

使用 --help（-h）参数查看：

```shell
$ python .\ConsumeList.py --h
usage: ConsumeList.py [-h] [--path PATH]

options:
  -h, --help            show this help message and exit
  --path PATH, -p PATH
```

接下来再介绍一些 add_argument() 中常用的参数： 

1. 通过type参数更改可选参数传入数据的类型。（默认为str）

```
parser.add_argument('--path', '-p', type=int)
```

2. 通过help为自定义参数添加描述信息，以便在使用 --help（-h）参数查看时快速了解该参数的意义。

```
parser.add_argument('--path', '-p', help='File path')
```

3. 通过default为自定义参数添加默认值。

```
parser.add_argument('--path', '-p', default='File path')
```


argparse库中还有其他许多小的细节以及功能，但是用到的个人感觉并不是很多，比方说action、choices等可以在Python的官方查看到具体的使用方法。

参考：argparse 教程 — [Python 3.12.2 文档](https://docs.python.org/zh-cn/3/howto/argparse.html )

