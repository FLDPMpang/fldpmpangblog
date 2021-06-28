---
title: 找回阳间码力day3-递归与递推复健
categories: 算法与数据结构
tags:
  - 算法
  - 题解
abbrlink: 22504
date: 2020-09-12 21:16:33
mathjax: true
---

**2020.08.37**
还是太菜了

## [P1044 栈](https://www.luogu.com.cn/problem/P1044)

两个方法,DP,和$Catalan$数

### 1.DP 方法

设栈内有$i$个数,$j$表示未进栈的数字个数,,$f(i,j)$为当前状态的选择数,则有递推式
$$ f(i,j)=f(i+1,j-i)+f(i-1,j) (i>0) $$
$$ f(i,j)=f(i+1,j-1) (i=0) $$
$f(i+1,j-i) ,f(i-1,j) $ 分别对应 **入栈和出栈**
边界也不难想到 $f(i,0)=1$ (仅栈内有数,此时只能出栈)

### 代码如下

```cpp
using namespace std;
int f[20][20],n;

int main(){
    cin>>n;
    for(int i=0;i<=n;i++) f[i][0]=1;
    for(int j=1;j<=n;j++){
        for(int i=0;i<=n;i++){
            if(i==0) f[i][j]=f[i+1][j-1];
            else f[i][j]=f[i-1][j]+f[i+1][j-1];
        }
    }
    cout<<f[0][n];
    return 0;
}
```

### 2.$Catalan$数

设最后一个出栈的数为 x,则比 x 小的有 x-1 个,比 x 大的有 n-x 个,
设 f[i]为选择数,则所有可能性为 f[x-1]\*f[n-x],其中 f[0]=f[1]=1;

另外，由于 x 有 n 个取值，所以

ans = f[0]*f[n-1] + f[1]*f[n-2] + ... + f[n-1]_f[0];
满足$Catalan$数的递推式,则我们使用其常见公式
$$ H*n=H*{n-1}_(4n-2)/n+1 $$
累加即可

## [P1928 外星密码](https://www.luogu.com.cn/problem/P1928)

题意很明显要递归处理被压缩的字符串

如何输入处理是个大问题,但对 **cin()** 的特性规避了这一问题

### 递归函数代码

```cpp
string slove(void){
    string ans; //结果
    char c;
    while(cin>>c){
        if(c=='['){ //子串开始
            int x;  cin>>x; //直接输入压缩次数,避免对数字位数的讨论
            string t=slove();
            for(int i=0;i<x;i++) ans+=t;
            //加x次字串
        }
        else if(c==']') return ans; //子串结束
        else ans+=c;
    }
    return ans;
}
```

最后调用$slove()$;即可
