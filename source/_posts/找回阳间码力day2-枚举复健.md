---
title: 找回阳间码力day2-枚举与暴力复健
categories: 算法与数据结构
tags:
  - 算法
  - 题解
abbrlink: 57435
date: 2020-09-11 21:16:33
---

### 2020.08.26

>发现自己不是考试的时候，不想写暴力，然后考试的时候就发现自己暴力都不会
## [P2241 统计方形（数据加强版）](https://www.luogu.com.cn/problem/P2241)
数据加强后,原先直接模拟的方法会超时,需要用一点统计知识

对于一个长方形,可以枚举他的长和宽来判断形状

对于一个方向 **大长方形边长减小长方形边长加一**
得这个长宽的长方形再这一方向上可以摆放的数量,最后用乘法原理相乘
### 具体代码
```cpp
int main(){
	int n,m;
	long long ans=0,t=0,h=0;
	cin>>n>>m;
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++){
			ans=(n-i+1)*(m-j+1);  //比较容易就推出来了
			if(j==i) t+=ans; //正方形
			else h+=ans;    //长方形
		}
	}
	cout<<t<<" "<<h<<endl;
	return 0;
}
```

## [P1157 组合的输出](https://www.luogu.com.cn/problem/P1157)
搜索题,输出组合
我使用了回溯(DFS?)的方法
### 搜索函数
```cpp
void dfs(int num){
    if(num>r){
        //完成组合
        for(int i=1;i<=r;i++) printf("%3d",ans[i]);
        putchar('\n');
        return ;
    }
    for(int i=ans[num-1]+1;i<=n;i++) {
        //ans[num-1]+1 可保证数组必定按字典序排列
        if(!use[i]) {
            ans[num]=i;
            use[i]=1;      //该数被使用
            dfs(num+1);     //递归调用
            use[i]=0;       //回溯
        }
    }
    return ;
}
```
最后调用dfs(1) 即可;

## [P3799 妖梦拼木棒](https://www.luogu.com.cn/problem/P3799)
因为要用4根木棒,所以必有两个木棒长度相等

设木棒分别为 $ a,b,c,d $则有$ a=b=c+d $
即可分别枚举$ a(b) $ ,$ c $

对于某个边长的正三角形,两根相同长度的木棒的选法为$ C(n,2) $个,
其余两根木棒若长度相同选法为$ C(n,2) $,
若不相同选法是$ n_1 * n_2 $,
根据乘法原理得该边长的三角形的选法

最后累加再取余即可

### 代码如下
```cpp
const LL mod=1e9+7;
LL t,maxt=-1,ans=0; 
int n;
LL tag[10005]; //使用一个桶储存相同长度的木棒的个数
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin>>n;
    for(int i=0;i<n;i++) {
        cin>>t;
        ++tag[t];
        maxt=max(maxt,t); //找最长,减少木棒长度枚举量
    }
    for(int x=2;x<=maxt;x++){
        if(tag[x]>=2){ //有两条以上相同长度的木棒
            LL num= (tag[x]*(tag[x]-1)/2) %mod;
            for(int i=1;i<=x/2;i++){
                if( tag[i]&&tag[x-i] ) {
                    if(2*i==x) {//两条长度一样
                        ans+=num*(tag[i]*(tag[i]-1)/2);
                        ans%=mod;   //C(n,2)=n*(n-1)/2
                    }
                    else {
                        ans+=num*tag[i]*tag[x-i];
                        ans%=mod;
                    }
                }
            }
        }
    }
    cout<<ans<<endl;
}
```