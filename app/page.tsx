import Link from 'next/link';
import SquirrelMascot from '@/components/SquirrelMascot';

export default function HomePage() {
  return (
    <main className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左侧文字 */}
          <div className="animate-fade-in order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-heading mb-6 text-text-primary leading-tight">
              从心到脸，<br />确定性变美
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              六大 AI Agent 为你把关<br />
              消除医美决策焦虑
            </p>
            <p className="text-base text-text-secondary mb-8 leading-relaxed">
              不再担心选错医生、被过度营销、效果不理想<br />
              让你的 AI 分身先帮你评估、筛选、谈判<br />
              你只需要在最后确认：是的，我准备好了
            </p>
            <Link 
              href="/create"
              className="inline-block bg-brand-primary hover:bg-brand-secondary text-text-primary font-semibold px-8 py-4 rounded-md transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              让我的 AI 分身开始评估
            </Link>
            <div className="mt-6 text-sm text-text-tertiary space-y-2">
              <p>✨ 24-48 小时生成《确定性变美报告》</p>
              <p>🔒 去中心化信任机制，透明可验证</p>
              <p>🤝 已有 1,234 位求美者的 AI 分身在社区</p>
            </div>
          </div>

          {/* 右侧松鼠插画 */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-[4/5]">
              {/* 背景装饰圆 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5C4]/30 to-[#C9A88A]/20 rounded-full scale-90 animate-breathe" />
              <div className="absolute inset-4 bg-gradient-to-br from-[#F5F2ED] to-[#FBF9F6] rounded-full" />
              
              {/* 松鼠组件 */}
              <div className="relative z-10 h-full">
                <SquirrelMascot />
              </div>
              
              {/* 标签 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <p className="text-text-primary font-semibold text-sm">The Growth Matrix</p>
                <p className="text-text-secondary text-xs">专业医美顾问</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 六大 Agent 矩阵 */}
      <section className="bg-bg-secondary py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-heading text-center mb-12">
            六大 Agent 矩阵
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "心理 Agent",
                icon: "🧠",
                color: "agent-psychology",
                desc: "评估心理准备度和动机真实性"
              },
              {
                name: "审美 Agent",
                icon: "✨",
                color: "agent-aesthetic",
                desc: "分析面部结构，推荐科学方案"
              },
              {
                name: "合规 Agent",
                icon: "✅",
                color: "agent-compliance",
                desc: "验证机构资质，规避风险"
              },
              {
                name: "沟通 Agent",
                icon: "💬",
                color: "agent-communication",
                desc: "翻译医学术语，管理预期"
              },
              {
                name: "博弈 Agent",
                icon: "⚖️",
                color: "agent-negotiation",
                desc: "价格谈判，优化性价比"
              },
              {
                name: "成交 Agent",
                icon: "🤝",
                color: "agent-transaction",
                desc: "综合评分，支持决策"
              }
            ].map((agent, index) => (
              <div
                key={index}
                className="bg-bg-card p-6 rounded-lg border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                style={{ borderLeftColor: `var(--${agent.color})`, animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{agent.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                <p className="text-text-secondary text-sm">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-heading mb-6">
          准备好开始了吗？
        </h2>
        <p className="text-xl text-text-secondary mb-8">
          5 分钟创建你的 AI 分身，24 小时获得确定性变美报告
        </p>
        <Link 
          href="/create"
          className="inline-block bg-brand-primary hover:bg-brand-secondary text-text-primary font-semibold px-8 py-4 rounded-md transition-all text-lg hover:shadow-lg transform hover:-translate-y-0.5"
        >
          创建我的 AI 分身
        </Link>
      </section>
    </main>
  );
}
