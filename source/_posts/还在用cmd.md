---
title: Windows Terminal配置和美化
tags:
  - Windows
  - Bash
categories: 生产力工具
abbrlink: 3156
date: 2020-10-03 17:22:49
---
- 还在视窗系统上用傻傻的cmd或丑丑的Power shell?
- 希望命令行可以分块分标签显示?
- 想要想Linux下终端一样好看?

现在介绍---
# Windows Terminal
[官方中文文档](https://docs.microsoft.com/zh-cn/windows/terminal/)写的非常详细

>Windows Terminal（Windows终端）是微软公司于西雅图开幕的Build 2019大会上所公布的面向Windows10的新命令行程序。用户可以通过Microsoft应用商店安装，或从Github下载源码自行编译安装。这一程序把目前Windows上的PowerShell、CMD以及Windows Linux子系统（WSL）三大环境实现了统一。                            --Wikipedia

## 获取与安装
我们可以非常容易的在[win10应用商店](https://www.microsoft.com/zh-cn/p/windows-terminal/9n0dx20hk701#activetab=pivot:overviewtab)中下载,或在[Github](https://github.com/microsoft/terminal)上下载
比较简单
## 功能配置
按`Ctrl+ ,`或在
![屏幕截图(2).png](https://i.loli.net/2020/10/05/vqDxyGectAZnToE.png)

中打开进行设置的`json`文件(建议选用带有高亮的编辑器打开)
还是建议看[官方文档](https://docs.microsoft.com/zh-cn/windows/terminal/customize-settings/global-settings)
说的对比较详细
### 全局设置
下面是一些有用全局设置~~太长不看版~~
```json
    "theme": "dark",                        //标签栏颜色 可选"system"、"dark"、"light"
    "copyOnSelect": false,                  //选定即复制 关闭
    "copyFormatting": false,                //复制格式 关闭
    "confirmCloseAllTabs": false,           //有多个标签页打开是退出确认 关闭(默认打开)
    "tabWidthMode": "titleLength",          //选项卡宽度模式 ""titleLength"为固定宽度
    "startOnUserLogin": true,               //开机启动
    "launchMode": "default",                //启动是窗口大小 "default"、"maximized"
    "showTabsInTitlebar": true,            //隐藏标题栏 
```

### 主题配置
在`setting.json`文件中`schemes`数组中配置颜色

默认的有
- `Campbell` 
- `Campbell Powershell` 
- `Vintage` 
- `One Half Dark` 
- `One Half Light` 
- `Solarized Dark`
- `Solarized Light`
- `Tango Dark`
- `Tango Light`


个人用的是自己配置的`Atom One Dark`主题
```json
        {
            "name": "Atom One Dark",
            "black": "#000000",
            "red": "#fd5ff1",
            "green": "#87c38a",
            "yellow": "#ffd7b1",
            "blue": "#85befd",
            "purple": "#b9b6fc",
            "cyan": "#85befd",
            "white": "#e0e0e0",
            "brightBlack": "#000000",
            "brightRed": "#fd5ff1",
            "brightGreen": "#94fa36",
            "brightYellow": "#f5ffa8",
            "brightBlue": "#96cbfe",
            "brightPurple": "#b9b6fc",
            "brightCyan": "#85befd",
            "brightWhite": "#e0e0e0",
            "background": "#161719",
            "foreground": "#c5c8c6"
        }
```
其他的主题可在[Github](https://github.com/mbadolato/iTerm2-Color-Schemes)
挑选并下载颜色配置代码

最后在`"profiles" - "defaults" - "colorScheme" `中添加主题的名称

### 美化
在 `"defaults" `中,可以修改
```json
        {       
          "acrylicOpacity": 0.8,                      //背景透明度
          "useAcrylic": true,                         //启用毛玻璃
          "backgroundImage": "xxx.jpg",               //背景图片
          "backgroundImageOpacity": 0.4,              //图片透明度
          "backgroundImageStretchMode": "fill",       //填充模式
          "fontFace": "Courier New",                  //字体
          "fontSize": 16,                             //字号
          "colorScheme": "Atom One Dark",             //主题
          "cursorColor": "#FFFFFF",                   //光标颜色
          "cursorShape": "bar",                       //光标形状
        },

```

### 功能配置

在`"list"` 中添加功能

例如
```json
{
    // Make changes here to the powershell.exe profile.
    "guid": "",                 
    "name": "",                 //显示的名称
    "commandline": "",          //这是加载shell文件地址
    "hidden": false,            //是否隐藏
    "inon": ""                  //图标
},

```
**guid** 是全局唯一标识符（GUID，Globally Unique Identifier）是一种由算法生成的二进制长度为128位的数字标识符。GUID主要用于在拥有多个节点、多台计算机的网络或系统中。
在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。随机生成两个相同GUID的可能性是非常小的，但并不为0。所以，用于生成GUID的算法通常都加入了非随机的参数（如时间），以保证这种重复的情况不会发生。

可以在[这里](http://tool.pfan.cn/guidgen)生产一个guid

当然,不同种类的选项卡可以分别配置
例如,选项与上文一样
```json
            {
                "guid": "",
                "hidden": false,
                "name": "",
                "backgroundImage": "",
                "acrylicOpacity": 0.8, 
                "useAcrylic": true, 
                "backgroundImage": "", 
                "backgroundImageOpacity": 0.4, 
                "fontFace": "",            
                "commandline": ""
            },
```
最后就~~花里胡哨~~
![2121.png](https://i.loli.net/2020/10/08/8qKl2EVimFasPL6.png)


## 使用
基本功能与cmd一样
[窗口功能](https://docs.microsoft.com/zh-cn/windows/terminal/panes)
想要进阶可在[官方文档](https://docs.microsoft.com/zh-cn/windows/terminal/)中查看


### 关于在power shell脚本无法执行的问题
首次在计算机上启动 Windows PowerShell 时，现用执行策略很可能是 Restricted（默认设置）
Restricted 策略不允许任何脚本运行

若要了解计算机上的现用执行策略,键入：

```
get-executionpolicy
```
若要在本地计算机上运行未签名脚本和来自其他用户的签名脚本，可以使用以下命令将计算机上的，执行策略更改为 RemoteSigned：
```
set-executionpolicy remotesigned
```
