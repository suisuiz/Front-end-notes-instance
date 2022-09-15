# Git 内容

> Git 是常用的版本管理工具



## 一、初始化git

第一次使用git的时候我们需要给git配置用户名和邮箱，用户和邮箱可以使用`github`的，也可以使用自己公司的`git lab`仓库的账号

```
# 配置用户名
git config --global user.name "用户名"
# 配置邮箱
git config --global user.email "邮箱地址"
```

查看所有的配置信息了，然后可以看到`user.name`和`user.email`配置

```
git config -l
```



## 二、使用

### 1、拉取项目

```
git clone 'xxxx仓库地址'
```

### 2、创建分支

#### 查看所有的分支

```
git branch -a
```

#### 创建自己的分支

```
git branch 分支名称
```

#### 切换到自己创建的分支

```
git checkout 需要切换到的分支名称
```

#### 上述两个指令可以合并成下面的这一个指令，**创建并切换到分支**

```
git checkout -b 分支名称
```

#### 查看自己当前分支

```
git branch
```

### 3、提交代码到缓存

```
git add .
```

### 4、代码提交的注释

> feat：新功能
>
> upd：修改
>
> del：删除
>
> fix：bug修复
>
> test：单元测试
>
> perf：性能优化
>
> docs：文档更新
>
> style：样式变动
>
> `refactor`：功能重构
>
> revert：回滚某个更早之前的提交
>
> package：创建包

```
git commit -m "注释内容"

比如我们增加了一个新模块：git commit -m "feat: 完成了订单下载模块"
```

### 5、代码提交

```
git push origin 提交的分支名字(比如说主分支origin master)
```



## 三、远程操作指令

### 1、显示所有远程仓库

```
git remote -v
```

### 2、获取远程仓库的变动

一般是将远程代码获取下来，然后去和`git merge`做合并处理

```
git fetch origin 分支名称(比如说主分支origin master)
```

### 3、将代码进行合并

```
git merge 分支名
```

### 4、拉取远程仓库代码并与本地分支合并

一般可以看作是`git fetch`和`git merge`的结合体，如果要追究它们有什么不同，那就是更深入的了，这篇文章只做git使用的基本介绍

```
git pull
```

### 5、强行推送当前分支到远程仓库，即使有冲突

```
git push --force
```



## 四、其它指令

### 1、显示有变更的文件状态

```
git status
```

### 2、显示当前分支版本历史

```
git log
```

### 3、显示提交的历史和发生变更的文件

```
git log --stat
```

### 4、显示过去5(n)次提交

```
git log -5 --pretty --oneline
```

### 5、显示该仓库所有提交过代码的用户，并按提交次数排名

```
git shortlog -sn
```

### 6、显示今天提交的文件变更、代码变动的行数

```
git diff --shortstat "@{0 day ago}"
```



## 五、代码回滚

在代码回滚之前我们先使用 `git log` 查看我们的代码提交记录，然后看了代码提交记录之后我们便可以按照版本进行回退

### 1、回退到上个版本

```
git reset --hard HEAD^
```

### 2、回退到n次提交之前

```
git reset --hard HEAD~n
```

### 3、回退到指定提交版本

```
git reset --hard commit的哈希值

#这个哈希值就是输入git log之后可以看到的一大串字符
#比如说 git reset --hard 92f1eb5aa5db9e04753e75a37ffd76f793cb281e
```

回滚后有可能代码会提交失败，必须进行强制推送到远程

```
git push origin HEAD --force
```



![git指令](https://img-blog.csdnimg.cn/20190708095444189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY5NTI5OA==,size_16,color_FFFFFF,t_70)