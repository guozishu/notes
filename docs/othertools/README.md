# git合并

- git主要有两种不同的合并分支的方法，rebase和merge，各个公司针对分支的管理也都是各不相同。所以学习下git的合并原理和API的使用很有必要，开始自己的学习之路。
### 第一种merge
---
- 我们有两个基于master分支新建的hotfix分支和iss53分支。当我们在iss53分支上开发任务的时候线上出问题了，我们新建分支hotfix。
```js
git checkout master
git checkout -b hotfix
```
![An image](./images/basic-branching-4.png)
---
-  问题修复后我们需要把hotfix分支合并到master分支上。master分支和hotfix分支指向了同一个位置，可以删除hotfix分支。（如果存在远程分支hotfix有需要删除）
```js
git checkout master
git merge hotfix
git branch -d hotfix
git push origin --delete hotfix
```
![An image](./images/basic-branching-5.png)
---
- 当我们切回iss53分支进开发，开发完后将两个分支的末端所指的快照以及这两个分支的公共祖先，做一个简单的三方合并。iss53已经合并进来，就可以删除iss53 分支了。
```js
git checkout iss53
git checkout master
git merge iss53
git branch -d iss53
```
![An image](./images/basic-merging-2.png)
---
#### 第二种rebase-变基
- 
---
> 操作方法

- 从暂存区删除文件
```js
git rm --cached file
```
- 移动文件-修改名称
```js
git mv file_from file_to
```
- 更新远程分支列表
```js
git remote update
```
- 根据远程分支创建新的分支
```js
git checkout -b new-branch remote-origin-branch
```
- 删除远程分支/删除本地分支
```js
git push origin --delete branch-name/git branch -D branch-name
```
- git别名创建
```js
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```
- 查看当前分支和对应的远程分支
```js
git branch -vv
```
- 删除远程分支
```js
git push origin --delete branch-name
```