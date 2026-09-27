**分类整理内容（已去掉 (a) (b) 标签）**

### 一、模型选择与省 Token（Luna Max 核心技巧）

1. **开启并使用 Luna Max**  
   操作：Settings → Configuration → Available reasoning efforts → 勾选 Max。然后选择模型 GPT-5.6 Luna + Max reasoning。日常写代码、debug、PR 用它，复杂规划再切 Sol。  
   Source：https://x.com/ForwardEditor/status/2083162509692076153

2. **Luna Max 作为默认执行模型（省额度）**  
   操作：日常任务直接选 Luna + Max；遇到深度推理/架构决策再切 Sol。Luna Max 表现接近 Sol Medium，额度消耗低一个数量级。  
   Source：https://x.com/AYi_AInotes/status/2083867265179537565  
   补充：https://x.com/DeryaTR_/status/2084006620074311946

3. **用 Luna Max 做几乎免费部署**  
   操作：在 agents.md 添加以下内容：  
   ```
   When I say 'deploy', finish testing, commit, and push this task’s changes. Then create a new Codex project task using gpt-5.6-luna with max reasoning to review and merge the PR, monitor exact-main CI and automatic deployment, and verify production. Follow that task to completion and report the result here. Prevent recursive handoffs.
   ```  
   新开 thread 执行，避免浪费 Sol token。  
   Source：https://x.com/MatthewBerman/status/2084060433233907875

### 二、Multi-Agent / Subagent 配置

1. **配置 Luna Max 为 Subagent（最热门）**  
   操作：对 Sol 说：  
   ```
   create a custom agent named luna_worker at ~/.codex/agents/luna-worker.toml.
   use these settings:
   model = "gpt-5.6-luna"
   model_reasoning_effort = "max"
   give it a description and instructions for bounded delegated work. preserve the rest of my config. validate it against my installed Codex version, show me the diff, then use luna_worker for subagent tasks.
   ```  
   Sol 负责规划与审核，Luna 处理具体实现。  
   Source：https://x.com/Voxyz_ai/status/2083545774768402673  
   补充：https://x.com/RoundtableSpace/status/2084130890507329609

2. **开启 Multi-Agent v2 并提高并发**  
   操作：在 `~/.codex/config.toml` 添加：  
   ```
   [features]
   multi_agent = true
   multi_agent_v2 = true

   [agents]
   enabled = true
   max_concurrent_threads_per_session = 10
   default_subagent_model = "gpt-5.6-luna"
   default_subagent_reasoning_effort = "max"
   ```  
   再提示 Sol 正确分车道，12 个 Sol medium 可优于默认 4 个 ultra。  
   Source：https://x.com/pedronauck/status/2083594702620631231  
   补充：https://x.com/pvncher/status/2083947504614121542

3. **用独立 Threads 代替 Subagents**  
   操作：告诉 Sol：遇到批量子任务时，自己 spawn 独立的 Luna Max 对话线程，跑完汇总结果。  
   Source：https://x.com/The_Alex/status/2083253595290628146

### 三、自动化与系统维护

1. **定期清理保持电脑流畅**  
   操作：创建自动化（可用 Luna），使用以下 prompt：  
   ```
   Create an automation that runs every 20 minutes to keep Codex running smoothly. Safely stop stale or orphaned headless processes, clear disposable caches when safe, and audit for other low-risk performance improvements. Never interrupt active work, close Codex, or delete user data. Run it immediately.
   ```  
   Source：https://x.com/ForwardEditor/status/2083936363657810177  
   补充：https://x.com/ForwardEditor/status/2083991888827191806

2. **Nightly 硬盘清理自动化**  
   操作：让 Codex 创建/更新名为 “Nightly Cleanup” 的每日 3:00 AM 自动化。只清理安全可再生文件（node_modules、cache、旧 worktree 等），绝不删用户代码/凭证。完整详细 prompt 见原推文。  
   Source：https://x.com/BradGroux/status/2084081541676744740

### 四、长任务与 Prompt 技巧

1. **长任务 Course Correction**  
   操作：不要持续 steering。打断当前任务，写一份详细的 course correction prompt，用 side chats 帮助制定。  
   Source：https://x.com/pvncher/status/2083602795391782927

2. **困难目标用“babysit 另一个 thread”**  
   操作：提示：  
   ```
   write a goal for another thread to achieve this and babysit it until it figures it out
   ```  
   Source：https://x.com/nickbaumann_/status/2077098302475227595

3. **“Just do it yourself”**  
   操作：当 Codex 让你登录/下载/点按钮时，直接回复 “just do it yourself”。完成后让它转成 skill。  
   Source：https://x.com/AlexFinn/status/2075634231469101063

4. **使用 Dictation 提升描述质量**  
   操作：安装 MacWhisper 等语音输入工具，用语音描述任务。  
   Source：https://x.com/aidan_mclau/status/1971042682794598545

5. **/goal 加 Token Budget**  
   操作：使用 /goal 时加上 token budget（可让 Codex 自己开启 flag）。  
   Source：https://x.com/simpsoka/status/2071975521051975706

### 五、Skill 与长期优化

1. **Skill Backtest（用历史 session 优化）**  
   操作：使用以下 prompt：  
   ```
   read [skill name/path] and run a backtest against my past sessions related to it.
   prefer sessions from the same project and same task type. first list the samples you plan to use and why you picked them...
   （对比跳过步骤、手动操作、顺序、卡住点，输出 dry run，确认后再修改）
   ```  
   Source：https://x.com/Voxyz_ai/status/2078175217839403150

2. **通用高价值 Prompt（变身高级工程师）**  
   操作：直接复制原推文中的完整 prompt 使用。  
   Source：https://x.com/Voxyz_ai/status/2083950157884784774

3. **Prompt 后强制使用 Subagents**  
   操作：在任意 prompt 末尾追加 “Use sub agents as needed”。  
   Source：https://x.com/pvncher/status/2068061924915331127

### 六、其他实用配置与心态

1. **长会话防变慢四招**  
   操作：  
   - 设置 Process_narration=false  
   - 用 orchestrator + parallel agents 分担上下文  
   - 强制 “Measure twice, cut once”  
   - 保持代码库干净（无临时文件、死代码）  
   Source：https://x.com/cjzafir/status/2052801300627435996

2. **把任务写成详细文档后放手**  
   操作：写完整 task doc（需求 + 上下文 + 最终愿景）→ 发 “accomplish this and test until done” → 走开。  
   Source：https://x.com/DeRonin_/status/2051699072298328245