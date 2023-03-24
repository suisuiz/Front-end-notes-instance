<!--  -->

git push 出现 ssh: connect to host github.com port 22: Connection timed out

- 进入 .ssh 文件夹
- 创建一个 config 文件
- 编辑文件内容

```
Host github.com
User xxxxx@xxx.com
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443

```

在第二行的 User 后面填上自己的邮箱，填好之后保存退出。
在项目中需要重新使用命令 git config user.name xxx 以及 git config user.email xxx 设置一下，为了刷新配置用的。

这里要根据它的提示操作，有个地方要输入 yes

可以使用命令 ssh -T git@github.com 检测 ssh 是否正常

<!--  -->

文章
https://blog.csdn.net/weixin_41287260/article/details/124368189

https://blog.csdn.net/weixin_42992706/article/details/128753025
