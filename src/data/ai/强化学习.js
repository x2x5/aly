export default {
  title: "🤖 强化学习",
  questions: [
    {
      title: "论文 A：DQN 深度 Q 网络",
      slides: [
        {
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
          icon: "🎮",
          title: "实验结果：Atari 游戏",
          points: [
            "在 49 款 Atari 游戏中，DQN 在 29 款上超越人类",
            "仅凭原始像素输入，无需任何手工特征",
            "同一套架构和超参数适用于所有游戏",
          ],
          tip: "这是 AI 首次学会玩 Atari 游戏，引发巨大轰动",
          color: "cyan",
        },
        {
          icon: "📉",
          title: "DQN 的局限性",
          points: [
            "Q值估计过高（Overestimation Bias）",
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
          icon: "🎯",
          title: "PPO 要解决什么问题",
          points: [
            "Policy Gradient 方法步长难选 — 步长太大崩坏，太小不学",
            "TRPO 虽然稳定但计算复杂、实现困难",
            "需要一种既稳定又简单易用的策略优化方法",
          ],
          tip: "PPO 目前是 RL 领域最广泛使用的算法之一",
          color: "emerald",
        },
        {
          icon: "⚖️",
          title: "PPO 的核心思想：Clipped Surrogate Objective",
          points: [
            "限制新策略和旧策略的差异，防止更新过大",
            "用 Clip 机制替代 TRPO 的约束优化",
            "实现简单，只需要几行代码改动",
          ],
          tip: "Clip 让 PPO 既稳定又高效，成为默认的 RL 算法选择",
          color: "green",
        },
        {
          icon: "📊",
          title: "PPO 的性能表现",
          points: [
            "在 MuJoCo 连续控制任务上远超 A2C 等基线",
            "训练稳定性显著优于 Policy Gradient",
            "计算效率高于 TRPO，适合大规模分布式训练",
          ],
          tip: "OpenAI 在 Dota 2 和 Hide and Seek 项目中都使用了 PPO",
          color: "teal",
        },
      ],
    },
    {
      title: "论文 C：SAC 软演员-评论家",
      slides: [
        {
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
          icon: "🏆",
          title: "SAC 为什么是 SOTA",
          points: [
            "在连续控制任务上超越 PPO 和 DDPG",
            "样本效率更高，收敛更快",
            "超参数敏感度低，更容易调参",
          ],
          tip: "SAC 是目前连续动作空间的首选算法",
          color: "fuchsia",
        },
      ],
    },
  ],
}
