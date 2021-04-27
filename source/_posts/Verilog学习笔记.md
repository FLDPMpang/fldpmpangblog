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

# 数据类型

## 数字表示

`10 = 32'd10 = 32'b1010`  
<位宽><进制(B,O,D,H)><数字>

`-1 = -32'd1 = 32'hFFFFFFFF `  
x 代表不定值,z 或?代表高阻值。

`'BX = 32'BX = 32'BXXXXXXX…X`  
减号写在数字定义表达式的最前面。

`"AB" = 16'B01000001_01000010`  
使用下划线分隔开数的提高可读性

## 参数

`parameter e=25, f=29.2;`

`parameter byte_size=8, byte_msb=byte_size-1; `

跨模块改变参数时使用`defparam`命令

## 变量

### 线网(wire)

wire 类型表示硬件单元之间的物理连线，由其连接的器件输出端连续驱动。如果没有驱动元件连接到 wire 型变量，缺省值一般为 "Z"
(默认输出信号为 wire 型)

```
wire [n-1:0] 数据名1,数据名2,…数据名i;
//共有i条总线，每条总线位宽为n  ( ( n - 1 ) - 0 + 1 )
```

### 寄存器(reg)

> 寄存器表示是数据储存单元

- 在"always"块内被赋值的每一个信号都必须定义成 reg 型.

```
reg [n-1:0] 数据名1,数据名2,… 数据名i;
//缺省值为不定值
```

## 向量

当位宽大于 1 时，wire 或 reg 即可声明为向量的形式

```
reg [n-1:0] qwq;
wire [0:31] art;
```

## 整数与实数

```
integer a; //默认为32位
real f;

initial begin
	f=3.8;
	a=f; //a=3 截尾
end

```

## 字符串

字符串保存在 reg 类型的变量中，每个字符占用一个字节(8bit)

```
reg [0: 25*8-1]       str ;
assign str = "www.fldpmpang.website";
```

## 数组

可声明 reg, wire, integer, time, real 及其向量类型的数组

```
integer [5:0] a [7:0];
reg [31:0] d_4d [11:0][3:0][3:0][255:0];

a[1] = 6'd0;
d_4d[0][0][0][15:0] = 15'd3;
```

# 编译指令

## 宏定义

```
`define DATA 32 #整个编译过程都有用,其他文件也可使用
`undef DATA
```

```
`ifdef       MCU51
    parameter DATA_DW = 8   ;
`elsif       WINDOW
    parameter DATA_DW = 64  ;
`else
    parameter DATA_DW = 32  ;
`endif

```

## 编译说明

```
`include "xxx.v"  #包含到设计文件

`timescale 1ns/1ps # 时间单位和时间精度,与实际时间相关联

```

# 运算符和表达式

## 运算符

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

```

b<=a
非阻塞:下一条语句与当前赋值语句同时进行(容易使用旧值)

b=a
阻塞:赋值后再执行下一条语句

```

### 连续赋值

wire 变量的连续赋值语句都是以 assign 开头

```
assign     LHS = RHS  ； # 右值发生变化时左值立即更新
```

# 语句

## 语句块

加入块名可以

- 定义局部变量
- 被块内语句调用
- 块内变量地址固定

## 判断语句

### if-else

```
if(expression)
	do...
elif
	do..
else

```

### case

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

### 无限循环

```pascal
forever
begin
  ;
end
```

### 固定次数循环

```pascal
repeat (expressions)
begin
  do_something
end

```

### for,while

以下的`for`,`while`两种循环等价(语法与 C 语言类似)

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

# 时序控制

## 时延控制
