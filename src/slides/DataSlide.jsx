import { gradients } from "./gradients.js"

export default function DataSlide({ data, index, total }) {
  const bg = gradients[data.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br ${bg} p-8 md:p-10 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="text-white/60 text-base mb-8">{data.subtitle}</p>
      )}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-6">
          {data.stats.map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {data.tip && (
        <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 flex items-start gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
          <span className="text-white/85 text-sm leading-relaxed">{data.tip}</span>
        </div>
      )}
    </div>
  )
}
