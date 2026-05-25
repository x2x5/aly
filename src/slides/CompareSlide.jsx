import { gradients } from "./gradients.js"

export default function CompareSlide({ data, index, total }) {
  const bg = gradients[data.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br ${bg} rounded-2xl shadow-2xl p-8 md:p-10 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {data.title}
      </h2>
      <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white/10 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-3">{data.leftTitle}</h3>
          <ul className="space-y-2">
            {data.leftPoints.map((p, i) => (
              <li key={i} className="text-white/85 text-sm md:text-base leading-relaxed flex items-start gap-2">
                <span className="text-white/40 mt-1 flex-shrink-0">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-3">{data.rightTitle}</h3>
          <ul className="space-y-2">
            {data.rightPoints.map((p, i) => (
              <li key={i} className="text-white/85 text-sm md:text-base leading-relaxed flex items-start gap-2">
                <span className="text-white/40 mt-1 flex-shrink-0">•</span>
                {p}
              </li>
            ))}
          </ul>
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
