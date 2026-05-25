export default {
  title: "🤖 强化学习",
  questions: [
    {
      title: "论文 A：DQN 深度 Q 网络",
      slides: [
        {
          type: "default",
          icon: "🧠",
          title: "DQN 要解决什么问题",
          points: [
            "传统 Q-learning 无法处理高维状态空间（如游戏画面）",
            "需要函数近似器来泛化未见过状态",
            "深度学习提供强大的特征提取能力",
          ],
          tip: "DQN 是第一个将深度学习与强化学习成功结合的工作",
          color: "blue",
        },
        {
          type: "default",
          icon: "🏗️",
          title: "DQN 的核心创新",
          points: [
            "用深度神经网络作为 Q 函数近似器",
            "Experience Replay — 打破数据相关性",
            "Target Network — 稳定训练目标",
          ],
          tip: "Experience Replay 让 Agent 能从过去的经验中反复学习",
          color: "indigo",
        },
        {
          type: "compare",
          title: "DQN vs 传统 Q-learning",
          leftTitle: "Q-learning",
          leftPoints: [
            "查表法，状态有限",
            "逐个状态更新",
            "数据高度相关",
            "收敛慢",
          ],
          rightTitle: "DQN",
          rightPoints: [
            "神经网络泛化，状态无限",
            "批量经验回放更新",
            "Experience Replay 去相关",
            "Target Network 稳定收敛",
          ],
          tip: "DQN 在 Atari 上超越了所有传统方法",
          color: "cyan",
        },
        {
          type: "data",
          title: "DQN 在 Atari 上的表现",
          subtitle: "49 款游戏中 vs 人类职业玩家",
          stats: [
            { value: "29 / 49", label: "超越人类的游戏数" },
            { value: "100%", label: "仅靠像素输入" },
            { value: "750%", label: "平均 DQN 得分占比" },
            { value: "1 套", label: "统一架构+超参" },
          ],
          tip: "这是 AI 首次仅凭视觉输入学会玩 Atari 游戏",
          color: "teal",
        },
        {
          type: "default",
          icon: "📉",
          title: "DQN 的局限性",
          points: [
            "Q 值估计过高（Overestimation Bias）",
            "样本效率仍然较低，需要大量交互",
            "无法处理连续动作空间",
          ],
          tip: "后续工作 Double DQN、Dueling DQN 等针对性改进了这些问题",
          color: "rose",
        },
      ],
    },
    {
      title: "论文 B：PPO 近端策略优化",
      slides: [
        {
          type: "default",
          icon: "🎯",
          title: "PPO 要解决什么问题",
          points: [
            "Policy Gradient 步长难选 — 太大崩坏，太小不学",
            "TRPO 虽然稳定但计算复杂、实现困难",
            "需要一种既稳定又简单易用的策略优化方法",
          ],
          tip: "PPO 目前是 RL 领域最广泛使用的算法之一",
          color: "emerald",
        },
        {
          type: "quote",
          quote: "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data through interaction with the environment, and optimizing a 'surrogate' objective function using stochastic gradient ascent.",
          author: "John Schulman et al.",
          source: "PPO 论文 (2017)",
          color: "green",
        },
        {
          type: "code",
          title: "PPO Clipping 核心实现",
          language: "python",
          code: `ratio = torch.exp(new_log_probs - old_log_probs)
surr1 = ratio * advantage
surr2 = torch.clamp(ratio, 1 - eps, 1 + eps) * advantage
loss = -torch.min(surr1, surr2).mean()`,
          tip: "仅需几行代码实现，这是 PPO 相比 TRPO 最大的优势",
          color: "teal",
        },
        {
          type: "data",
          title: "PPO vs 其他算法",
          subtitle: "MuJoCo 连续控制任务平均得分",
          stats: [
            { value: "PPO", label: "SOTA 表现" },
            { value: "A2C ×1.5", label: "PPO 超越幅度" },
            { value: "3× 快", label: "相比 TRPO 训练" },
            { value: "OpenAI", label: "默认 RL 算法" },
          ],
          tip: "OpenAI 在 Dota 2 和 Hide and Seek 项目中都使用了 PPO",
          color: "emerald",
        },
      ],
    },
    {
      title: "论文 C：SAC 软演员-评论家",
      slides: [
        {
          type: "default",
          icon: "🎭",
          title: "SAC 要解决什么问题",
          points: [
            "传统 RL 只追求累计奖励最大化，忽视探索",
            "确定性策略容易陷入局部最优",
            "需要一种能平衡探索与利用的算法",
          ],
          tip: "SAC 将最大熵引入 RL 目标函数",
          color: "violet",
        },
        {
          type: "default",
          icon: "🌡️",
          title: "SAC 的核心创新：最大熵",
          points: [
            "目标 = 奖励 + 策略熵，鼓励探索",
            "自动调节温度系数 α，平衡探索-利用",
            "随机策略天然具有更好的鲁棒性",
          ],
          tip: "最大熵让 SAC 在复杂任务上探索更充分",
          color: "purple",
        },
        {
          type: "compare",
          title: "SAC vs PPO",
          leftTitle: "PPO",
          leftPoints: [
            "确定性策略优化",
            "Clipping 限制更新",
            "需要大量调参",
            "探索依赖噪声",
          ],
          rightTitle: "SAC",
          rightPoints: [
            "随机策略（最大熵）",
            "温度系数自动调节",
            "超参数更鲁棒",
            "内置探索机制",
          ],
          tip: "SAC 是目前连续控制任务的 SOTA 算法",
          color: "fuchsia",
        },
      ],
    },
  ],
}
