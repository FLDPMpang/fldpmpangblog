---
title: '使用Hexo搭建个人博客-美化和功能'
categories: 网站建设
tags:
  - 前端
  - 博客
  - 教程
  - JavaScript
abbrlink: 3538
date: 2020-09-11 10:16:33
---

这篇不同于上篇,博客建设内容多而杂,内容多以指引方向为主,具体的细节可在我补充的链接中查看
## 主题
你能忍受单调低效Hexo的默认主题吗?


### 主题的选择
支持Hexo的主题很多,你甚至可以在 [知乎](
https://www.zhihu.com/question/24422335)上找

**一般主题介绍里都写了安装方法**

你可以使用[Git](https://fldpmpang.gitee.io/2020/09/11/使用Git/) clone到网站文件夹下的`themes`文件下,
也可以下载后手动复制(直接下载时要注意把文件夹名字改成主题名字)

### **Fluid**
这是我博客目前在用的主题(截至至2020.11)

![](https://gitee.com/fldpmpang/fldpmpangs-graph/raw/master/img/20201119121434.png)
<br><br>

**[Fluid](https://github.com/fluid-dev/hexo-theme-fluid)**
这个主题,在我看来还是比较好看的
具体设置细节,可以看[Fluid文档](https://hexo.fluid-dev.com/docs/)



### **NexT**
这是一个比较简洁的主题
[官方网站](https://theme-next.iissnan.com)

![](https://gitee.com/fldpmpang/fldpmpangs-graph/raw/master/img/20201119131719.png)
这款主题的Pisces版非常好看



## 美化与特效
这里可写的东西很多,比如
1. 鼠标点击特效
2. 网站标题特效
3. 看板娘
4. 背景特效 

也需要一定的前端知识,这里我直接给出我建设网站时设置参考的网站链接

[看板娘,点击特效](https://zhuanlan.zhihu.com/p/69211731)

[点击特效,背景特效](https://www.luogu.com.cn/blog/12cow/wordpress)

[每日一言](https://developer.hitokoto.cn/sentence/)


等等.....
## 博客评论系统
我博客使用的是Valine博客评论系统
这是一款基于LeanCloud的快速、简洁且高效的无后端评论系统

[valine官网](https://valine.js.org)

[通用搭建方法](https://valine.js.org/quickstart.html)

对于Fluid的主题系统来说,主题配置文件已经配置好评论部分
可在`fluid_config.yml`(使用"覆盖配置"直接修改)或主题文件夹中的'_config.yml'文件的`comments`字段(配置文件写的很清楚)
将LeanCloud的AppID和Appkey添加即可


## 复杂数学公式支持
由于Hexo博客系统本身的公式渲染器不支持比较高级的$\LaTeX$公式

所以先把Hexo的公式渲染器卸载
```
npm uninstall hexo-renderer-marked --save
```
我是用的是支持比较多$\LaTeX$语法的MathJax渲染器

```
npm install hexo-renderer-kramed --save
```
在相应的博客主题设置里更换数学公式渲染器

之后`hexo clean`更新博客缓存即可

## 部署在Github
先建立一个仓库
在设置中打开GitHub Pages服务
![](https://gitee.com/fldpmpang/fldpmpangs-graph/raw/master/img/20201209145720.png)

之后的工作与部署在Gitee上大同小异


## 使用自定义域名

在`cource`下新建一个`CNAME`文件里面加上你个域名
![](https://gitee.com/fldpmpang/fldpmpangs-graph/raw/master/img/20201209150146.png)


## 加速网站访问

todo

## 补充链接
能看到这里已经不是博客小白了,可以成为一个网站开发者了,如果你还要继续学习,可以看下面的内容
- [w3school网站建设](https://www.w3school.com.cn/w.asp)
- [关于网站SEO](https://www.newscan.com.tw/all-seo/seo-guide.htm)

