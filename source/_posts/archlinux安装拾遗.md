---
title: archlinux系统安装
abbrlink: a4632fd3
date: 2021-03-22 18:05:35
categories: Linux
tags:
  - archlinux
  - 显卡驱动
  - Xorg
keyword:
  - 英伟达
  - amd
  - 拯救者锐龙
  - 笔记本
  - 多显示器
---

building...

## 前面的话

早就想吧自己的 manjaro 换成 archlinux 了，只可惜最近才有时间
为什么这么说，因为在主流（或者是大部分人）看来，过度折腾 linux 桌面和一些“生产力工具”是毫无意义的
进而说来，过度折腾工具是毫无意义（或收效甚微的）

从我个人观点来看，这些工具是头几年折腾，但却能收益终生的。
但国内目前没有干到老的程序员，充斥着“35 岁裁员的气氛”，所以或许也应该这样？

另一方面，折腾 linux 需要耗费时间和精力，甚至还要花费一些金钱，如果你只是想找一个能用的 liunux 发行版，
我建议去用 **deepin** , **openSUSE** 等

如果想去使用 archlinux 但缺乏必要知识，我建议先用 **manjaro** （或者直接留在 manjaro，体验差距并不大）

如果你真有精力和能力去使用 archlinux,那么请继续往下看吧....

一定要看[archwiki](<https://wiki.archlinux.org/index.php/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
建议与本文同步阅读,互为补充

个人电脑为 R7000 2020（锐龙 R5 4600+gtx1650）
驱动安装方面我会仔细说明

## 启动到安装环境

像其他 Linux 发行版一样，需要先制作启动 U 盘,
国内可[在清华大学镜像源](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/)选择镜像
下图是一个例子
![image.png](https://i.loli.net/2021/03/24/XbyOVN2McgztQZe.png)

2010 年后的电脑大部分呢都为`UEFI`引导(在分区类型选择`GPT`)
windows 下使用[Rufus](https://rufus.ie) , Linux 下使用以下命令

```
 dd bs=4M if="镜像下载位置" of="U盘挂载位置" status=progress && sync
```

接下来的三步按照 archwiki 走

- 键盘布局
- 网络链接(我建议安装时尽量使用网线,终端下配置较繁琐)
- 更新系统时间(可忽略)

## 分区与系统安装

在使用`fdisk -l` 查看完分区后,
我更推荐使用`cfdisk` 这个图形化界面进行分区
使用

```
cfdisk  /dev/nvme.....
```

命令 进行图形化分区

## 驱动安装

## 图形界面安装
