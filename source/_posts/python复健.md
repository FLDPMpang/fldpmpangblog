---
title: python:快速复健指南
categories: 编程语言
tags:
  - python
abbrlink: 60541
date: 2020-10-10 11:45:35
---

好久没用python了,都忘光了
从  **[Python程序设计基础](https://book.douban.com/subject/30459800/)**
第二章开始,记录已经遗忘和不知道的知识

## 输入,处理与输出
### 输出选项
在`print( )`中

使用`sep=' '`改变输出项之间的输出额外内容(默认为一个空格)

使用`'end=' '`改变输出末尾输出的额外内容(默认为一个'\n')

### 格式输出
使用`format(str,格式控制字符串)`
```python
'd' 
'e'     '.2E'
',f'    ',.3f'
'12,.4f'   #右对齐
```

## 循环结构
生成排列列表 `range(起始,最终,步长)`

## 函数
混合使用位置参数和关键字参数时,位置参数必须先出现


### 返回多值
```python
def f(sb):
    return sb1,sb2,sb3;

wdnmd1,wdnmd2,wdnmd3=f(sb);
```

## 额外的库

### random
![2020-10-10 16.19.44 blog.csdn.net 9562c2563c54.png](https://i.loli.net/2020/10/10/XoZrn3AtU4kupLO.png)

### math
定义了 `pi` 和 `e`
**[数学函数](https://docs.python.org/zh-cn/3.9/library/math.html)**
### os

|函数|功能|
|-----|-----|
|os.listdir()	|列出当前目录下的所有文件和文件夹（包括被隐藏的）|
|os.system()	|运行shell命令|
|os.getcwd()	|获取当前路径(中间会自动添上一个路径分隔符)|
|os.walk	|遍历目录，返回tuple表，表中每一个tuple包含该层文件文件夹及该层父节点|
|os.path.dirname()	|获取指定目录的父目录路径|
|os.pardir()	|获取当前目录的父目录路径|
|os.remove()	|删除指定文件|
|os.rename()    |重命名|
|os.rmdir()	|删除空文件夹|
|os.mkdir()	|新建文件夹|
|os.chdir()	|改变当前目录到指定目录中|
|os.rename(path1 ,path2)	|重命名文件|
|os.chmod(path ,mode)	|改变文件权限模式|
|os.access(path ,mode)	|检验文件权限模式|



## 文件和异常
```python
file_pr=open('file_name',mode)  #'r','w','a' 只读,写入,追加

file_pr=open(r'file_address',mode)  #加r防止被当成'/'转义
```

`file_pr`为文件对象名

```python
file_pr.write(str);
file_pr.close()    
file_pr.read()              #返回一个字符串列表(每行)
file_pr.readline()          #读一行
file_pr.writeline()         #写一行
str=str.rstrip('\n');       #删除最后的换行符

```

### 异常
```python
try:
    do()
except SomeError:
    do()
except SomeError as string : #string为错误的默认信息
    do()
except : #all error
    do()
else: #没出错的工作
    do()
finally: #最后的清理工作(出没出错都要干)

```

|异常类型|描述|
|---|---|
|KeyboardInterrupt	|用户中断执行(通常是输入^C)|
|StopIteration	|迭代器没有更多的值|
|FloatingPointError	|浮点计算错误|
|OverflowError	|数值运算超出最大限制|
|ZeroDivisionError	|除(或取模)零|
|AssertionError	|断言语句失败|
|IOError	|输入/输出操作失败|
|IndexError	|序列中没有此索引|
|KeyError	|映射中没有这个键|
|NameError	|未声明/初始化对象 (没有属性)|
|UnboundLocalError	|访问未初始化的本地变量|
|SyntaxError	|Python 语法错误|
|TypeError	|对类型无效的操作|
|ValueError	|传入无效的参数|

## 列表和元组
`列表=list(迭代器)`

使用`+`可连接两个列表,`*`可重复列表并链接

列表(字符串)切片`s2=s1[start,end]`

|列表方法和函数|介绍|
|---|---|
|s.append(item)|添加到末尾|
|s.index(item)|查找第一个item|
|s.insert(idex,item)|从index插入|
|s.sort()|排序|
|s.remove(item)|移除第一个item元素|
|s.reverse()|反转列表|
|del(item) |删除item出的元素|


### 列表元组相互转换
```python
列表=list(元组)
元组=tuple(列表)
```

## 字符串

### 字符串迭代
```python
for value in str:
    sth...
```

### 字符串方法
|函数|介绍|
|----|----|
|`in` , `not in ` | 测试字符串|
|capitalize()|将字符串的第一个字符转换为大写|
|count(str, begin= 0,end=len(string))|返回指定范围内 str 出现的次数|
|find(str, beg=0, end=len(string))|查找str 是否包含在字符串中，返回开始的索引值，否则返回-1|
|rfind(str, beg=0,end=len(string))|从右开始查找|	
|isalnum()|所有字符都是字母或数字|
|isalpha()|所有字符都是字母或中文字|
|isdigit()|如果只有数字|
|isspace()|如果字符串中只包含空白|
|lower()|转换字符串中所有大写字符为小写|
|upper()|转换字符串中的小写字母为大写|
|lstrip()|截掉字符串左边的空格或指定字符|
|replace(old, new)|将字符串中的old替换成new|
|strip(char)|删除前面和尾部的字符char|
|endawith(),startswith()|检测是否以字符串开头和结尾|
|split()|分割字符串,返回列表|


## 字典和集合

### 字典 (映射)

|字典方法|介绍|
|---|---|
|clear()|清空字典|
|get()|获取对应键的值,不会抛出异常|
|items()|返回将键和值组成的元组|
|keys()|返回键组成的元组|
|values()|返回值组成的元组|
|pop()|将键的键值删除|


### 集合

```python
s=set()     #建立
s.add()     #添加
s.len()     #求数量
s.remove()  #删除
s.clear()   #清除
s.copy()    #拷贝

set1|set2       #交集
set1&set2       #并集
set1-set2       #差集(在s1不在s2)
set1^set2       #对称差集
set1>=set2      #超集
set1<=set2      #子集
```

## 序列化
快速将对象储存在文件中

```python
import pickle
# 写
sth={}   #可以是字典,集合,列表,元组,字符串,整数和浮点数
file_ptr=open('xxx.bat','wb')
pickle.dump(sth,file_ptr)
file_ptr.close()
# 读
file_ptr2=open('xxx2.bat','rb')
sth=pickle.load(file_ptr2)  #解析出一个对象
file_ptr2.close()
```




