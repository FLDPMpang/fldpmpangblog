---
title: '使用Hexo搭建个人博客-部署与配置'
categories: 网站建设
tags:
  - 网站
  - 博客
  - 教程
abbrlink: 18682
date: 2020-09-10 21:16:33
---
## [成品效果](https://www.fldpmpang.website)

## 前言
最近发现wordpress不能很好的同时支持markdown和Latex数学公式,国内的服务器又在备案和有其他用途,于是就选择了支持原生Markdown的Hexo博客系统

但目前(2020.12)码云不支持使用自己的域名(下篇会将博客部署到`Github`,这样就可以使用自定义域名了)

~~其实就是闲的蛋疼想找点事做~~

无论干什么也一定要看官方文档啊

**[Hexo中文文档](https://hexo.io/zh-cn/docs/)**


## 安装运行环境
(个人搭建时使用的win10系统) 关于安装运行环境,[官方文档](https://hexo.io/zh-cn/docs/#%E5%AE%89%E8%A3%85)上有针对不同系统的详细说明,不再赘述

如果是第一次接触到Git 可以看一下 [菜鸟驿站的Git简明指南](https://www.runoob.com/manual/git-guide/)明白几个基础命令就行

## 建站
参考[官方文档](https://hexo.io/zh-cn/docs/#%E5%AE%89%E8%A3%85-Hexo)
安装(不贴安装命令是因为安装命令可能随时更换,但官方文档必定是最准确的)

使用命令行进入安装目录的上一级目录,新建一个空文件夹

接下来执行
```
hexo init <folder>
cd <folder>
npm install
```
来进行网站的初始化,其中 "<folder>"是新建的文件夹的名字

对于这种警告
![wJyWNR.jpg](https://s1.ax1x.com/2020/09/10/wJyWNR.jpg)

可以完全忽略,因为这是Node.js在mac系统上的bug(有兴趣可以自行百度)

这样你的网站就建好了(雾),来访问一下看看吧:
执行命令
```
hexo clean       //清除缓存与静态文件
hexo generate    //生成静态文件,可简写为 hexo g
hexo server      //启动本地网站服务器,可简写为 hexo s
```
通过命令行的反馈可以看到,本地网站网址为
 **[http://localhost:4000]( http://localhost:4000)**

让我们进去看看吧
是这个样子:

![wJy536.png](https://s1.ax1x.com/2020/09/10/wJy536.png)

看完后按 Ctrl+C 退出

详细的hexo的命令请参考[官方文档](https://hexo.io/zh-cn/docs/commands)


## 部署

只在本地看怎末能行?搭建网站就是为了让更多人看到内容
下面开始将网站部署在 **[Gitee](https://gitee.com/)**
(为什么是Gitee? 因为Gitee在国内访问比Github快)

### 创建仓库
登录码云(没有账号的自己注册去!),新建一个仓库,将他命名为你网站的名字(很重要!,命名不同会很麻烦)

在 **仓库页-服务-Gitee Pages** (需要绑定手机)
中打开Gitee Pages 服务
部署分支建议选择master,部署目录是整个仓库


### 创建SSH
什么是SSH?简单说就是对远程登录会话和其他网络服务提供安全性的协议,Git的 `remote`操作需要使用SSH密钥
下面创建一个ssh密钥对
打开Git Bash(在开始菜单有) 键入
```
ssh-keygen -t rsa -C “your_email@example.com” 
```
邮箱为你注册码云的邮箱
其中会让你确认和输入密码,密码可不填(直接按回车)

创建完的ssh公钥对会在   用户/.ssh/文件夹中
将/.ssh 文件夹中的 "xxx.pub"文件打开,里面的内容就是ssh公钥了

打开 **码云个人主页-个人设置-安全设置-ssh公钥**里将公钥填上,名字可以随便取

如果没有看懂,可以看[码云-SSH公钥](https://gitee.com/help/articles/4191)详细的图文教程

因为Git是分布式版本控制系统，所以每个机器都必须自报家门：你的名字和Email地址（都不会进行验证），这样远程仓库才知道哪次提交是由谁完成的。所以接着设定git用户名和邮箱 
```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
建议填你注册码云的用户名和邮箱

~~接下来这一步卡了我蛮长时间的~~
### 部署到仓库

首先安装一键部署插件
```
npm install hexo-deployer-git --save
```
打开hexo博客目录中的 `_config.yml` 文件
找到 `deploy:` 并增加
```
deploy:
  type: git
  repo: 你博客的git地址
  branch: master
```
"你博客的git地址" 可在仓库页
![wNAkRS.png](https://s1.ax1x.com/2020/09/11/wNAkRS.png)
中复制

更多部署参数可在[官方文档](https://hexo.io/zh-cn/docs/one-command-deployment)查看

然后修改默认路径,在 `_config.yml` 文件修改 `url `, `root`:
```
url:  仓库地址
root: / 仓库的名字/
```

这样就可以推送博客辣~

执行命令
```
hexo clean
hexo g
hexo depoly  //部署到网络,可简写为hexo d
```
接下来更新Gitee Pages 服务,访问Gitee Pages的网站地址
![wJy536.png](https://s1.ax1x.com/2020/09/10/wJy536.png)

成功部署到了云端

#### 提示
由于时静态页面,在调试时,一定要及时清理浏览器缓存和更新Gitee Pages
或使用浏览器的Devtools禁用该网站的缓存进行网站实时更新

### 如果网站格式丢失
如果部署到云端是网站格式丢失但本地部署无问题

[![wNMrS1.png](https://s1.ax1x.com/2020/09/11/wNMrS1.png)](https://imgchr.com/i/wNMrS1)

在网页中打开调试模式 **(F12)** 发现报了很多错
原来是找不到 js和css 文件,无法渲染网页

重新修改 `url`, `root`
注意 root 一定要是仓库的名字


### 仓库介绍与开源声明
当你回到码云仓库页的时候, 我的项目介绍呢? 我的开源许可证呢?

原来是hexo部署会把整个仓库(的分支)清空,所以 `README.md` 和 `LICENSE`被删掉了
我们应该将 `README.md` 和 `LICENSE` 放到网站目录的 `/soucre` 目录下

但是,众所周知:Hexo页面和文章使用MarkDown语言撰写,当执行 

```
hexo g 
```

命令时,Markdown页面会被"编译"成使用HTML语言的标准网页(标准说法是:生成静态网页)

但码云只认README.md,我们可以通过对网站文件夹中的 `_config.yml` 进行修改
将 `skip_render: `选项后加入 `README.md` 来跳过对 `README.md` 的"编译"

问题解决了

### 网站信息自定义
如何让这个网站看起来像你自己的?
首先要更改网站的信息,包括
+ 网站主/副标题
+ 网站介绍

可在网站目录下的`_config.yml` 文件中 `site` 栏修改

[![wNt1fS.png](https://s1.ax1x.com/2020/09/11/wNt1fS.png)](https://imgchr.com/i/wNt1fS)


## 使用
写作其实很简单,你可以使用[官方文档](https://hexo.io/zh-cn/docs/writing)
也可以在`source/_posts/`下直接新建一个markdown文件,只不过文章的**Front-matter**需要你自己添加

### Front-matter
[Front-matter](https://hexo.io/zh-cn/docs/front-matter)就是一个可以指定文章详细内容的标签

常用的有:

- title 文章标题
- date  文章创建日期
- tags  文章标签
- categories 文章分类

比如本篇文章曾经的Front-matter
```

---
title: 使用Hexo搭建博客(上)-建站,配置与部署
date: 2020-09-09 21:16:33
categories: 网站建设
tags:
- 网站
- 博客
- 教程
---

```

## 结尾
+ 不想看Hexo的默认主题?
+ 在网站中加入评论区?
+ 在网站中加入炫酷特效?
+ 好康的看板娘?
+ 不想使用又长又臭的码云提供的域名?

欢迎查看  
#### [使用Hexo搭建博客(下)-美化,功能与杂项](https://www.fldpmpang.website/202009113538/)


