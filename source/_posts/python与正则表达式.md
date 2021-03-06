---
title: python与正则表达式
abbrlink: 679ce642
date: 2021-01-05 12:16:47
categories: 算法与数据结构
tags:
  - python
  - 正则表达式
---

# 正则表达式语法

在编写处理字符串的程序或网页时，经常会有查找符合某些复杂规则的字符串的需要。**正则表达式 (regular expression)** 就是用于描述这些规则的工具。换句话说，正则表达式就是记录文本规则的代码。

<br /> 
<br />

## 基础语法

- [ . . . ] 匹配 [ . . . ] 中的一串字符
- [A-Z] , [a-z] , [0-9] 匹配所有对应的大写字母，小写字母，数字
- (?#....) 添加注释
- 转义字符匹配字符本身加 `\`

## 元字符(metacharacter)

| 字符  | 说明                                       |
| ----- | ------------------------------------------ |
| .     | 匹配除换行符以外的任意字符                 |
| \w    | 匹配字母或数字或下划线或汉字               |
| \s    | 匹配任意的空白符(空格,制表,换行)           |
| \d    | 匹配数字                                   |
| \b    | 匹配单词的开始或结束                       |
| \n    | 换行符                                     |
| ^     | 匹配字符串的开始和多行模式下的行首         |
| $     | 匹配字符串的结束和多行模式下的行未         |
| \A    | 只匹配字符串开始                           |
| \Z    | 只匹配字符串尾                             |
| 反义: |
| \W    | 匹配任意不是字母，数字，下划线，汉字的字符 |
| \S    | 匹配任意不是空白符的字符                   |
| \D    | 匹配任意非数字的字符                       |
| \B    | 匹配不是单词开头或结束的位置               |
| [^xy] | 匹配除了 x,y 以外的任意字符                |

以上元字符可以对某一类型(种类)的字符进行匹配,
例如 `\bhello\b`式可以匹配一个单词 hello

`0532-\d\d\d\d\d\d\d\d` 可以匹配一个以 0532 开头的十二位电话号码

## 限定符

限定符可以用于对某一规则匹配多次

有两个新概念

- 贪婪: (在使整个表达式能得到匹配的前提下)匹配尽可能多的字符
- 懒惰: 在能使整个匹配成功的前提下使用最少的重复

### 贪婪限定符

| 字符    | 描述              |
| ------- | ----------------- |
| `*`     | 重复零次或更多次  |
| `+`     | 重复一次或更多次  |
| `?`     | 重复零次或一次    |
| `{n}`   | 重复 n 次         |
| `{n,} ` | 重复 n 次或更多次 |
| `{n,m}` | 重复 n 到 m 次    |

### 懒惰限定符

| 字符     | 描述                              |
| -------- | --------------------------------- |
| `\*?`    | 重复任意次，但尽可能少重复        |
| `+?`     | 重复 1 次或更多次，但尽可能少重复 |
| `??`     | 重复 0 次或 1 次，但尽可能少重复  |
| `{n,m}?` | 重复 n 到 m 次，但尽可能少重复    |
| `{n,}? ` | 重复 n 次以上，但尽可能少重复     |

例如前面的匹配以 0532 开头的 12 位电话号可以写为` 0532-\d{8}`

## 分支与分组

### 分支

`|` 分隔不同的规则,满足其中任意一种规则即匹配(具有短路性)

### 分组

`()` 指定子表达式
对一个字串进行操作

例如匹配 IP 地址

`((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)`

## 零宽断言

- `(?=exp)`

零宽度正预测先行断言,它断言自身位置的后面能匹配表达式

- `(?<=exp)`

零宽度正回顾后发断言,它断言自身位置的前面能匹配表达式

- `(?!exp)`

零宽度负预测先行断言，断言此位置的后面不能匹配表达式

- `(?<!exp)`

零宽度负回顾后发断言,断言此位置的前面不能匹配表达式

## 参考资料

[正则表达式 30 分钟入门教程](https://deerchao.cn/tutorials/regex/regex.htm)

[菜鸟教程-正则表达式](https://www.runoob.com/regexp/regexp-tutorial.html)

<br />
<br />

# python 与正则表达式

[python re 模块](https://docs.python.org/zh-cn/3/library/re.html) 使 Python (编辑文章时 python 版本为 3.9.1) 语言拥有全部的正则表达式功能.

## 常用基础函数和方法

### 通用参数说明

| 参数    | 说明               |
| ------- | ------------------ |
| pattern | 正则表达式(模式串) |
| string  | 要匹配的字符串     |
| flags   | 标志位             |
| pos     | 开始搜索的位置     |
| endpos  | 结束搜索的位置     |
| flag    | 标志位             |

### 标志位(flag)

- re.I 不区分大小写
- re.M 多行匹配
  `^` 匹配字符串的开始，和每一行的开始.样式字符 `$` 匹配字符串尾，和每一行的结尾
- re.X 编写更具可读性的正则表达式
  正则表达式可以分段和添加注释。空白符号会被忽略

### 单个查找

```python
re.search(pattern, string, flags=0)
```

匹配整个字符串找到匹配样式的第一个位置，返回匹配对象或 `None`

```python
re.match(pattern, string, flags=0)
```

匹配字符串的开始位置找到匹配样式,返回匹配对象或 `None`

### 查找和替换

```python
re.sub(pattern, repl, string, count=0, flags=0)

re.subn(pattern, repl, string, count=0, flags=0)
#   与sub行为相同，多返回一个元组 (字符串, 替换次数)
```

- repl : 替换的字符串，也可为一个函数。
- count : 模式匹配后替换的最大次数，默认 0 表示替换所有的匹配

### 查找多项

```python
re.findall(pattern, string, flags=0)
```

返回一个不重复的的匹配对象列表，从头到尾的顺序返回

```python
re.split(pattern, string, maxsplit=0, flags=0)
```

将匹配的子串将字符串分割后返回列表

## 匹配对象

(设匹配对象为 Match)

若未匹配成功，其布尔值为 0

```python
Match.groups(group1,...)
```

返回一个或者多个匹配的字符串或由匹配字符串构成的元组

```python
Match.groups(default=None)
```

返回所有匹配构成的元组

```python
Match.start(group)
Match.end(group)
```

返回第 group 个匹配到的字串的开始和结束位置

```python
Match.span([group])
```

返回 `(m.start(group), m.end(group))` 若未在这个匹配中返回 (-1, -1)

```python
Match.string
```

传递到 match() 或 search()的字符串。

# 正则表达式对象

```python
re.compile("pattern" ,flag)

# 编译后的正则表达式，和上述同名函数等价

Pattern.search(string[, pos[, endpos]])

Pattern.match(string[, pos[, endpos]])

Pattern.split(string, maxsplit=0)

Pattern.findall(string[, pos[, endpos]])

Pattern.sub(repl, string, count=0)

# 编译对象的原始样式字符串
Pattern.pattern
```
