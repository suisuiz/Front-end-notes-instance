# git commit 后，如何撤销 commit



## 一、

#### 修改了本地的代码，然后使用：

> git add file
>  git commit -m '修改原因'

#### 执行commit后，还没执行push时，想要撤销这次的commit，该怎么办？

解决方案：
 使用命令：

> git reset --soft HEAD^

#### 这样就成功撤销了commit，如果想要连着add也撤销的话，--soft改为--hard（删除工作空间的改动代码）。

命令详解：

> HEAD^  表示上一个版本，即上一次的commit，也可以写成HEAD~1
>  如果进行两次的commit，想要都撤回，可以使用HEAD~2

> --soft
>  不删除工作空间的改动代码 ，撤销commit，不撤销git add file

> --hard
>  删除工作空间的改动代码，撤销commit且撤销add

#### 另外一点，如果commit注释写错了，先要改一下注释，有其他方法也能实现，如：

> git commit --amend
>  这时候会进入vim编辑器，修改完成你要的注释后保存即可。



## 二

#### 1.查看git提交历史,并选取自己要返回的commitId

```
git log
```

#### 2.根据commitId进行撤销

```
git reset --hard commitId
```

#### 3.返回到上个版本

```
git reset --hard HEAD^
```

#### 4.返回到n个版本,n为正整数

```
 git reset --hard HEAD~n
```

