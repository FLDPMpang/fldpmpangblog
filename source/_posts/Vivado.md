---
title: 全网中文最详细的在Linux上安装配置XilinxVivado及开发
categories: 电子电路设计
keyword:
  - archlinux
  - Vivado
  - linux串口
tags:
  - FPGA
  - Vivado
abbrlink: 174ea3a8
date: 2021-05-14 11:20:38
---

可能有人觉得有点标题党,但是我翻看一下全网还真没有把安装过程和原因写的特别清楚的
只重点些某些方面,而且大多都是在 CSDN 上,也不一定使用 markdown,阅读效果很不好.

最近我重新写了 ArchWiki 的[XilinxVivado](https://wiki.archlinux.org/title/Xilinx_Vivado_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)部分,那个写的比较正经.

废话不多说了

> 测试平台为 Archlinux(内核版本 5.12) 桌面 Gnome40/i3wm

## 下载

由于 vivado 安装程序需要登陆后提交个人信息才能下载，无法使用包管理安装(不过有些包管理器可以进行管理)

打开[官方下载中心](https://china.xilinx.com/support/download.html)下载`Vivado Design Suite - HLx`相对应的版本

使用官方支持系统`CentOS`,`Ubuntu`,`OenpSUSE`,`Red Hat`相对应的版本,下载`Linux Self Extracting Web Installer`版本.

其他 Linux 发行版使用`All OS installer Single-File Download`版本(不建议使用不支持的 linux 安装)

## 安装

### 依赖

安装程序依赖 `ncurses5`库(不能使用 ncurses6),请使用相对应的包管理器安装(ubuntu 下包名为 `libncurses5`)

Vivado SDK 需要`gtk2`库, Vitis 需要安装`xorg-xlsclients` 库

arch 系发行版可以使用[AUR](https://aur.archlinux.org)中的`xilinx-vivado-dummy`进行替代安装所有这些依赖项

如果你使用平铺式窗口管理器 启动安装程序前加入环境变量

请使用[Xorg](https://wiki.archlinux.org/title/Xorg)显示管理器,Vivado 使用的 Java 版本存在兼容性问题

```bash
export _JAVA_AWT_WM_NONREPARENTING=1
```

Vivado 中默认的字体显示效果差,难以阅读,请提前安装`noto-fonts`这套字体
[官网下载地址](https://www.linuxfromscratch.org/blfs/view/7.10-systemd/kde/noto-fonts.html)
你的 Linux 软件仓库里应该也有

### 安装主程序

在 安装包目录下 终端下启动安装程序(tar.gz 版需要先解压)

```bash
sudo ./xsetup
```

随后就启动了熟悉的安装程序

同意协议,选择安装的内容,这些不必多说,
到选择安装位置时,建议选择`/opt/Xilinx`安装套件,本文假定套件装在那里

长时间的等待后,安装完成,Xilinx 许可证页面打开, **懂的都懂** ,导入`.lic`文件
![2021-05-14_12-14.png](https://7.dusays.com/2021/05/14/a1f093e800f03.png)

### 驱动与额外安装

#### Digilent USB-JTAG 驱动

要使用来自 Vivado 的 Digilent Adept USB-JTAG 适配器(例如内置在 ZedBoard 上的 JTAG 适配器)
你需要安装 [Digilent Adept Runtime](https://store.digilentinc.com/digilent-adept/)

#### Linux cable 驱动

以 root 权限在安装目录运行脚本：

```bash
(vivado_install_dir)/data/xicom/cable_drivers/lin64/install_script/install_drivers/install_drivers
```

## 用户配置

### 快捷方式配置

安装完成后,Vivado 会在 root 用户生成桌面和应用程序菜单快捷方式,但一直使用 root 用户并不安全
如果使用其他用户需要应用程序菜单中的快捷方式，则必须将它们从 root 帐户移动到/usr/share
桌面快捷方式应该移动到用户桌面

复制应用程序菜单快捷方式:

```bash
sudo mv /root/.local/share/applications/* /usr/share/applications/
sudo mv /root/.local/share/desktop-directories/* /usr/share/desktop-directories/
sudo mv /root/.config/menus/applications-merged/* /etc/xdg/menus/applications-merged/
```

![1620966734901.png](https://7.dusays.com/2021/05/14/4a8d94570a644.png)

复制桌面快捷方式:

```bash
sudo chown (username) /root/Desktop/*
sudo mv /root/Desktop/* /home/(username)/Desktop/
```

### 串口设置

若要使用串口 需要将用户添加到`uucp`组中

```bash
sudo gpasswd -a (username) uucp
```

在 Linux(windonws 下也可用)我推荐使用的串口调试工具是[VOFA+](https://www.vofa.plus)
会自动检测串口(而且不止串口通信,功能非常多,还可以安装插件)

当然命令行下还是使用`picocom`吧

![1620967276163.png](https://7.dusays.com/2021/05/14/6bddccfc18749.png)

### 启动屏幕缩放

启动 Vivado，然后按照`Tools -> Setting -> Display -> Scaling`方式启用屏幕缩放功能

这样大概就可以正常开发使用了,有问题可评论区留言
