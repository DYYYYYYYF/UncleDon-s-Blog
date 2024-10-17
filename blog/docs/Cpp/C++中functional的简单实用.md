std::function包含于头文件functional中，属于C11的新特性。个人主要用于注册回调函数。

基础使用：

```C++
#include <functional>
 
int main(){
	std::function<void()> Func = func;
	Func();
}
```

无参函数：使用std::bind绑定参数。

```c++
#include <functional>

int main(){
	std::function<void()> Func = func;
	Func();
}
```

带参函数：

使用std::bind绑定参数。

```C++
void Add(int a, int b){
	std::cout << a + b << std::endl;
}

int main(){
	std::function<int(int a, int b)> Func = std::bind(Add, 1, 2);
	int res = Func()
} 
```

使用时发现上述方式无法绑定类函数。

以下为绑定类内函数方式：

```C++
class Test{
public:
  	void A(){
		std::cout << a + b << std::endl;
	}

   	void BindFunc(){
  		std::function<void())> Func = std::bind(&Test::A, this);
        Func();
   	}
}

int main(int arg, char* argv[]) {
    Test* T = new Test();
	std::function<void())> Func = std::bind(&Test::A, T);
    Func();
}
```

