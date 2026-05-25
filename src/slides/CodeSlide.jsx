import { gradients } from "./gradients.js"

export default function CodeSlide({ data, index, total }) {
  const bg = gradients[data.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br ${bg} p-8 md:p-10 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {data.title}
      </h2>
      <div className="flex-1 bg-gray-900/60 rounded-xl p-5 overflow-x-auto">
        <div className="text-xs text-white/40 mb-2 font-mono">{data.language}</div>
        <pre className="text-sm md:text-base text-white/90 font-mono leading-relaxed whitespace-pre-wrap">
          {data.code}
        </pre>
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
