---
title: FPGA学习笔记(一)-Verilog HDL的基本语法
tags:
  - FPGA
  - Verilog
categories: 硬件工程
abbrlink: 742
date: 2020-12-15 10:54:36
---

Verilog HDL 是一种用于数字逻辑电路设计的语言。它与之前学过的高级编程语言大不一样,Verilog HDL 行为描述语言作为一种结构化和过程性的语言
<br />
<br />
<br />

# 模块结构

```pascal
module        //声明模块开始
  module_name(input a,input b, output cc...);
  //模块I/O说明
    reg [x:0] R1,R2, ...;   wire [x:0] W1,W2, ...;
    //内部信号说明

    assign a=b&c;     //声明语句，并行执行
    always (....)
      begin                         内部顺序执行
        if(clr) ....;
        else ...;

      end


endmodule

```

# 常量和变量

## 数字

`10 = 32'd10 = 32'b1010`  
<位宽><进制><数字>

`-1 = -32'd1 = 32'hFFFFFFFF `  
x 代表不定值,z 或?代表高阻值。

`'BX = 32'BX = 32'BXXXXXXX…X`  
减号写在数字定义表达式的最前面。

`"AB" = 16'B01000001_01000010`  
下划线分隔开数的提高可读性

## 参数

`parameter e=25, f=29.2;`

`parameter byte_size=8, byte_msb=byte_size-1; `

跨模块改变参数时使用`defparam`命令

## 变量

### 网络数据类型

> 网络数据类型表示结构实体(例如门)之间的物理连接

网络类型的变量不能储存值，它受到驱动器(例如门或连续赋值语句,assign)的驱动。

wire 型变量通常是用来表示单个门驱动或连续赋值语句驱动的网络型,数据，tri 型变量则用来表示多驱动器驱动的网络型数据
(默认输出信号为 wire 型)

```
wire [n-1:0] 数据名1,数据名2,…数据名i;
//共有i条总线，每条总线位宽为n  ( ( n - 1 ) - 0 + 1 )
```

### 寄存器数据类型

> 寄存器是数据储存单元的抽象。

- 在"always"块内被赋值的每一个信号都必须定义成 reg 型.

```
reg [n-1:0] 数据名1,数据名2,… 数据名i;
//缺省值为不定值
```

### 存储器型数据(数组)

memory 型数据是通过扩展 reg 型数据的地址范围来生成的,

```
reg [n-1:0] 存储器名[m-1:0];
//储存地址0~m

mena[1];
//通过索引来访问每个单元
```

## 运算符和表达式

语法,真值,优先级与 C 语言相同,

- 算术运算符 `+,－,×，/,％`

整数除法结果截取整数,取模符号由被膜数决定

- 赋值运算符`=,<=`

- 关系运算符`>,<,>=,<=`

`==`和`!=` 当位是不定值 x 和高阻值 z,结果为不定值 x

`===` 和`!==`比较时对位的不定值 x 和高阻值 z 也进行比较

- 逻辑运算符`&&,||,!`

- 条件运算符`? : `

- 位运算符`~,|,^,&,^~`

不同长数据进行位运算时,将两者按右端对齐.位数少的操作数会在相应的高位用 0 填满

- 移位运算符`<<,>>`

移位运算都用 0 来填补移出的空位

- 拼接运算符`{ }`

还可以用重复法来简化表达式

## 赋值

b<=a
**非阻塞:块结束后完成赋值**

b=a
**阻塞:立即赋值**

## 块语句

加入块名可以

- 定义局部变量
- 被块内语句调用
- 块内变量地址固定

### 顺序块

**begin_end**

最后一条语句执行完跳出语句块

### 并行块

**fork_join**

块内每条语句的延迟时间是相对于程序流程控制进入到块内时的仿真时间的

当按时间时序排序在最后的语句执行完后或一个 disable 语句执行时，程序流程控制跳出该程序块。

## 判断语句

`if(expression)` 等同与 `if( expression == 1 )`

### case 语句

```pascal
case (expression)
  expression1 : do..;
  expression2 : do..;
  expression3 : do..;
  .
  default : do...;

endcase
```

每一个 case 分项的分支表达式的值互不相同

**执行完 case 分项后的语句，则跳出该 case 语句结构，终止 case 语句的执行**

**casez 不考虑 z 的比较，casex 不考虑 z 和 x 的比较**

## 循环语句

无限循环

```pascal
forever
begin
  ;
end
```

固定次数循环

```pascal
repeat (expressions)
begin
  do_something
end

```

以下两种循环等价(语法与 C 语言类似)

```pascal
pre_do;
while(expressions)
  begin
    do_something;
    re_do;
  end



for (pre_do;expressions;re_do)
  begin
    do_something;
  end

```
