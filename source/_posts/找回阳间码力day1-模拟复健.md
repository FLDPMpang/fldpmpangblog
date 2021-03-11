---
title: 找回阳间码力day1-模拟复健
categories: 算法与数据结构
tags:
  - 算法
  - 题解
abbrlink: 27485
date: 2020-09-09 21:16:33
---

最近才开始复健OI,我太懒了qwq
## 2020.08.25 模拟题
复健嘛,先找回感觉再说,模拟题不至于因为算法遗忘而卡思路
## [P1563 玩具谜题](https://www.luogu.com.cn/problem/P1563)
先看题,大意是在一个环上按指令移动,输出最终结果

直接模拟即可

注意到,对于任意一人,朝内向左移动与朝外向右移动是等效的(或反之); 这方便了判断最终移向

要注意对环的边界的处理,取余保持光标在环上

### 预定义
```cpp
int m,n,rl,num,tmp=0;   
//rl是向左/右,num是步数,tep是当前移动到的人
struct man{
    int tow;    //朝内/外
    string name; //职业
}peo[100005];
```
### 核心代码
```cpp
int main(){
    ios::sync_with_stdio(0);
    cin>>n>>m;
    for(int i=0;i<n;i++)   {
         cin>>peo[i].tow>>peo[i].name;
    }
    for(int i=0;i<m;i++) {
        cin>>rl>>num;
        if(rl+peo[tmp].tow ==1 ) {  
            //高效的判断最终移向,该移向为逆时针
            tmp+=num;   tmp%=n; 
        }

        else  {  //+n防止取模出负报错
            tmp+=n-num;   
            tmp%=n; 
        }
    }
    cout<<peo[tmp].name<<endl;
    return 0;
}
```
~~水题~~


## [P1518 两只塔姆沃斯牛](https://www.luogu.com.cn/problem/P1518)

人和牛一个移动方法,因此可以共用代码,模拟人和牛的运动,~~一开始我还以为是到搜索题的说~~

如何判断数据无解?一个简单的方法是:模拟足够多的次数,若为相遇则无解,此时程序应运行近似1s,经测试,模拟500w次较为适合

### 预定义
```cpp
char map[12][12];
struct Place{
    int x,y,tow=0; //坐标和朝向
}f[2]; //f[0]是人 f[1]是牛
int t=0,dx[4]={0,1,0,-1},dy[4]={-1,0,1,0};
//dx,dy为四个移动方向,t为过去时间

bool cheak(int x,int y){
    if(x<0 || x>9 || y<0 || y>9 || map[x][y]=='*') return 0;
    else return 1;
}//检查是否遇到边界和障碍物
```
### 核心代码
```cpp
int main(){
    ios::sync_with_stdio(0);
    for(int i=0;i<10;i++)   for(int j=0;j<10;j++) {//确定人和牛
        cin>>map[j][i]; 
        if(map[j][i]=='F') { f[0].x=j; f[0].y=i; }
        if(map[j][i]=='C') { f[1].x=j; f[1].y=i; }
    }
    while(t<=5000000){
        /* cout<<f[0].x<<' '<<f[0].y<<'\n'; */
        if(f[0].x==f[1].x && f[0].y==f[1].y){
            cout<<t<<endl;
            return 0;
        }   //相遇
        for(int i=0;i<2;i++){
            if(cheak(f[i].x+dx[f[i].tow], f[i].y+dy[f[i].tow]) ){
                f[i].x+=dx[f[i].tow];    
                f[i].y+=dy[f[i].tow];
            }//向前移动
            else f[i].tow=( f[i].tow+1 )%4;
            //顺时针转向
        }
        
        ++t;
    }
    cout <<'0'<<endl;
    return 0;
}

```

## [P4924 魔法少女小Scarlet](https://www.luogu.com.cn/problem/P4924)
这道题还是卡了我蛮长时间的

题目大意是在数字矩阵中将某个矩阵中的数字位置旋转,难点据在于如何确定旋转关系

如图(样例第一次操作):
| 1 |  2|  3|  4| 5 |
| :---: | :---: | :---: | :---: | :---: |
| 6 |7  |  8 | 9 |  10|
| 11 |12  |13  |14  |15  |
| 16 | 17 | 18 | 19 | 20 |
| 21 | 22 | 23 | 24 | 25 |

变为

| 11|  6|  1|  4| 5 |
| :---: | :---: | :---: | :---: | :---: |
| 12 |7  |  2| 9 |  10|
| 13|8  |3  |14  |15  |
| 16 | 17 | 18 | 19 | 20 |
| 21 | 22 | 23 | 24 | 25 |

**设被旋转矩形的最坐上角坐标为(1,1) 某个数字坐标为(i,j) 则顺时针旋转后的坐标为(j,n-i+1)** (n-i-1代表 倒数第i列)
推出过程:
|(1,1)| (i,j) | . | . | . |
| :---: | :---: | :---: | :---: | :---: |
| . | . |  .| . | (j,n-i+1)|
| . | . | . | .| . |
| . | . |  .|  .| . |
|  .| . | . | . | . |



对于逆时针同理
### 代码如下
```cpp
int n,m,x,y,r,z,a=0;
int ans[505][505],b[505][505];//b为复制数组

int main(){
    ios::sync_with_stdio(0);
    cin>>n>>m;
    for(int i=1;i<=n;i++) for(int j=1;j<=n;j++)   ans[i][j]= (++a);
    生成数字矩阵
    while(m--) {
        cin>>x>>y>>r>>z;
        int l=2*r+1,x0=x-r-1,y0=y-r-1;  
        //确定(1,1)
        if (z){//逆时针
            for(int i=1;i<=l;i++) for(int j=1;j<=l;j++){
                b[l-j+1][i]=ans[i+x0][j+y0];
            }   // 第i行第j个 变成倒数第j行第i个   (i,j)=>(n-j+1,i)
            for(int i=1;i<=l;i++) for(int j=1;j<=l;j++){
                ans[i+x0][j+y0]=b[i][j];
            }//复制回原数组
        }

        else { //顺时针
            for(int i=1;i<=l;i++) for(int j=1;j<=l;j++){
                // 第i行第j个 变成第j行倒数第i个   (i,j)=>(j,n-i+1)
                b[j][l-i+1]=ans[i+x0][j+y0];
            }
            for(int i=1;i<=l;i++) for(int j=1;j<=l;j++){
                ans[i+x0][j+y0]=b[i][j];
            }
        }
    }
    
    for(int i=1;i<=n;i++) {
        for(int j=1;j<=n;j++){
            cout<<ans[i][j]<<' ';
        }
        
        cout<<'\n';
    }
    return 0;
}
```