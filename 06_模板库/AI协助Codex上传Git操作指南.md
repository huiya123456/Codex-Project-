# AI 协助 Codex 上传 Git 操作指南

本文用于指导团队成员在本地项目中，让 AI / Codex 协助完成 Git 检查、提交和上传。目标是减少漏传、误传和覆盖风险，同时保留人工确认环节。

## 适用场景

- 新增或修改了智能体配置、训练数据、模板、Demo 说明、测试用例等项目文件。
- 需要把本地成果同步到 GitHub、GitLab、Gitee 或公司内部 Git 仓库。
- 希望由 Codex 协助检查改动、生成提交说明、执行 Git 命令。

## 核心原则

1. 上传前必须先检查改动内容。
2. 涉及客户信息、内部敏感信息、账号密钥、合同、报价等内容，必须人工确认后再提交。
3. `03_数字资产库/Demo基准/Demo_V0_零蒸馏基准_*` 是永久基准，不得删除或覆盖。
4. 新一轮 Demo 对比必须新建 `Demo_V1`、`Demo_V2` 等目录。
5. 禁止让 Codex 执行批量删除文件或目录。
6. 每次提交只放入同一主题的改动，避免把无关文件混在一起。

## 一、上传前准备

在 Codex 中输入：

```text
请帮我检查当前 Git 状态，列出已修改、新增、删除的文件，并判断哪些文件适合本次提交。不要删除任何文件。
```

Codex 应执行或建议以下命令：

```powershell
git status --short
git diff --stat
```

如需查看具体改动，可继续让 Codex 执行：

```powershell
git diff -- <文件路径>
```

注意：如果存在他人或历史留下的无关改动，不要直接提交。应先确认本次只提交哪些文件。

## 二、拉取远程最新版本

提交前先同步远程仓库：

```powershell
git pull
```

如果出现冲突，停止上传，并让 Codex 说明冲突文件和冲突原因：

```text
请解释 git pull 后的冲突文件分别是什么，哪些内容需要人工决定。不要自动覆盖任何文件。
```

冲突解决后，再执行：

```powershell
git status --short
```

## 三、让 Codex 生成提交清单

在 Codex 中输入：

```text
请根据当前改动生成本次 Git 提交清单，区分“建议提交”“暂不提交”“需要人工确认”。不要执行 git add。
```

推荐输出格式：

```text
建议提交：
- 06_模板库/xxx.md：新增操作指南

暂不提交：
- 03_数字资产库/xxx：与本次主题无关

需要人工确认：
- 02_训练数据/xxx：可能包含敏感信息
```

人工确认后，再进入暂存步骤。

## 四、暂存文件

只暂存明确属于本次提交的文件。示例：

```powershell
git add "06_模板库/AI协助Codex上传Git操作指南.md"
```

不建议直接使用：

```powershell
git add .
```

除非已经确认当前所有改动都属于同一主题，且没有敏感内容、临时文件、无关文件。

暂存后检查：

```powershell
git status --short
git diff --cached --stat
```

如需查看已暂存的具体内容：

```powershell
git diff --cached
```

## 五、生成提交说明

让 Codex 根据已暂存内容生成提交说明：

```text
请根据 git diff --cached 的内容，生成一个简洁的中文 commit message。
格式：类型: 简短说明
```

常用类型：

| 类型 | 用途 |
|---|---|
| `docs` | 文档、流程、说明 |
| `config` | 智能体配置、项目配置 |
| `data` | 训练数据、语料 |
| `demo` | Demo、测试样例 |
| `fix` | 修复问题 |
| `feat` | 新增功能 |

示例：

```text
docs: 新增 AI 协助 Git 上传操作指南
```

## 六、提交本地版本

确认提交说明后执行：

```powershell
git commit -m "docs: 新增 AI 协助 Git 上传操作指南"
```

提交后检查：

```powershell
git status --short
git log -1 --oneline
```

如果 `git status --short` 仍有文件，说明还有未提交改动。确认它们是否属于下一次提交。

## 七、推送到远程仓库

查看当前分支：

```powershell
git branch --show-current
```

推送当前分支：

```powershell
git push
```

如果是新分支，首次推送通常使用：

```powershell
git push -u origin <分支名>
```

推送成功后，让 Codex 总结：

```text
请总结本次已提交和已推送的内容，包括分支名、commit message、是否还有未提交文件。
```

## 八、常用 Codex 指令模板

### 1. 只检查，不提交

```text
请只检查当前 Git 状态和改动摘要，不要执行 git add、git commit、git push，也不要删除任何文件。
```

### 2. 提交指定文件

```text
请帮我提交以下文件到 Git：
- 06_模板库/AI协助Codex上传Git操作指南.md

要求：
1. 先检查 git status 和 diff。
2. 只 git add 上面列出的文件。
3. commit message 用中文。
4. 提交后不要自动 push，先向我汇报。
```

### 3. 提交并推送

```text
请帮我把本次文档改动提交并推送到当前分支。
要求：
1. 先列出将要提交的文件。
2. 不要提交无关文件。
3. 不要删除任何文件。
4. commit message 使用 docs: 开头。
5. push 前再次确认当前分支。
```

### 4. 检查是否有敏感信息

```text
请检查本次准备提交的文件中是否可能包含客户信息、账号密钥、内部链接、合同金额、个人隐私或未脱敏训练数据。只做检查，不要提交。
```

## 九、异常处理

### 远程仓库拒绝推送

常见原因：远程分支有新提交，本地落后。

处理方式：

```powershell
git pull
```

解决冲突后再：

```powershell
git push
```

### 提交了不该提交的文件，但还没有 push

停止操作，让 Codex 先说明情况：

```text
我可能提交了不该提交的文件，但还没有 push。请先查看最近一次 commit 包含哪些文件，并给出不破坏工作区的处理方案。不要自动回滚。
```

### 已经 push 了敏感内容

立即停止继续操作，通知负责人。敏感内容进入远程历史后，不能只靠普通删除解决，需要仓库负责人处理历史记录、权限和密钥轮换。

## 十、负责人检查清单

每次团队成员上传后，负责人建议检查：

- 是否提交到正确分支。
- commit message 是否能看懂。
- 是否误提交临时文件、截图缓存、密钥、客户原文。
- 是否改动了永久基准目录。
- 新 Demo 是否使用了新版本目录。
- 训练数据是否已经人工筛选和脱敏。

## 推荐日常流程

```text
检查状态 -> 拉取远程 -> 审查 diff -> 选择文件 -> 暂存 -> 提交 -> 推送 -> 总结
```

对应命令：

```powershell
git status --short
git pull
git diff --stat
git add "<明确文件路径>"
git diff --cached --stat
git commit -m "docs: 本次提交说明"
git push
git status --short
```
